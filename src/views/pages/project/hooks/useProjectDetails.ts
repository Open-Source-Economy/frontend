import { projectHooks } from "src/api";
import { ApiError } from "src/utils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import type { ProjectServiceOffering } from "src/views/pages/project/components/ServiceCategoryCard";

export interface UseProjectDetailsResult {
  developers: dto.ProjectDeveloperProfile[];
  projectDetails: dto.ProjectItemDetails | null;
  services: dto.Service[];
  serviceOfferings: Record<string, ProjectServiceOffering[]>;
  isLoading: boolean;
  apiError: ApiError | null;
  refetch: () => void;
}

export function useProjectDetails(owner?: string, repo?: string): UseProjectDetailsResult {
  const { data, isLoading, error, refetch } = projectHooks.useProjectDetailsQuery({ owner: owner ?? "", repo }, {});

  const developers = data ? Object.values(data.developers ?? {}) : [];
  const projectDetails = data?.project ?? null;
  const services = data?.service ?? [];
  const serviceOfferings = (data?.serviceOfferings ?? {}) as Record<string, ProjectServiceOffering[]>;
  const apiError = error ? (error instanceof ApiError ? error : ApiError.from(error)) : null;

  return { developers, projectDetails, services, serviceOfferings, isLoading, apiError, refetch };
}
