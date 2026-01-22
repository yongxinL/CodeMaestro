# Domain-Specific Code Scaffolding

**Version:** 1.0
**Date:** 2026-01-13
**Status:** ✅ Active
**Risk Level:** ✅ ZERO RISK (Optional convenience feature)

---

## Overview

The Domain-Specific Scaffolding feature automatically generates project structures, configuration files, and boilerplate code based on the detected or specified project domain (Mobile, Web, Cloud, AI/ML). This accelerates project initialization and ensures best practices are followed from day one.

**Key Benefits:**
- **Fast Setup**: Generate complete project structure in seconds
- **Best Practices**: Domain-specific conventions and tooling pre-configured
- **Consistency**: Standardized structure across similar projects
- **Reduced Errors**: Pre-validated configurations and dependencies
- **Learning**: New developers see recommended patterns immediately

---

## Supported Domains

### 1. Mobile (iOS/Android)
- React Native or Flutter scaffolds
- Native platform directories (ios/, android/)
- Mobile-specific navigation and state management
- Detox/Appium E2E testing setup
- App Store/Play Store deployment configs

### 2. Web (Frontend/Full-stack)
- React/Vue/Angular/Svelte scaffolds
- Next.js/Nuxt/SvelteKit for SSR
- Modern build tools (Vite, Webpack, Turbopack)
- Component libraries and design systems
- Cypress/Playwright E2E testing

### 3. Cloud (Backend/Microservices)
- Express/Fastify/NestJS (Node.js)
- FastAPI/Django (Python)
- Spring Boot (Java)
- Containerization (Docker, docker-compose)
- Infrastructure as Code (Terraform, CloudFormation)
- API documentation (OpenAPI/Swagger)

### 4. AI/ML (Data Science/Machine Learning)
- Jupyter notebook structures
- Model training pipelines
- Data preprocessing modules
- MLOps configurations (MLflow, Weights & Biases)
- Model serving (TensorFlow Serving, TorchServe)
- Experiment tracking and versioning

---

## Commands

### /scaffold [domain]

Generate a complete project structure for the specified domain.

**Syntax:**
```bash
/scaffold mobile         # React Native mobile app
/scaffold web           # React/Next.js web app
/scaffold cloud         # Node.js/Express backend
/scaffold ai            # ML/Data Science project
/scaffold --auto        # Auto-detect from locked specification
```

**Options:**
- `--framework [name]`: Override default framework (e.g., `--framework vue`)
- `--language [lang]`: Override default language (e.g., `--language python`)
- `--template [type]`: Use specific template variant (e.g., `--template minimal`)
- `--dry-run`: Preview structure without creating files
- `--auto`: Auto-detect domain from locked specification

**Example:**
```bash
/scaffold mobile --framework react-native --language typescript
```

---

## Domain Detection Logic

### Automatic Detection

The system analyzes the locked specification to determine the appropriate domain:

**Detection Criteria:**

| Domain | Keywords in Specification | Technical Stack Indicators |
|--------|---------------------------|----------------------------|
| Mobile | "mobile app", "iOS", "Android", "smartphone" | React Native, Flutter, Swift, Kotlin |
| Web | "website", "web app", "browser", "dashboard" | React, Vue, Angular, Next.js |
| Cloud | "API", "backend", "microservices", "serverless" | Express, FastAPI, Spring, Lambda |
| AI/ML | "machine learning", "model", "prediction", "dataset" | TensorFlow, PyTorch, scikit-learn |

**Multi-Domain Projects:**
If multiple domains detected, prompt user to specify primary domain:
```
⚠️  Multiple domains detected: Mobile + Cloud
   Which should be the primary scaffold?
   1. Mobile (with backend integration)
   2. Cloud (with mobile client stub)
```

---

## Scaffold Structures

### Mobile Domain (React Native + TypeScript)

```
project-name/
├── src/
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── navigation/           # React Navigation setup
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   ├── services/             # API clients and services
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── store/                # State management (Redux/Zustand)
│   │   ├── authSlice.ts
│   │   └── store.ts
│   ├── utils/                # Utility functions
│   │   ├── validation.ts
│   │   └── formatting.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   └── App.tsx               # Root component
├── tests/
│   ├── unit/                 # Jest unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # Detox E2E tests
│       └── firstTest.e2e.ts
├── android/                  # Native Android code
├── ios/                      # Native iOS code
├── .eslintrc.js              # React Native linting
├── .prettierrc               # Code formatting
├── tsconfig.json             # TypeScript config
├── jest.config.js            # Testing config
├── metro.config.js           # Metro bundler config
├── package.json              # Dependencies
└── README.md                 # Project documentation
```

**Generated Files Include:**
- Basic navigation structure
- Authentication flow skeleton
- API service with error handling
- State management boilerplate
- E2E test example
- Linting and formatting configs

---

### Web Domain (Next.js + TypeScript)

```
project-name/
├── src/
│   ├── app/                  # Next.js 13+ app directory
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── api/              # API routes
│   │   │   └── auth/
│   │   └── (routes)/         # Feature-based routes
│   ├── components/           # React components
│   │   ├── ui/               # UI primitives
│   │   ├── forms/            # Form components
│   │   └── layouts/          # Layout components
│   ├── lib/                  # Shared utilities
│   │   ├── api.ts            # API client
│   │   ├── db.ts             # Database client
│   │   └── utils.ts
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── styles/               # Global styles
│       └── globals.css
├── public/                   # Static assets
│   ├── images/
│   └── fonts/
├── tests/
│   ├── unit/                 # Jest + React Testing Library
│   ├── integration/
│   └── e2e/                  # Playwright tests
│       └── home.spec.ts
├── .eslintrc.json            # ESLint config
├── .prettierrc               # Prettier config
├── tsconfig.json             # TypeScript config
├── next.config.js            # Next.js config
├── tailwind.config.js        # Tailwind CSS config (if selected)
├── jest.config.js            # Jest config
├── playwright.config.ts      # Playwright config
├── package.json
└── README.md
```

**Generated Files Include:**
- Next.js 13+ app directory structure
- API routes with middleware
- Component library foundation
- Database client setup (Prisma/Drizzle)
- Authentication middleware
- E2E test examples
- Styling framework (Tailwind/CSS Modules)

---

### Cloud Domain (Node.js + Express + TypeScript)

```
project-name/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── services/             # Business logic
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── repositories/         # Data access layer
│   │   └── userRepository.ts
│   ├── models/               # Data models
│   │   └── User.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validator.ts
│   ├── routes/               # API routes
│   │   ├── authRoutes.ts
│   │   └── userRoutes.ts
│   ├── config/               # Configuration
│   │   ├── database.ts
│   │   └── env.ts
│   ├── utils/                # Utilities
│   │   ├── logger.ts
│   │   └── validation.ts
│   ├── types/                # TypeScript types
│   └── app.ts                # Express app setup
│   └── server.ts             # Server entry point
├── tests/
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── e2e/                  # E2E API tests
│       └── auth.test.ts
├── docs/
│   └── api/                  # OpenAPI/Swagger docs
│       └── openapi.yaml
├── migrations/               # Database migrations
├── .env.example              # Environment variables template
├── .eslintrc.js
├── tsconfig.json
├── jest.config.js
├── Dockerfile                # Container definition
├── docker-compose.yml        # Local development stack
├── package.json
└── README.md
```

**Generated Files Include:**
- RESTful API structure (controllers → services → repositories)
- Authentication middleware (JWT)
- Database setup (PostgreSQL/MongoDB)
- OpenAPI/Swagger documentation
- Docker containerization
- Environment configuration
- Logging and error handling
- API integration tests

---

### AI/ML Domain (Python)

```
project-name/
├── notebooks/                # Jupyter notebooks
│   ├── 01_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   └── 03_training.ipynb
├── src/
│   ├── data/                 # Data processing
│   │   ├── loader.py
│   │   ├── preprocessor.py
│   │   └── augmentation.py
│   ├── models/               # Model architectures
│   │   ├── base_model.py
│   │   └── custom_model.py
│   ├── training/             # Training pipelines
│   │   ├── trainer.py
│   │   └── callbacks.py
│   ├── evaluation/           # Model evaluation
│   │   ├── metrics.py
│   │   └── visualizer.py
│   ├── inference/            # Model serving
│   │   └── predictor.py
│   ├── utils/                # Utilities
│   │   ├── logging.py
│   │   └── config.py
│   └── config/               # Configuration files
│       └── config.yaml
├── tests/
│   ├── test_data.py
│   ├── test_models.py
│   └── test_training.py
├── experiments/              # Experiment tracking
│   └── .gitkeep
├── models/                   # Saved models
│   └── .gitkeep
├── data/
│   ├── raw/                  # Raw data
│   ├── processed/            # Processed data
│   └── .gitkeep
├── requirements.txt          # Python dependencies
├── requirements-dev.txt      # Development dependencies
├── setup.py                  # Package setup
├── Dockerfile                # ML container
├── .dvcignore                # Data Version Control
├── mlflow_config.yaml        # MLflow configuration
└── README.md
```

**Generated Files Include:**
- Jupyter notebook templates
- Data pipeline (loading, preprocessing, augmentation)
- Model training scaffold (PyTorch/TensorFlow)
- Experiment tracking (MLflow/Weights & Biases)
- Model evaluation and visualization
- Inference API (FastAPI)
- Docker container for reproducibility
- Data versioning setup (DVC)

---

## Integration with Phase 2 Planning

### Automatic Scaffolding Trigger

During Phase 2 (Planning), after the architecture blueprint is created:

```
📋 Architecture Blueprint Complete

Technology Stack:
  - Frontend: React Native (TypeScript)
  - Backend: Node.js + Express
  - Database: PostgreSQL

🔧 Recommend scaffolding now?
   /scaffold mobile --framework react-native
   /scaffold cloud --framework express

This will generate project structure aligned with the blueprint.
Proceed? (Y/n)
```

### Manual Scaffolding

Users can scaffold at any time:
```bash
# Phase 2: After blueprint creation
/scaffold mobile

# Phase 3: If structure missing during implementation
/scaffold web --template minimal
```

---

## Customization and Extension

### Custom Scaffold Templates

Users can create custom templates in `.CodeMaestro/config/scaffolds/`:

```
.CodeMaestro/config/scaffolds/
├── mobile-custom/
│   ├── template.yaml         # Template definition
│   └── files/                # Template files
│       ├── src/
│       └── package.json
└── web-custom/
    └── ...
```

**template.yaml Format:**
```yaml
name: "Mobile Custom"
domain: mobile
framework: react-native
language: typescript
description: "Custom mobile scaffold with our conventions"

files:
  - src: "files/src"
    dest: "src"
  - src: "files/package.json"
    dest: "package.json"
    variables:
      - PROJECT_NAME
      - AUTHOR

post_scaffold:
  - npm install
  - npx pod-install ios
```

**Usage:**
```bash
/scaffold --template mobile-custom
```

---

## Scaffold Comparison

### Framework Selection

When multiple frameworks available for a domain:

```
Multiple frameworks available for Web domain:
┌─────────────────────────────────────────────────────────┐
│ Framework   │ Best For              │ Learning Curve    │
├─────────────────────────────────────────────────────────┤
│ Next.js     │ Full-stack, SEO       │ Medium            │
│ React (CRA) │ SPA, simple apps      │ Low               │
│ Vue         │ Progressive adoption  │ Low               │
│ Angular     │ Enterprise apps       │ High              │
│ Svelte      │ Performance-critical  │ Low-Medium        │
└─────────────────────────────────────────────────────────┘

Recommendation: Next.js (based on "SEO-critical" in specification)
Override with: /scaffold web --framework vue
```

---

## Phase-Specific Usage

### Phase 1: Requirements
- Domain detection based on specification
- No scaffolding yet (no technical decisions made)

### Phase 2: Planning
- **Primary usage phase**
- Scaffold after architecture blueprint approved
- Ensures structure matches architectural decisions
- Technology stack determines scaffold variant

### Phase 3: Implementation
- Scaffold can be run if missed in Phase 2
- Warn if files already exist (avoid overwrite)
- Generate missing directories only

### Phase 4: Verification
- No scaffolding (structure should exist)
- Use `/scaffold --validate` to check structure completeness

### Phase 5: Release
- No scaffolding (project complete)

---

## Validation and Safety

### Pre-Scaffold Checks

Before scaffolding, verify:
1. **No existing structure**: Warn if project files already exist
2. **Git repository initialized**: Ensure version control active
3. **Technology stack defined**: Require architecture blueprint first
4. **Disk space**: Check adequate space for dependencies

**Safety Prompts:**
```
⚠️  Existing files detected in src/
   Scaffolding may overwrite:
   - src/App.tsx
   - src/index.ts

   Options:
   1. Backup existing files and proceed
   2. Merge scaffold with existing (manual)
   3. Cancel
```

### Post-Scaffold Validation

After scaffolding:
```bash
/scaffold mobile --framework react-native

✅ Scaffolded 47 files
✅ Installed 23 dependencies
✅ Configured linting and formatting
✅ Generated example tests

Next steps:
1. Review generated files in src/
2. Update .env with API keys
3. Run: npm start
4. Begin implementation (Phase 3)
```

---

## Integration with Other Systems

### With Git Workflow
```bash
# After scaffolding, create feature branch
/scaffold web
git checkout -b feature/project-setup
git add .
/commit --auto
# Message: "feat(scaffold): Initialize web project structure with Next.js"
```

### With Quality Gates
- Scaffolds include linting configs (E30 threshold enforcement)
- Pre-configured test runners (E33 coverage tracking)
- Security scanning setup (E31 vulnerability detection)

### With Knowledge Base
- Scaffold decisions logged to KB:
```markdown
<!-- .CodeMaestro/knowledge-base/decisions/D002-nextjs-framework.md -->
# D002: Chose Next.js for Web Framework

**Rationale:** SEO-critical application requires SSR, Next.js recommended by scaffold system based on specification keywords.
```

---

## Examples

### Example 1: Mobile Project (React Native)

**Command:**
```bash
/scaffold mobile --framework react-native --language typescript
```

**Output:**
```
🔧 Scaffolding Mobile Project...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework: React Native
Language: TypeScript
Target Platforms: iOS, Android

Generated Structure:
├── src/ (8 directories, 23 files)
├── tests/ (3 directories, 5 files)
├── android/ (native Android)
├── ios/ (native iOS)
└── Configuration files (7 files)

✅ Created 47 files
✅ Installed dependencies:
   - react-native: 0.73.0
   - typescript: 5.3.3
   - @react-navigation/native: 6.1.9
   + 20 more...

✅ Configured tools:
   - ESLint (React Native rules)
   - Prettier (standard config)
   - Jest (unit testing)
   - Detox (E2E testing)

Next Steps:
1. Update .env with API endpoint
2. Run: npm start
3. Run: npm run ios (or npm run android)
4. Begin feature implementation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Example 2: Web Project (Next.js)

**Command:**
```bash
/scaffold web --auto
```

**Output:**
```
🔍 Auto-detecting domain from specification...
   Detected: Web (keywords: "dashboard", "browser-based")
   Framework: Next.js (SEO requirements detected)

🔧 Scaffolding Web Project...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework: Next.js 14
Language: TypeScript
Styling: Tailwind CSS (recommended)

Generated Structure:
├── src/app/ (Next.js 13+ app directory)
├── src/components/ (UI components)
├── src/lib/ (utilities and API client)
├── tests/ (unit, integration, e2e)
└── Configuration files

✅ Created 52 files
✅ Installed dependencies (Next.js, React, Tailwind)
✅ Configured tools (ESLint, Prettier, Playwright)

API Routes Created:
  - /api/auth/login
  - /api/auth/logout
  - /api/health

Next Steps:
1. Run: npm run dev
2. Visit: http://localhost:3000
3. Edit src/app/page.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Example 3: Cloud Backend (Express)

**Command:**
```bash
/scaffold cloud --framework express --language typescript
```

**Output:**
```
🔧 Scaffolding Cloud Backend...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework: Express.js
Language: TypeScript
Database: PostgreSQL (from blueprint)
Auth: JWT

Generated Structure:
├── src/
│   ├── controllers/ (3 controllers)
│   ├── services/ (3 services)
│   ├── repositories/ (2 repositories)
│   ├── routes/ (3 route modules)
│   └── middleware/ (auth, error handling)
├── tests/ (unit, integration, e2e)
├── docs/api/ (OpenAPI spec)
└── Docker files

✅ Created 39 files
✅ Installed dependencies
✅ Configured:
   - Database connection (PostgreSQL)
   - JWT authentication
   - OpenAPI documentation
   - Docker containerization

API Endpoints Created:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET  /api/users
  - GET  /api/health

Next Steps:
1. Copy .env.example to .env
2. Configure DATABASE_URL and JWT_SECRET
3. Run: docker-compose up -d (start database)
4. Run: npm run migrate (create tables)
5. Run: npm run dev (start server)
6. Visit: http://localhost:3000/api-docs (Swagger UI)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Error Handling

### Common Errors

**Error: Domain Detection Failed**
```
❌ Could not detect domain from specification
   Specification keywords insufficient for auto-detection.

   Solution: Specify domain explicitly:
   /scaffold mobile
   /scaffold web
   /scaffold cloud
   /scaffold ai
```

**Error: Files Already Exist**
```
⚠️  Scaffolding aborted: 12 files would be overwritten

   Options:
   1. Backup and proceed: /scaffold web --backup
   2. Merge manually: /scaffold web --dry-run (preview)
   3. Force overwrite: /scaffold web --force (⚠️ destructive)
```

**Error: Missing Prerequisites**
```
❌ Cannot scaffold: Architecture blueprint not found

   Solution:
   1. Complete Phase 2 (Planning)
   2. Generate blueprint: /blueprint
   3. Retry scaffolding
```

---

## Best Practices

### When to Scaffold

**✅ Good Times:**
- Beginning of Phase 2 (after architecture decisions)
- Starting fresh project with clear domain
- Onboarding new team members (standardization)
- Prototyping new features in isolation

**❌ Bad Times:**
- Phase 1 (requirements) - too early
- Mid-Phase 3 (implementation) - likely conflicts
- Existing projects with established structure

### Customization Guidelines

1. **Start with scaffold, customize incrementally**: Don't heavily customize scaffolds; modify as needed per project
2. **Document deviations**: If deviating from scaffold structure, log in knowledge base
3. **Update templates**: If patterns emerge, create custom scaffold templates
4. **Share learnings**: Export successful scaffolds for reuse

---

## Constraints Satisfied

This feature supports the following constraints:

- **A1 (Production-ready dependencies)**: Scaffolds only use stable, production-ready libraries
- **D22 (Single Responsibility)**: Generated structure enforces SRP with clear separations
- **D24 (Naming conventions)**: Scaffolds use domain-standard naming
- **E30 (Linting)**: Pre-configured linters enforce code quality
- **E33 (Test coverage)**: Test structures and examples included

---

## Future Enhancements

### Planned Improvements (v1.1+)

1. **Interactive Wizard**: Step-by-step scaffold customization
2. **More Domains**: Desktop (Electron), CLI tools, browser extensions
3. **Micro-frontend Support**: Module federation, Nx monorepo
4. **GraphQL Scaffolds**: Apollo Server/Client setup
5. **Terraform Templates**: Cloud infrastructure scaffolding

---

## Summary

The Domain-Specific Scaffolding feature provides:
- ✅ Fast project initialization (4 domains supported)
- ✅ Best practices by default
- ✅ Framework flexibility
- ✅ Safety checks and validation
- ✅ Integration with Phase 2 workflow
- ✅ Customizable templates
- ✅ Zero function loss (optional feature)

**Primary Usage:**
Phase 2 (Planning), after architecture blueprint is approved.

**Command:**
`/scaffold [mobile|web|cloud|ai] [--framework X] [--auto]`
