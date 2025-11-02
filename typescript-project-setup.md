# TypeScript Node.js Project Setup Guide

A comprehensive guide for setting up a production-ready TypeScript Node.js project with modern tooling and best practices.

## Prerequisites

- **Node.js 20+** installed
- **npm** (comes with Node.js)
- Basic understanding of TypeScript and Node.js

## Core Setup Steps

### 1. Initialize Project

```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize npm project
npm init -y
```

### 2. Configure package.json

Edit `package.json` to set up ESM and scripts:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Your project description",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js",
    "lint": "prettier --check .",
    "fmt": "prettier --write .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### 3. Install Dependencies

```bash
# Development dependencies (TypeScript, tooling)
npm install -D typescript tsx @types/node prettier

# Production dependencies (add as needed)
# Example: npm install dotenv commander pino
```

### 4. TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key settings explained:**
- `"type": "module"` in package.json - Use ESM imports/exports
- `"strict": true` - Enable all strict type checking
- `"outDir": "./dist"` - Compiled JavaScript goes here
- `"rootDir": "./src"` - All source code lives here

### 5. Create Essential Configuration Files

#### `.gitignore`

```gitignore
# Dependencies
node_modules/

# Build output
dist/

# Environment & secrets
.env
.env.local

# Logs
*.log
logs/

# IDE
.DS_Store
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db

# TypeScript
*.tsbuildinfo

# Testing
coverage/
```

#### `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

#### `.env.example`

```bash
# Copy this to .env and fill in your values
# DO NOT commit .env to git

# Example environment variables
NODE_ENV=development
PORT=3000
API_KEY=your_api_key_here
```

## Project Structure Patterns

### Basic Structure

For simple projects:

```
my-project/
├── src/
│   ├── index.ts          # Entry point
│   ├── config.ts         # Configuration
│   ├── types.ts          # Type definitions
│   └── utils/            # Utility functions
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

### Modular Structure

For larger projects with clear domains:

```
my-project/
├── src/
│   ├── index.ts          # Entry point
│   ├── types.ts          # Shared types
│   ├── config.ts         # Configuration
│   ├── logger.ts         # Logging setup
│   ├── module-a/         # Feature module
│   │   ├── service.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── module-b/         # Another feature
│   │   └── ...
│   └── utils/            # Shared utilities
│       ├── errors.ts
│       ├── cache.ts
│       └── helpers.ts
├── docs/                 # Documentation
├── tests/                # Test files
├── package.json
├── tsconfig.json
└── README.md
```

### Layered Architecture

For complex applications (APIs, services):

```
my-project/
├── src/
│   ├── index.ts          # Application entry
│   ├── types/            # Type definitions
│   ├── config/           # Configuration
│   ├── domain/           # Business logic
│   │   ├── entities/
│   │   └── services/
│   ├── application/      # Use cases
│   ├── infrastructure/   # External dependencies
│   │   ├── database/
│   │   ├── api/
│   │   └── cache/
│   └── presentation/     # HTTP/CLI layer
│       ├── routes/
│       └── controllers/
└── ...
```

## Core Files & Patterns

### 1. Entry Point (`src/index.ts`)

```typescript
// Main application entry point

import { logger } from './logger.js';
import { config } from './config.js';

async function main() {
  try {
    logger.info('Application starting...');
    
    // Your application logic here
    
    logger.info('Application ready');
  } catch (error) {
    logger.error({ error }, 'Application failed to start');
    process.exit(1);
  }
}

main();
```

### 2. Configuration (`src/config.ts`)

```typescript
// Configuration management with environment variables

import { config as loadEnv } from 'dotenv';

// Load .env file
loadEnv();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000'),
  
  // Add your config here
  api: {
    key: process.env.API_KEY,
    enabled: !!process.env.API_KEY,
  },
} as const;

// Validate required config
if (!config.api.key && config.env === 'production') {
  throw new Error('API_KEY is required in production');
}
```

### 3. Type Definitions (`src/types.ts`)

```typescript
// Shared type definitions

export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add your domain types here
```

### 4. Logger (`src/logger.ts`)

Using Pino (recommended):

```typescript
import pino from 'pino';
import { config } from './config.js';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

// Utility to mask sensitive data in logs
export function maskSecret(str: string | undefined, visibleChars = 4): string {
  if (!str) return '***';
  if (str.length <= visibleChars * 2) return '***';
  return `${str.slice(0, visibleChars)}...${str.slice(-visibleChars)}`;
}
```

### 5. Error Handling (`src/utils/errors.ts`)

```typescript
// Custom error classes for better error handling

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, cause);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}
```

## File Naming Conventions

### Recommended Patterns

1. **All lowercase with dashes**: `user-service.ts`, `api-client.ts`
2. **Descriptive names**: `calculate-total.ts` not `calc.ts`
3. **Grouped by feature**: `user-repository.ts`, `user-service.ts`, `user-types.ts`

### File Types

- **Types**: `types.ts` or `{feature}-types.ts`
- **Interfaces**: `i{name}.ts` (optional, can use types.ts)
- **Services**: `{feature}-service.ts`
- **Utils**: `{purpose}-utils.ts` or `{function}.ts`
- **Constants**: `constants.ts` or `{feature}-constants.ts`

## Development Workflow

### 1. Create Feature Module

```bash
# Create module directory
mkdir -p src/my-feature

# Create module files
touch src/my-feature/service.ts
touch src/my-feature/types.ts
touch src/my-feature/utils.ts
```

### 2. Write Types First

```typescript
// src/my-feature/types.ts
export interface MyFeatureInput {
  name: string;
  value: number;
}

export interface MyFeatureOutput {
  result: string;
  timestamp: Date;
}
```

### 3. Implement Logic

```typescript
// src/my-feature/service.ts
import type { MyFeatureInput, MyFeatureOutput } from './types.js';
import { logger } from '../logger.js';

export async function processFeature(input: MyFeatureInput): Promise<MyFeatureOutput> {
  logger.debug({ input }, 'Processing feature');
  
  // Your logic here
  
  return {
    result: `Processed: ${input.name}`,
    timestamp: new Date(),
  };
}
```

### 4. Export Module

```typescript
// src/my-feature/index.ts
export * from './types.js';
export * from './service.js';
```

## Testing Setup (Optional)

### With Vitest

```bash
npm install -D vitest @vitest/ui
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

## Documentation Structure

### Essential Docs

```
docs/
├── README.md              # Getting started
├── architecture.md        # System design
├── api.md                 # API documentation (if applicable)
├── deployment.md          # How to deploy
└── development.md         # Development guide
```

### README Template

```markdown
# Project Name

Brief description of what this project does.

## Quick Start

\`\`\`bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
\`\`\`

## Features

- Feature 1
- Feature 2

## Documentation

- [Architecture](./docs/architecture.md)
- [Development Guide](./docs/development.md)

## License

MIT
```

## Verification Checklist

After setup, verify:

- [ ] `npm install` completes without errors
- [ ] `npx tsc --noEmit` compiles without errors
- [ ] `npm run dev` runs successfully
- [ ] `.env` file created from `.env.example`
- [ ] All configuration files in place
- [ ] Git initialized and .gitignore working
- [ ] TypeScript strict mode enabled
- [ ] Prettier configured and working
- [ ] Project structure makes sense for your use case

## Common Patterns

### Environment-based Configuration

```typescript
// src/config/environments.ts
const environments = {
  development: {
    logLevel: 'debug',
    apiUrl: 'http://localhost:3000',
  },
  production: {
    logLevel: 'info',
    apiUrl: 'https://api.production.com',
  },
};

export const envConfig = environments[process.env.NODE_ENV || 'development'];
```

### Feature Flags

```typescript
// src/config/features.ts
export const features = {
  newFeature: process.env.ENABLE_NEW_FEATURE === 'true',
  betaAccess: process.env.BETA_ACCESS === 'true',
};
```

### Graceful Shutdown

```typescript
// src/index.ts
async function shutdown(signal: string) {
  logger.info(`Received ${signal}, shutting down gracefully`);
  
  // Close database connections, flush logs, etc.
  
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

## Tips & Best Practices

### 1. Project Organization

- Group by feature, not by type
- Keep related files close together
- Use index.ts to export public API
- Separate business logic from infrastructure

### 2. TypeScript

- Use `strict: true` always
- Define types before implementation
- Avoid `any`, use `unknown` if needed
- Use type guards for runtime checks

### 3. Configuration

- All config from environment variables
- Provide .env.example with all variables
- Validate required config at startup
- Use typed config objects

### 4. Error Handling

- Create custom error classes
- Always catch and log errors
- Don't swallow errors silently
- Provide context with errors

### 5. Logging

- Use structured logging (JSON)
- Log at appropriate levels
- Never log secrets or PII
- Include correlation IDs for tracing

### 6. Dependencies

- Keep dependencies minimal
- Pin versions in package.json
- Regularly update dependencies
- Review dependency licenses

## Next Steps

1. **Define your domain** - What types and entities?
2. **Choose architecture** - Simple, modular, or layered?
3. **Set up CI/CD** - GitHub Actions, GitLab CI, etc.
4. **Add testing** - Unit, integration, e2e
5. **Documentation** - Keep docs up to date
6. **Monitoring** - Add observability early

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**This is a living template** - adapt it to your project's needs!
