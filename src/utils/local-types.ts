/**
 * Types that were removed from @open-source-economy/api-types but are still used in the frontend.
 * These should be replaced with proper api-types exports when available.
 */

// CardSize was an enum/type used for sponsor card sizing
export type CardSize = "small" | "large" | "xlarge";

// Maintainer was used for hardcoded maintainer data displayed on project pages
export interface Maintainer {
  displayName: string;
  githubUsername: string;
  githubAvatar: string;
  githubPage: string;
  title: string;
  quote: string | undefined;
  mascot: string;
  mascotAlt: string;
}

// GetMaintainers endpoint types - removed from api-types, used for local data only
export interface GetMaintainersParams {
  owner: string;
  repo?: string;
}
export type GetMaintainersQuery = Record<string, never>;
export interface GetMaintainersResponse {
  maintainers: Maintainer[];
}

// GetProjectAccordion endpoint types - removed from api-types, used for local data only
export interface GetProjectAccordionParams {
  owner: string;
  repo?: string;
}
export type GetProjectAccordionQuery = Record<string, never>;
export interface GetProjectAccordionResponse {
  title: string;
  items: Array<{
    title: string;
    content: string;
  }>;
  buyServicesButton: boolean;
  donationButton: boolean;
}

// GetSponsors endpoint types - removed from api-types, used for local data only
export interface GetSponsorsParams {
  owner: string;
  repo?: string;
}
export type GetSponsorsQuery = Record<string, never>;

// GetIssues (plural) was renamed to GetAllFinancialIssues
// These aliases are for backward compatibility
export type GetIssuesParams = Record<string, never>;
export type GetIssuesResponse = { issues: import("@open-source-economy/api-types").FinancialIssue[] };

// SourceIdentifier was removed - define locally based on old usage
import * as dto from "@open-source-economy/api-types";
export type SourceIdentifier = string | dto.OwnerId | dto.RepositoryId;

// ProjectId was removed from api-types - it was OwnerId | RepositoryId
export type ProjectId = dto.OwnerId | dto.RepositoryId;

/**
 * Type guard to check if a ProjectId is a RepositoryId (has ownerId and name).
 * Since OwnerId is a branded string and RepositoryId is an object, we check typeof.
 */
export function isRepositoryId(projectId: ProjectId): projectId is dto.RepositoryId {
  return typeof projectId === "object" && projectId !== null && "ownerId" in projectId && "name" in projectId;
}

/**
 * Type guard to check if a ProjectId is an OwnerId (object with login but no name).
 */
export function isOwnerId(projectId: ProjectId): projectId is dto.OwnerId {
  return typeof projectId === "object" && projectId !== null && "login" in projectId && !("name" in projectId);
}

/**
 * Extract the owner string from a ProjectId.
 */
export function getOwnerFromProjectId(projectId: ProjectId): string {
  return isRepositoryId(projectId) ? projectId.ownerId.login : projectId.login;
}

/**
 * Extract the repo name from a ProjectId, if it's a RepositoryId.
 */
export function getRepoFromProjectId(projectId: ProjectId): string | undefined {
  return isRepositoryId(projectId) ? projectId.name : undefined;
}

/**
 * Credit amounts (in minutes) per ProductType.
 * Previously provided by productTypeUtils.credits() in api-types.
 */
export function productTypeCredits(productType: dto.ProductType): number {
  switch (productType) {
    case dto.ProductType.CREDIT:
      return 1;
    case dto.ProductType.INDIVIDUAL_PLAN:
      return 30;
    case dto.ProductType.START_UP_PLAN:
      return 2 * 60;
    case dto.ProductType.SCALE_UP_PLAN:
      return 4 * 60;
    case dto.ProductType.ENTERPRISE_PLAN:
      return 10 * 60;
    default:
      return 0;
  }
}
