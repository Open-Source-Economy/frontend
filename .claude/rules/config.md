# Configuration

## Rule

**Never use `import.meta.env` directly in application code.**

## Correct Pattern

```typescript
import { config } from "src/utils";

// API settings
config.api.url;

// Feature flags
import { features } from "src/utils/featureVisibility";
features.devControls; // checks current environment
```

## Where `import.meta.env` Is Allowed

Only in config files:

| File                             | Purpose                         |
| -------------------------------- | ------------------------------- |
| `src/utils/config.ts`            | Loads and validates config      |
| `src/utils/featureVisibility.ts` | Environment-based feature flags |

## Wrong Pattern

```typescript
// WRONG - scattered throughout codebase
const isDev = import.meta.env.DEV;
const apiUrl = import.meta.env.VITE_API_URL;
```

## Why

- Single source of truth
- Easy to mock in tests
- All options documented in one place

## Rules

- Import `config` from `src/utils`
- Never use `import.meta.env` outside config files
- All new env vars must be added to config
