import * as dto from "@open-source-economy/api-types";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "src/services";
import { SponsorDescription } from "src/model";
import {
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
  GetProjectAccordionParams,
  GetProjectAccordionQuery,
  GetProjectAccordionResponse,
  GetSponsorsParams,
  GetSponsorsQuery,
} from "src/utils/local-types";

const PROJECT_QUERY_KEY = ["project"] as const;

export const projectHooks = {
  useOwnerQuery(params: dto.GetOwnerParams, query: dto.GetOwnerQuery) {
    return useQuery<dto.GetOwnerResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "owner", params, query],
      queryFn: () => projectService.getOwner(params, query),
      enabled: !!params.owner,
    });
  },

  useRepositoryQuery(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery) {
    return useQuery<dto.GetRepositoryResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "repository", params, query],
      queryFn: () => projectService.getRepository(params, query),
      enabled: !!params.owner && !!params.repo,
    });
  },

  useProjectQuery(params: dto.GetProjectParams, query: dto.GetProjectQuery) {
    return useQuery<dto.GetProjectResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "project", params, query],
      queryFn: () => projectService.getProject(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectsQuery(params: dto.GetProjectsParams, query: dto.GetProjectsQuery) {
    return useQuery<dto.GetProjectsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "projects", params, query],
      queryFn: () => projectService.getProjects(params, query),
    });
  },

  useProjectDetailsQuery(params: dto.GetProjectDetailsParams, query: dto.GetProjectDetailsQuery) {
    return useQuery<dto.GetProjectDetailsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "details", params, query],
      queryFn: () => projectService.getProjectDetails(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectItemsWithDetailsQuery(
    params: dto.GetProjectItemsWithDetailsParams,
    query: dto.GetProjectItemsWithDetailsQuery
  ) {
    return useQuery<dto.GetProjectItemsWithDetailsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "itemsWithDetails", params, query],
      queryFn: () => projectService.getProjectItemsWithDetails(params, query),
    });
  },

  useMaintainersQuery(params: GetMaintainersParams, query: GetMaintainersQuery) {
    return useQuery<GetMaintainersResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "maintainers", params, query],
      queryFn: () => projectService.getMaintainers(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectAccordionQuery(params: GetProjectAccordionParams, query: GetProjectAccordionQuery) {
    return useQuery<GetProjectAccordionResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "accordion", params, query],
      queryFn: () => projectService.getProjectAccordion(params, query),
      enabled: !!params.owner,
    });
  },

  useSponsorsQuery(params: GetSponsorsParams, query: GetSponsorsQuery) {
    return useQuery<SponsorDescription[]>({
      queryKey: [...PROJECT_QUERY_KEY, "sponsors", params, query],
      queryFn: () => projectService.getSponsors(params, query),
      enabled: !!params.owner,
    });
  },

  useCampaignQuery(params: dto.GetCampaignParams, query: dto.GetCampaignQuery) {
    return useQuery<dto.GetCampaignResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "campaign", params, query],
      queryFn: () => projectService.getCampaign(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectServicesQuery(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery) {
    return useQuery<dto.GetProjectServicesResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "services", params, query],
      queryFn: () => projectService.getProjectServices(params, query),
      enabled: !!params.owner,
    });
  },
};
