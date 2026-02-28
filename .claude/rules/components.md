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

## Hook Response Naming

Rename `data` to a descriptive name matching what it contains. Access nested fields directly — never create redundant intermediate variables:

```typescript
// CORRECT — descriptive rename, access fields directly
const { data: projectData, isLoading } = projectHooks.useProjectQuery(params, query);
// use projectData?.project directly in JSX

// WRONG — redundant intermediate variable
const { data } = projectHooks.useProjectQuery(params, query);
const project: dto.Project | undefined = data?.project;

// WRONG — generic name
const { data: response } = projectHooks.useProjectQuery(params, query);
```

## State Initial Values

Never use `""` (empty string), nil UUIDs, or invented values as initial state. Use `null` or `undefined` to represent "no value yet":

```typescript
// CORRECT — null means "no value yet"
const [selectedId, setSelectedId] = React.useState<string | null>(null);

// WRONG — empty string pretends to be a valid string
const [selectedId, setSelectedId] = React.useState("");

// CORRECT — undefined for optional values
const [owner, setOwner] = React.useState<dto.Owner | undefined>(undefined);

// WRONG — fake object
const [owner, setOwner] = React.useState<dto.Owner>({} as dto.Owner);
```

Booleans and numbers with meaningful zero/false defaults are fine:

```typescript
const [copied, setCopied] = React.useState(false); // OK
const [count, setCount] = React.useState(0); // OK
```

**Exception:** Form `defaultValues` use empty strings for text fields (RHF convention) — this rule applies to component state, not form state.

## Error Handling Pattern

Use `ApiError` and `ServerErrorAlert` for consistent error display:

```typescript
import { ApiError } from "src/utils/error/ApiError";
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
- Rename `data` to a descriptive name — access nested fields directly
- Never create redundant intermediate variables to unwrap response fields
- Never use `""`, `{}`, or invented values as initial state — use `null`/`undefined`
- Use `ApiError.from()` to normalize unknown errors
- Use `ServerErrorAlert` for error display
- Use `LoadingState` for loading states
- Import types as `import * as dto from "@open-source-economy/api-types"`
