# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Repository Overview

This repository contains [PROJECT_DESCRIPTION]. The primary content is located in the `src/` directory, with documentation in `docs/`.

## Project Structure

### Documentation Organization
- `docs/.internal/` - Internal documentation (not committed to git)
  - `_index.md` - Architecture overview with Mermaid diagrams
  - `components/` - Component-specific documentation
  - `adr/` - Architecture Decision Records
  - `api/` - API specifications
  - `glossary.md` - Project-specific terminology
- `docs/public/` - Public documentation (committed to git)
- `README.md` - Project overview and quick start guide

### Development Context
- Follow edit-test loop methodology: implement incrementally, write/run tests, refine
- Autonomous file system operations are permitted for project structure and code
- Comprehensive error handling and bug fixing is expected
- Documentation should be updated as development progresses

## Claude Code Configuration

This project is configured with:
- **Full development autonomy** - Create/modify files and run development commands
- **Automatic testing** - Tests run after code changes
- **Activity logging** - All operations logged to `.claude/` directory
- **Apple Silicon compatibility** - Docker builds for Google Cloud deployments
- **Comprehensive MCP servers** - Memory, Git, filesystem, search, and development tools

## Working with This Repository

### Development Workflow
1. **Iterative Development**: Implement changes incrementally based on the agreed-upon plan
2. **Testing**: Follow edit-test loop - write functionality, then tests, refine until passing
3. **Documentation**: Update relevant docs in `docs/.internal/` as you develop
4. **Architecture Decisions**: Document significant choices in `docs/.internal/adr/`

### Communication Style
- **Concise & Direct**: Keep updates and reports focused and actionable
- **Technical Focus**: Prioritize technical details over generic explanations
- **Execution-Oriented**: Focus on implementing efficiently and effectively

### Ambiguity Resolution
- Minor implementation details: Make educated decisions based on best practices, then report
- High-stakes changes or architecture deviations: **PAUSE** and ask for user clarification

## Key Technical Guidelines

### Error Handling
- Attempt autonomous error resolution and bug fixing
- Report implemented fixes
- For complex issues, report the problem and attempted solutions, then seek clarification

### File Operations
- Authority to create directories and modify files according to project needs
- Maintain consistent naming conventions
- Update both public and internal documentation as appropriate

### Model Usage
- Default: Claude 4.0 Sonnet for most development tasks
- Complex problems: Claude 4.0 Opus (explicitly request when needed)
- Full bash outputs with summaries for transparency

## Environment Setup

Before starting development:

3. Run setup script: `./setup-claude-docs.sh`
4. Initialize git repository if needed

## Business Context

### Blockport Company Information
This project benefits from comprehensive business context located at `docs/.internal/blockport-context/blockport-context.md`, which includes:
- Company vision, mission, and purpose (100% Solana-focused)
- Brand identity guidelines (logos, typography, color palette)
- Core services: Solana Validator Operations, RPC Endpoints, and Institutional Validator Setup
- Target market: institutional, wholesale, and sophisticated blockchain participants
- Technical specifications and validator performance metrics

**Key Business Constraints:**
- Blockport is exclusively Solana-focused (no other blockchain support)
- Target audience is institutional and sophisticated blockchain participants
- All solutions should align with validator operations and RPC infrastructure
- Maintain 99.99% uptime standards and 0% commission philosophy

## Project-Specific Context

### Project Type Templates
When starting a new project, reference the appropriate preference guide in `templates/`:
- **WebApp Internal**: `templates/webapp-internal/preferences.md` - Internal dashboards, rapid development
- **WebApp Public**: `templates/webapp-public/preferences.md` - Customer-facing, polished applications  
- **Automation**: `templates/automation/preferences.md` - Backend processes, data pipelines
- **Blockchain**: `templates/blockchain/preferences.md` - Solana programs and services
- **AI Content**: `templates/ai-content/preferences.md` - AI-powered content generation

### Development Standards
- **Linting/Formatting**: Configuration in `config/` directory
- **TypeScript/JavaScript**: Prettier + ESLint (see `config/.prettierrc` and `config/.eslintrc.js`)
- **Rust**: rustfmt + clippy (see `config/rustfmt.toml`)

### Cursor IDE Integration
- **Planning Mode**: Use for understanding requirements and planning approach
- **Developer Mode**: Use for active development and implementation
- **PRD Generator**: Use for creating comprehensive project requirements
- See `cursor/` directory for detailed mode descriptions 