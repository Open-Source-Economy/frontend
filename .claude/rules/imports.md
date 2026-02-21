# Imports

## API Types

```typescript
// CORRECT - namespace import (types AND enums)
import * as dto from "@open-source-economy/api-types";

// WRONG - type-only (can't use enum values at runtime)
import type * as dto from "@open-source-economy/api-types";

// WRONG - named imports
import { GetProjectResponse, PreferenceType } from "@open-source-economy/api-types";
```

### Why `* as dto` and not `type * as dto`?

Enums are runtime values, not just types. If you use `import type * as dto`, TypeScript strips the import at compile time, and any reference to an enum like `dto.PreferenceType.YES` will fail at runtime.

`* as dto` keeps both the types and the runtime enum values available.

## Internal Imports

```typescript
// CORRECT - absolute with src/ prefix
import { projectHooks } from "src/api";
import { config } from "src/ultils";
import { useZodForm } from "src/views/components/ui/forms/rhf";

// WRONG - relative imports
import { projectHooks } from "../../api";
```

## Common Import Blocks

### Component

```typescript
import * as dto from "@open-source-economy/api-types";
import { projectHooks } from "src/api";
```

### Form Component

```typescript
import * as dto from "@open-source-economy/api-types";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { Form, RhfFormInput } from "src/views/components/ui/forms/rhf";
import { myFormSchema } from "src/views/components/ui/forms/schemas";
```

### Service

```typescript
import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "src/services";
```

### Hooks

```typescript
import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackendAPI } from "src/services";
```

## Config

```typescript
// CORRECT
import { config } from "src/ultils";

const apiUrl = config.api.url;

// WRONG - direct env access
const apiUrl = import.meta.env.VITE_API_URL;
```

## Rules

- Use `* as dto` not `type * as dto` — enums need runtime access
- Use absolute imports with `src/` prefix
- Import hooks from barrel `src/api`, not hook files directly
- Import config from `src/ultils`, never `import.meta.env`
