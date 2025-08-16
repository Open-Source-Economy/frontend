import { CurrencyType, DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";

export interface AddRepositoryDto {
  githubOwnerId: number;
  githubOwnerLogin: string;
  githubRepositoryId: number;
  githubRepositoryName: string;
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  services?: AddRepositoryServiceDto[];
}

export interface AddRepositoryServiceDto {
  serviceId: string;
  hourlyRate: number;
  currency: CurrencyType;
  responseTimeHours?: number | null;
}

export interface AddRepositoryResponse {
  success: boolean;
  data: {
    projectItemId: string;
    repository: string;
  };
}

export interface GetRepositoriesResponse {
  success: boolean;
  data: RepositoryData[];
}

export interface RepositoryData {
  projectItemId: string;
  repository: string | null;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  services: any[]; // Services associated with this repository
}

export interface UpdateDeveloperRightsDto {
  mergeRights?: MergeRightsType[];
  roles?: DeveloperRoleType[];
}

export interface RemoveRepositoryResponse {
  success: boolean;
  message: string;
}
