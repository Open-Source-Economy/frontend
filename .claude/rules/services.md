# Services

## File Location

```
src/services/<Feature>BackendAPI.ts    # Interface + implementation
src/__mocks__/<Feature>BackendAPI.mock.ts  # Mock implementation
```

## Interface Pattern

```typescript
import * as dto from "@open-source-economy/api-types";

export interface BackendAPI {
  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse>;
  getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse>;
  fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void>;
}
```

## Implementation

Services use axios with the `handleError` wrapper for consistent error handling:

```typescript
import { api, handleError, projectPath } from "./index";
import { config } from "src/ultils";

class BackendAPIImpl implements BackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse> {
    return handleError(
      () =>
        this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}`, { withCredentials: true }),
      "getProject"
    );
  }
}
```

## Factory Pattern

```typescript
import { config } from "src/ultils";

export function getBackendAPI(): BackendAPI {
  if (config.api.useMock) {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl(api);
  }
}
```

## Mock Services

Mock services **must implement the same interface** as the real service:

```typescript
// src/__mocks__/BackendAPI.mock.ts
import { BackendAPI } from "src/services/BackendAPI";
import { ApiError } from "src/ultils/error/ApiError";

export class BackendAPIMock implements BackendAPI {
  async getProject(params, query) {
    return { project: mockProject, owner: mockOwner };
  }

  async fundIssue(params, body, query) {
    // no-op for mock
  }
}
```

## Error Pattern

Services throw `ApiError`, not plain `Error`:

```typescript
import { ApiError } from "src/ultils/error/ApiError";
import { StatusCodes } from "http-status-codes";

// In handleError wrapper (src/services/index.ts)
throw new ApiError(status, statusText, message);

// For unimplemented features
throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
```

## Rules

- Use ALL endpoint types from `@open-source-economy/api-types` (even empty ones)
- Return full response types, not extracted data
- Throw `ApiError` for errors, never plain `Error`
- Always implement both real and mock services
- Mock implements the same interface as real service
- Use `handleError` wrapper for axios calls
- Factory function selects real/mock based on `config.api.useMock`
- Services are consumed by hooks, not components directly
