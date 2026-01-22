# MCP Tool Integration Configuration

## Overview

This document defines Model Context Protocol (MCP) tool integrations for CodeMaestro, enabling the system to access external services and capabilities during development phases.

**Version:** 1.0.0
**Last Updated:** 2026-01-12

---

## Available MCP Tools

### 1. Context7 (Library Documentation)

**Purpose:** Retrieve up-to-date documentation and code examples for any programming library or framework.

**Capabilities:**
- Resolve library names to Context7-compatible IDs
- Query documentation with natural language
- Get code examples and best practices
- Access latest version information

**When to Use:**
- **Phase 1 (Requirements):** Research technology options during competitive analysis
- **Phase 2 (Planning):** Validate library capabilities during architecture design
- **Phase 3 (Implementation):** Look up API usage and code examples
- **Phase 4 (Verification):** Check security best practices and testing approaches

**Usage Pattern:**
```
1. Use resolve-library-id to find the library
2. Use query-docs to get specific documentation
3. Limit: Maximum 3 calls per question to avoid token waste
```

**Examples:**
- "Get latest React hooks documentation"
- "Find authentication examples for Express.js"
- "Check MongoDB best practices for connection pooling"
- "Look up pytest fixture patterns"

**Constraints:**
- A7 applies: Never invent/assume APIs without confirmed documentation
- Always verify library version compatibility with project requirements
- Document source in architecture decisions

---

### 2. WebSearch (Research & Analysis)

**Purpose:** Search the web for current information, market research, and competitive analysis.

**Capabilities:**
- Search with natural language queries
- Filter by allowed/blocked domains
- Get up-to-date information beyond training cutoff
- Access documentation websites

**When to Use:**
- **Phase 1 (Requirements):** Competitive analysis, market research, user needs
- **Phase 2 (Planning):** Technology comparison, architecture pattern research
- **Phase 4 (Verification):** Security vulnerability research, compliance requirements

**Usage Pattern:**
```
1. Formulate specific search query
2. Include year (2026) for recent information
3. Use domain filtering for authoritative sources
4. Always cite sources in decisions
```

**Examples:**
- "Latest web accessibility guidelines WCAG 2026"
- "Kubernetes deployment best practices 2026"
- "GDPR compliance requirements for AI applications"
- "Compare serverless framework performance benchmarks 2026"

**Constraints:**
- Must cite sources in decision log
- Verify information from multiple sources
- Check publication date for currency

---

### 3. WebFetch (Documentation Retrieval)

**Purpose:** Fetch and analyze content from specific URLs, converting HTML to markdown for AI processing.

**Capabilities:**
- Fetch content from URLs
- Convert HTML to markdown
- Extract specific information with prompts
- Handle redirects

**When to Use:**
- **Phase 1 (Requirements):** Analyze competitor features from websites
- **Phase 2 (Planning):** Read official documentation from specific pages
- **Phase 3 (Implementation):** Reference API documentation
- **Phase 4 (Verification):** Read security advisories, changelogs

**Usage Pattern:**
```
1. Verify URL is valid and accessible
2. Provide specific prompt for what to extract
3. Handle redirects by making new request
4. Cache is 15 minutes - reuse for efficiency
```

**Examples:**
- Fetch specific API documentation page
- Analyze competitor product features
- Read framework migration guides
- Review security advisory details

**Constraints:**
- Prefer MCP-provided web fetch tool if available
- Always validate information extracted
- Document source URL in decisions

---

## Phase-Specific Tool Usage

### Phase 1: Requirements (Product Manager)

**Primary Tools:**
- **WebSearch**: Competitive analysis, market research
- **Context7**: Technology feasibility validation
- **WebFetch**: Competitor feature analysis

**Workflow Integration:**
```markdown
## Competitive Analysis
1. Use WebSearch to identify competitors
2. Use WebFetch to analyze competitor features
3. Document findings in locked specification
4. Cite all sources
```

**Commands:**
- `/research competitors [domain]` - Automated competitor research
- `/validate technology [library]` - Check library capabilities via Context7

---

### Phase 2: Planning (Software Architect)

**Primary Tools:**
- **Context7**: Library documentation, API validation
- **WebSearch**: Architecture pattern research
- **WebFetch**: Official documentation pages

**Workflow Integration:**
```markdown
## Technology Stack Validation
1. For each proposed library:
   - Use Context7 to resolve library ID
   - Query documentation for capabilities
   - Validate version compatibility
2. Document in blueprint with sources
3. Add to constraints (A7: confirmed APIs only)
```

**Commands:**
- `/lookup library [name]` - Get library documentation via Context7
- `/compare [tech1] vs [tech2]` - Research technology comparison
- `/validate api [library] [feature]` - Confirm API exists

---

### Phase 3: Implementation (Senior Developer)

**Primary Tools:**
- **Context7**: Code examples, API usage
- **WebFetch**: Specific documentation pages

**Workflow Integration:**
```markdown
## Implementation Support
1. Before implementing new feature:
   - Check Context7 for code examples
   - Validate API signatures
   - Follow documented best practices
2. Document patterns in knowledge base
3. Reference sources in code comments
```

**Commands:**
- `/example [library] [feature]` - Get code examples
- `/api [library] [method]` - Look up API signature

---

### Phase 4: Verification (QA Lead)

**Primary Tools:**
- **WebSearch**: Security vulnerability research, compliance
- **Context7**: Testing best practices
- **WebFetch**: Security advisories, CVE details

**Workflow Integration:**
```markdown
## Security & Compliance Validation
1. Research known vulnerabilities:
   - WebSearch for "[library] security vulnerabilities 2026"
   - WebFetch CVE databases for details
2. Validate compliance requirements:
   - WebSearch for GDPR/WCAG guidelines
   - Document in evidence package
3. Check testing best practices via Context7
```

**Commands:**
- `/security check [library]` - Research known vulnerabilities
- `/compliance [standard]` - Look up compliance requirements

---

### Phase 5: Release (Release Manager)

**Primary Tools:**
- **WebSearch**: Deployment best practices, monitoring
- **WebFetch**: Cloud provider documentation

**Workflow Integration:**
```markdown
## Release Preparation
1. Research deployment strategies via WebSearch
2. Validate cloud platform documentation via WebFetch
3. Document runbook with authoritative sources
```

---

## Tool Access Control

### By Role

| Role | Context7 | WebSearch | WebFetch |
|------|----------|-----------|----------|
| Product Manager | Read | Full | Full |
| Software Architect | Full | Full | Full |
| Senior Developer | Full | Limited | Full |
| QA Lead | Read | Full | Full |
| Release Manager | Limited | Full | Full |
| Data Interpreter | Read | Limited | Limited |
| Ethics & Security | Read | Full | Full |

**Access Levels:**
- **Full**: Unlimited queries within rate limits
- **Read**: Documentation only, no exploratory research
- **Limited**: Specific use cases only (see role definition)

---

## Best Practices

### 1. Query Efficiency
- **Context7**: Max 3 calls per question
- **WebSearch**: Use specific queries, avoid broad searches
- **WebFetch**: Reuse 15-minute cache when possible

### 2. Source Citation
- Always document sources in decision log
- Include URLs in architecture documentation
- Reference in knowledge base entries

### 3. Validation
- Cross-reference information from multiple sources
- Verify publication dates for currency
- Check library versions match project requirements

### 4. Constraint Compliance
- **A7**: Only use confirmed APIs from Context7
- Document all external research
- Add sources to evidence packages

### 5. Token Management
- Use progressive disclosure: don't fetch everything upfront
- Summarize lengthy documentation
- Cache frequently used information in knowledge base

---

## Configuration

### Context7 Settings

```yaml
# Context7 MCP Server Configuration
name: context7
type: mcp-server
enabled: true

settings:
  max_calls_per_question: 3
  cache_duration: 3600  # 1 hour

constraints:
  - A7  # Only confirmed APIs
  - Document sources in decision log
```

### WebSearch Settings

```yaml
# WebSearch Configuration
name: web-search
type: mcp-tool
enabled: true

settings:
  region: US
  safe_search: true
  max_results: 10

constraints:
  - Must cite sources
  - Include publication year in queries
  - Verify from multiple sources
```

### WebFetch Settings

```yaml
# WebFetch Configuration
name: web-fetch
type: mcp-tool
enabled: true

settings:
  cache_duration: 900  # 15 minutes
  convert_to_markdown: true
  follow_redirects: true

constraints:
  - Validate URLs before fetching
  - Document source in decisions
```

---

## Integration Workflow

### 1. Tool Discovery
When starting a new phase:
```bash
# System checks available MCP tools
/tools list

# Output shows:
# ✅ Context7 - Library documentation
# ✅ WebSearch - Web research
# ✅ WebFetch - URL content retrieval
```

### 2. Tool Usage
Role-specific tool access:
```
Phase 2: Planning (Software Architect)
Available tools:
  - Context7 (Full access)
  - WebSearch (Full access)
  - WebFetch (Full access)
```

### 3. Source Tracking
All tool usage documented:
```markdown
## Decision: Use React for Frontend

**Research:**
- Context7: /facebook/react/v18.2.0 - Component architecture, hooks
- WebSearch: "React vs Vue performance 2026" - Performance benchmarks
- WebFetch: https://react.dev/blog/2026/... - Latest features

**Rationale:** [Based on research above...]
```

---

## Commands Reference

### New MCP-Enhanced Commands

| Command | Description | Phase |
|---------|-------------|-------|
| `/research [topic]` | WebSearch + Context7 combined research | 1, 2 |
| `/lookup [library]` | Context7 library documentation | 2, 3 |
| `/validate api [lib] [method]` | Confirm API exists via Context7 | 2, 3 |
| `/example [lib] [feature]` | Get code examples from Context7 | 3 |
| `/security check [lib]` | Research vulnerabilities via WebSearch | 4 |
| `/compliance [standard]` | Look up compliance via WebSearch | 4 |
| `/sources` | List all MCP tool sources used | All |

---

## Troubleshooting

### Context7 Issues
**Problem:** Library not found
- Try alternative names (e.g., "react" vs "facebook/react")
- Check if library is in Context7 database
- Use WebSearch as fallback

**Problem:** Rate limit reached
- Wait for cache refresh (1 hour)
- Use knowledge base for common patterns
- Prioritize critical queries

### WebSearch Issues
**Problem:** No relevant results
- Include year (2026) in query
- Use more specific terms
- Try domain filtering (allowed_domains)

**Problem:** Outdated information
- Verify publication date
- Cross-reference multiple sources
- Check official documentation via WebFetch

### WebFetch Issues
**Problem:** URL redirects to different host
- Use new URL provided in response
- Update documentation with canonical URL

**Problem:** Content not extracted
- Verify URL is accessible
- Check prompt is specific enough
- Try alternative documentation source

---

## Future Tool Integrations

### Planned (v1.1)
- **GitHub MCP**: Repository analysis, issue tracking
- **Slack MCP**: Team notifications, collaboration
- **Database MCP**: Schema validation, query optimization

### Proposed (v2.0)
- **Cloud Provider MCPs**: AWS, Azure, GCP deployment
- **CI/CD MCPs**: GitHub Actions, CircleCI integration
- **Monitoring MCPs**: Datadog, Prometheus integration
- **Security Scanning MCPs**: Snyk, Semgrep, SAST tools

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-12 | Initial MCP tool integration: Context7, WebSearch, WebFetch |

---

## References

- MCP Specification: https://modelcontextprotocol.io
- Context7 Documentation: https://context7.ai
- CodeMaestro Core: [.CodeMaestro/prompts/00-core.md](../prompts/00-core.md)
- Constraint Reference: [constraints-reference.md](constraints-reference.md)
