# Mock Services

## Rule

Mock services **must implement the same interface** as the real service.

## File Location

```
src/__mocks__/<Feature>.mock.ts      # Mock implementations
src/__mocks__/index.ts               # Shared mock data (owners, users, repos, etc.)
```

## Pattern

```typescript
// src/__mocks__/BackendAPI.mock.ts
import { BackendAPI } from "src/services/BackendAPI";
import * as dto from "@open-source-economy/api-types";
import { owner, repository, issue } from "src/__mocks__";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(_params: dto.GetIssueParams, _query: dto.GetIssueQuery): Promise<dto.FinancialIssue> {
    return {
      /* realistic mock data */
    };
  }

  async getAllFinancialIssues(_params: dto.GetIssuesParams, _query: dto.GetIssueQuery): Promise<dto.FinancialIssue[]> {
    return [];
  }
}
```

## Service Selection

Centralized in `src/services/getAPI.ts`:

```typescript
import { config } from "src/utils";
import { type BackendAPI, BackendAPIImpl } from "./BackendAPI";
import { BackendAPIMock } from "src/__mocks__/BackendAPI.mock";

export const backendAPI: BackendAPI = config.api.useMock ? new BackendAPIMock() : new BackendAPIImpl(api);
```

## Why Interface Matters

```typescript
// WRONG - uses `as` casts, hides type errors
export class BadMock {
  async getFinancialIssue() {
    return { issues: [] } as dto.FinancialIssue; // Hides type errors!
  }
}

// CORRECT - implements interface, TypeScript enforces return type
export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(_params: dto.GetIssueParams, _query: dto.GetIssueQuery): Promise<dto.FinancialIssue> {
    return {
      /* must match the actual shape */
    };
  }
}
```

When API types change, the interface-based mock fails at compile time.

## Shared Mock Data

Centralize reusable mock objects in `src/__mocks__/index.ts`:

```typescript
export const owner: dto.Owner = {
  /* ... */
};
export const user: dto.AuthenticatedUser = {
  /* ... */
};
export function repository(name?: string): dto.Repository {
  /* ... */
}
```

## Rules

| Do                                   | Don't                               |
| ------------------------------------ | ----------------------------------- |
| `implements` service interface       | Create separate mock types          |
| Use `_params` for unused args        | Omit required parameters            |
| Keep mock data realistic             | Use placeholder strings             |
| Use enum members for enums           | Use `as` casts for enums            |
| Centralize shared data in `index.ts` | Duplicate mock objects across files |

**Note:** `as` casts are acceptable for branded string types like `dto.ISODateTimeString` in mock data, since these have no enum to reference.
