# Services

## File Location

```
src/services/<feature>.service.ts          # Interface + plain-object implementation
src/__mocks__/<feature>.service.mock.ts    # Mock implementation
```

Existing feature APIs (`AuthBackendAPI.ts`, `OnboardingBackendAPI.ts`, `AdminBackendAPI.ts`) keep their current naming.

## Interface Pattern

Each feature service has its own interface and implementation:

```typescript
import * as dto from "@open-source-economy/api-types";
import { api, handleError, projectPath } from "./apiClient";
import { config } from "src/utils";

export interface ProjectService {
  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse>;
  getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse>;
}

export const projectServiceImpl: ProjectService = {
  async getProject(params, _query) {
    return handleError(
      () => api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}`, { withCredentials: true }),
      "getProject"
    );
  },
  // ...
};
```

## Singleton Pattern

Mock / real selection happens once at module load time in `getAPI.ts`.
Consumers import the singleton directly — no factory calls needed.

```typescript
// src/services/getAPI.ts
import { config } from "src/utils";
import { type ProjectService, projectServiceImpl } from "./project.service";
import { projectServiceMock } from "src/__mocks__/project.service.mock";

export const projectService: ProjectService = config.api.useMock ? projectServiceMock : projectServiceImpl;
```

## Mock Services

Mock services implement the same interface as the real service, using a plain object:

```typescript
// src/__mocks__/project.service.mock.ts
import { ProjectService } from "src/services/project.service";

export const projectServiceMock: ProjectService = {
  async getProject(_params, _query) {
    return { project: { owner: mockOwner, repository: mockRepo } };
  },
  // ...
};
```

## Error Pattern

Services throw `ApiError`, not plain `Error`:

```typescript
import { ApiError } from "src/utils/error/ApiError";
import { StatusCodes } from "http-status-codes";

// In handleError wrapper (src/services/apiClient.ts)
throw new ApiError(status, statusText, message);

// For unimplemented features
throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
```

## Feature Services

| Service                | File                       | Methods                                                                                                                                                                            |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectService`       | `project.service.ts`       | getOwner, getRepository, getProject, getProjects, getProjectDetails, getProjectItemsWithDetails, getMaintainers, getProjectAccordion, getSponsors, getProjectServices, getCampaign |
| `fundingService`       | `funding.service.ts`       | getFinancialIssue, getAllFinancialIssues, getAvailableCredits, fundIssue, requestFunding                                                                                           |
| `stripeService`        | `stripe.service.ts`        | getPlans, getUserPlan, checkout, setUserPreferredCurrency, createPortalSession                                                                                                     |
| `communicationService` | `communication.service.ts` | subscribeToNewsletter, submitContactForm                                                                                                                                           |

## Rules

- Use ALL endpoint types from `@open-source-economy/api-types` (even empty ones)
- Return full response types, not extracted data
- Throw `ApiError` for errors, never plain `Error`
- Always implement both real and mock services
- Mock implements the same interface as real service
- Use `handleError` wrapper for axios calls
- Import `api` and `handleError` from `./apiClient`, not from the barrel
- Singletons in `getAPI.ts` select real/mock based on `config.api.useMock`
- Services are consumed by hooks, not components directly
- Use plain objects, not classes, for new service implementations
