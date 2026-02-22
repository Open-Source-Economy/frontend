# Hooks

## File Location

```
src/api/hooks/<feature>.hooks.ts
```

## Implementation Pattern

```typescript
import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackendAPI } from "src/services";

const PROJECT_QUERY_KEY = ["project"] as const;

const backendAPI = getBackendAPI();

export const projectHooks = {
  useProjectQuery(params: dto.GetProjectParams, query: dto.GetProjectQuery) {
    return useQuery<dto.GetProjectResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "project", params, query],
      queryFn: () => backendAPI.getProject(params, query),
      enabled: !!params.owner,
    });
  },

  useFundIssueMutation() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { params: dto.FundIssueParams; body: dto.FundIssueBody; query: dto.FundIssueQuery }>({
      mutationFn: ({ params, body, query }) => backendAPI.fundIssue(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      },
    });
  },
};
```

## Usage in Components

```typescript
import * as dto from "@open-source-economy/api-types";
import { projectHooks } from "src/api";

// Explicit type annotations for params and query
const params: dto.GetProjectParams = { owner, repo };
const query: dto.GetProjectQuery = {};

// Use the hook
const { data, isLoading, error } = projectHooks.useProjectQuery(params, query);

// Mutations
const fundIssue = projectHooks.useFundIssueMutation();

const fundParams: dto.FundIssueParams = { owner, repo, number };
const fundBody: dto.FundIssueBody = { amount };
const fundQuery: dto.FundIssueQuery = {};

await fundIssue.mutateAsync({ params: fundParams, body: fundBody, query: fundQuery });
```

## Error Handling

Use `ApiError` for typed error handling:

```typescript
import { ApiError } from "src/ultils/error/ApiError";

const { error } = projectHooks.useProjectQuery(params, query);
const apiError = error ? (error instanceof ApiError ? error : ApiError.from(error)) : null;
```

## Hook Feature Files

| File                  | Export            | Purpose                                          |
| --------------------- | ----------------- | ------------------------------------------------ |
| `project.hooks.ts`    | `projectHooks`    | Projects, issues, sponsors, plans, campaigns     |
| `auth.hooks.ts`       | `authHooks`       | Login, register, logout, invites, password reset |
| `onboarding.hooks.ts` | `onboardingHooks` | Developer onboarding profile                     |
| `admin.hooks.ts`      | `adminHooks`      | Admin operations, sync, invites                  |
| `stripe.hooks.ts`     | `stripeHooks`     | Checkout, portal sessions                        |

## Rules

- Use params/query/body objects for mutations
- Explicit type annotations for params and query using `* as dto`
- Import hooks from barrel `src/api`, not hook files directly
- Components use hooks only, never services directly
- Use `enabled` option to conditionally run queries
- Invalidate related query keys on mutation success
