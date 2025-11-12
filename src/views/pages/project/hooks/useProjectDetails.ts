import { useCallback, useEffect, useMemo, useState } from "react";

import { getBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils/handleApiCall";
import type { ApiError } from "src/ultils/error/ApiError";
import type * as dto from "@open-source-economy/api-types";
import type { ProjectDeveloperProfile } from "@open-source-economy/api-types";
import type { ProjectServiceOffering } from "../components/ServiceCategoryCard";

export interface UseProjectDetailsResult {
  developers: ProjectDeveloperProfile[];
  projectDetails: dto.ProjectItemDetails | null;
  services: dto.Service[];
  serviceOfferings: Record<string, ProjectServiceOffering[]>;
  isLoading: boolean;
  apiError: ApiError | null;
  refetch: () => Promise<void>;
}

export function useProjectDetails(owner?: string, repo?: string): UseProjectDetailsResult {
  const backendAPI = useMemo(() => getBackendAPI(), []);

  const [developers, setDevelopers] = useState<ProjectDeveloperProfile[]>([]);
  const [projectDetails, setProjectDetails] = useState<dto.ProjectItemDetails | null>(null);
  const [services, setServices] = useState<dto.Service[]>([]);
  const [serviceOfferings, setServiceOfferings] = useState<Record<string, ProjectServiceOffering[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const fetchProjectDetails = useCallback(async () => {
    if (!owner) {
      return;
    }

    const apiCall = () => backendAPI.getProjectDetails({ owner, repo }, {});

    const onSuccess = (response: dto.GetProjectDetailsResponse) => {
      const developerProfiles = Object.values(response.developers ?? {});
      setDevelopers(developerProfiles);
      setProjectDetails(response.project);
      setServices(response.service ?? []);
      setServiceOfferings((response.serviceOfferings ?? {}) as Record<string, ProjectServiceOffering[]>);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  }, [backendAPI, owner, repo]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  return {
    developers,
    projectDetails,
    services,
    serviceOfferings,
    isLoading,
    apiError,
    refetch: fetchProjectDetails,
  };
}
