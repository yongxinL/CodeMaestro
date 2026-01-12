# CI/CD Pipeline Generation

**Version:** 1.0
**Status:** Active
**Phase:** 2 (Planning), 5 (Release)
**Risk:** ✅ ZERO - Pure addition, DevOps best practices automated

---

## Overview

The CI/CD Pipeline Generation system automatically creates platform-specific continuous integration and deployment configurations based on your project's technology stack and quality gates. This ensures DevOps best practices are implemented from the start.

## Command: `/generate ci-cd`

### Syntax

```bash
/generate ci-cd                    # Auto-detect platform and generate
/generate ci-cd --platform github  # Force specific platform
/generate ci-cd --preview          # Preview without creating files
/generate ci-cd --simple           # Basic pipeline only
/generate ci-cd --full             # Full pipeline with staging/prod
```

### When to Use

**Phase 2 (Planning):**
- After technology stack selection
- As part of architecture blueprint
- Define CI/CD strategy upfront

**Phase 5 (Release):**
- Before first production deployment
- Set up automated deployment pipeline
- Ensure quality gates enforced in CI

---

## Supported Platforms

| Platform | Detection Method | Config Files |
|----------|-----------------|--------------|
| **GitHub Actions** | `.git/config` contains `github.com` | `.github/workflows/*.yml` |
| **GitLab CI** | `.git/config` contains `gitlab.com` | `.gitlab-ci.yml` |
| **CircleCI** | `.circleci/` directory exists | `.circleci/config.yml` |
| **Jenkins** | `Jenkinsfile` exists | `Jenkinsfile` |
| **Bitbucket Pipelines** | `.git/config` contains `bitbucket.org` | `bitbucket-pipelines.yml` |

---

## Platform Detection

### Auto-Detection Algorithm

```bash
# 1. Check git remote
if git remote -v | grep -q "github.com"; then
  platform="github"
elif git remote -v | grep -q "gitlab.com"; then
  platform="gitlab"
elif git remote -v | grep -q "bitbucket.org"; then
  platform="bitbucket"
# 2. Check existing config files
elif [ -d ".circleci" ]; then
  platform="circleci"
elif [ -f "Jenkinsfile" ]; then
  platform="jenkins"
# 3. Prompt user
else
  echo "Platform not detected. Select manually:"
  platform=<user_choice>
fi
```

### Example Output

```bash
> /generate ci-cd

🔍 Detecting CI/CD platform...

   ✓ Git remote detected: github.com
   ✓ Platform: GitHub Actions
   ✓ Technology: Node.js (detected from package.json)
   ✓ Database: PostgreSQL (detected from architecture blueprint)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️ Generating CI/CD pipelines...

   Created:
   ✓ .github/workflows/test.yml          # Run tests on PR
   ✓ .github/workflows/build.yml         # Build on main branch
   ✓ .github/workflows/deploy-staging.yml # Deploy to staging (auto)
   ✓ .github/workflows/deploy-prod.yml    # Deploy to production (manual)
   ✓ .github/workflows/security-scan.yml  # Weekly security scan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Pipeline includes:

   Quality Gates Enforced:
   ✅ Linting (ESLint, Prettier)
   ✅ Unit tests (Jest)
   ✅ Integration tests
   ✅ Security scan (npm audit)
   ✅ Test coverage ≥70% (enforced)
   ✅ Zero critical/high vulnerabilities (blocking)

   Deployment Strategy:
   - PR: Test + lint (required checks)
   - main: Test + build + deploy staging (automatic)
   - v*.*.*: Deploy production (manual approval)

   Environment Secrets Required:
   - DATABASE_URL (PostgreSQL connection string)
   - API_KEY (OpenAI API key)
   - DEPLOY_TOKEN (Vercel/Railway deployment token)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Next Steps:

   1. Review generated workflow files
   2. Add secrets to GitHub repository settings:
      Settings → Secrets → Actions → New repository secret

   3. Push changes to trigger first workflow:
      git add .github/workflows/
      git commit -m "ci: Add CI/CD pipelines"
      git push

   4. Monitor workflow runs:
      Actions tab → Select workflow → View logs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CI/CD pipeline generation complete!
```

---

## Generated Workflow Examples

### GitHub Actions: Test Pipeline

**File:** `.github/workflows/test.yml`

```yaml
name: Test

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          NODE_ENV: test

      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 70" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 70% threshold"
            exit 1
          fi
          echo "✅ Coverage $COVERAGE% meets threshold"

      - name: Upload coverage report
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

      - name: Security audit
        run: npm audit --audit-level=high

      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const coverage = require('./coverage/coverage-summary.json')
            const pct = coverage.total.lines.pct
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Test Results\n\n✅ All tests passed!\n📊 Coverage: ${pct}%`
            })
```

---

### GitHub Actions: Deploy to Staging

**File:** `.github/workflows/deploy-staging.yml`

```yaml
name: Deploy Staging

on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://taskflow-staging.vercel.app

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
          API_URL: https://api-staging.taskflow.com

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Run smoke tests
        run: npm run test:smoke
        env:
          BASE_URL: https://taskflow-staging.vercel.app

      - name: Notify success
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              text: '✅ Staging deployment successful!',
              attachments: [{
                color: 'good',
                text: 'TaskFlow v${{ github.sha }} deployed to staging'
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

      - name: Notify failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              text: '❌ Staging deployment failed!',
              attachments: [{
                color: 'danger',
                text: 'Check workflow logs for details'
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

### GitHub Actions: Deploy to Production

**File:** `.github/workflows/deploy-prod.yml`

```yaml
name: Deploy Production

on:
  push:
    tags:
      - 'v*.*.*' # Trigger on version tags
  workflow_dispatch: # Manual trigger with approval

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://taskflow.com
    # Requires manual approval in GitHub environment settings

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Validate version tag
        run: |
          TAG=${GITHUB_REF#refs/tags/}
          if [[ ! $TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo "❌ Invalid version tag: $TAG"
            exit 1
          fi
          echo "✅ Valid version tag: $TAG"

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run all tests
        run: |
          npm run lint
          npm test -- --coverage
          npm run test:integration
          npm run test:e2e
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

      - name: Security audit
        run: |
          npm audit --audit-level=high
          # Additional security checks
          npm run security:check

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
          API_URL: https://api.taskflow.com

      - name: Create deployment artifact
        run: |
          tar -czf deploy.tar.gz dist/ package.json package-lock.json

      - name: Deploy to production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Run production smoke tests
        run: npm run test:smoke
        env:
          BASE_URL: https://taskflow.com

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            ## Changes
            ${{ github.event.head_commit.message }}

            ## Deployment
            - ✅ Production deployment successful
            - 🌍 Live at: https://taskflow.com
            - 📊 Test coverage: See latest report

          draft: false
          prerelease: false

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              text: '🚀 Production deployment successful!',
              attachments: [{
                color: 'good',
                text: 'TaskFlow ${{ github.ref }} is now live at https://taskflow.com'
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

      - name: Rollback on failure
        if: failure()
        run: |
          echo "❌ Deployment failed, rolling back..."
          # Add rollback logic here
```

---

### GitLab CI Example

**File:** `.gitlab-ci.yml`

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"
  POSTGRES_DB: test
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres

# Test stage
test:
  stage: test
  image: node:18
  services:
    - postgres:15
  variables:
    DATABASE_URL: "postgres://postgres:postgres@postgres:5432/test"
  before_script:
    - npm ci
  script:
    - npm run lint
    - npm test -- --coverage
    - npm audit --audit-level=high
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

# Build stage
build:
  stage: build
  image: node:18
  before_script:
    - npm ci
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  rules:
    - if: $CI_COMMIT_BRANCH == "main"

# Deploy to staging
deploy:staging:
  stage: deploy
  image: node:18
  environment:
    name: staging
    url: https://taskflow-staging.vercel.app
  script:
    - npm install -g vercel
    - vercel --token=$VERCEL_TOKEN --prod
  rules:
    - if: $CI_COMMIT_BRANCH == "main"

# Deploy to production (manual)
deploy:production:
  stage: deploy
  image: node:18
  environment:
    name: production
    url: https://taskflow.com
  script:
    - npm install -g vercel
    - vercel --token=$VERCEL_TOKEN --prod
  when: manual
  rules:
    - if: $CI_COMMIT_TAG =~ /^v\d+\.\d+\.\d+$/
```

---

## Quality Gate Integration

### Enforcing E30: Test Coverage

```yaml
# GitHub Actions
- name: Check coverage threshold
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    if (( $(echo "$COVERAGE < 70" | bc -l) )); then
      echo "❌ Coverage $COVERAGE% is below 70% threshold"
      exit 1
    fi
    echo "✅ Coverage $COVERAGE% meets threshold"
```

### Enforcing E31: Security Issues

```yaml
# GitHub Actions
- name: Security audit
  run: |
    npm audit --audit-level=high
    if [ $? -ne 0 ]; then
      echo "❌ Security vulnerabilities found (critical/high)"
      exit 1
    fi
    echo "✅ No critical/high security issues"
```

### Enforcing E33: Acceptance Criteria

```yaml
# GitHub Actions
- name: Run integration tests
  run: |
    npm run test:integration
    if [ $? -ne 0 ]; then
      echo "❌ Integration tests failed (AC scenarios failing)"
      exit 1
    fi
    echo "✅ All acceptance criteria passing"
```

---

## Environment Configuration

### Required Secrets

**GitHub Actions:**
```
Settings → Secrets and variables → Actions → New repository secret
```

| Secret Name | Description | Example |
|------------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `API_KEY` | OpenAI API key | `sk-...` |
| `VERCEL_TOKEN` | Vercel deployment token | `...` |
| `VERCEL_ORG_ID` | Vercel organization ID | `...` |
| `VERCEL_PROJECT_ID` | Vercel project ID | `...` |
| `SLACK_WEBHOOK` | Slack notifications webhook | `https://hooks.slack.com/...` |

### Environment Protection

**GitHub:**
```
Settings → Environments → New environment
```

**Production Environment:**
- ✅ Required reviewers (2 approvers)
- ✅ Wait timer (5 minutes)
- ✅ Deployment branches (tags: `v*.*.*` only)

---

## Best Practices

### ✅ Do:
- Run quality gates on every PR
- Require tests to pass before merging
- Deploy to staging automatically
- Require manual approval for production
- Use environment-specific secrets
- Monitor deployment success/failure
- Set up notifications (Slack, email)

### ❌ Don't:
- Skip quality checks in CI/CD
- Commit secrets to repository
- Deploy to production without approval
- Ignore failed deployments
- Use same secrets for staging/production

---

## Troubleshooting

### "Workflow not triggering"

**Cause:** Workflow file syntax error or wrong branch
**Solution:**
```bash
# Validate YAML syntax
npx yaml-lint .github/workflows/test.yml

# Check branch filter
cat .github/workflows/test.yml | grep branches
```

### "Coverage check failing"

**Cause:** Coverage threshold not met
**Solution:**
- Add more tests to reach 70% coverage
- Or adjust threshold in workflow (not recommended)

### "Secrets not found"

**Cause:** Secrets not configured in repository settings
**Solution:**
```
1. Go to Settings → Secrets → Actions
2. Add required secrets (see table above)
3. Re-run workflow
```

---

## Customization

### Adding Custom Steps

Edit generated workflow files:

```yaml
# Add custom step after tests
- name: Custom validation
  run: npm run custom:validate

# Add before deployment
- name: Database migration
  run: npm run db:migrate
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Platform-Specific Templates

Custom templates can be created in:
```
docs/config/templates/cicd/
├── github-actions/
├── gitlab-ci/
├── circleci/
└── jenkins/
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-13 | Initial CI/CD pipeline generation system |

---

**Status:** ✅ Ready for use
**Risk:** ✅ ZERO - Pure addition, DevOps best practices automated
**Impact:** Automated quality enforcement, safe deployments, continuous integration
