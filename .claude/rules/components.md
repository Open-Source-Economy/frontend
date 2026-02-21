# Components

## Data Flow

```
Components -> hooks -> services -> axios
```

- Components only use hooks from `src/api`
- Never import services directly in components
- Never import axios in components

## Type Annotations

Always use explicit types for params and query with `import * as dto`:

```typescript
import * as dto from "@open-source-economy/api-types";
import { projectHooks } from "src/api";

const params: dto.GetProjectParams = { owner, repo };
const query: dto.GetProjectQuery = {};

const { data, isLoading, error } = projectHooks.useProjectQuery(params, query);
```

## Error Handling Pattern

Use `ApiError` and `ServerErrorAlert` for consistent error display:

```typescript
import { ApiError } from "src/ultils/error/ApiError";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

const { error } = projectHooks.useProjectQuery(params, query);
const apiError = error ? (error instanceof ApiError ? error : ApiError.from(error)) : null;

// In JSX
{apiError && <ServerErrorAlert error={apiError} />}
```

## Loading State Pattern

```typescript
import { LoadingState } from "src/views/components/ui/state/loading-state";

if (isLoading) {
  return <LoadingState message="Loading project..." variant="spinner" size="lg" />;
}
```

## Mutation Pattern in Components

```typescript
const createMutation = onboardingHooks.useCreateProfileMutation();

const handleSubmit = async () => {
  try {
    await createMutation.mutateAsync({ params, body, query });
    // success handling
  } catch {
    // error tracked by createMutation.error
  }
};

// Use mutation state for UI
<Button loading={createMutation.isPending}>Save</Button>
```

## Rules

- Components only use hooks, never services directly
- Explicit type annotations for params and query
- Use `ApiError.from()` to normalize unknown errors
- Use `ServerErrorAlert` for error display
- Use `LoadingState` for loading states
- Never create redundant intermediate variables to unwrap response fields
- Import types as `import * as dto from "@open-source-economy/api-types"`
