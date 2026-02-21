import * as dto from "@open-source-economy/api-types";
import { FinancialIssue } from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackendAPI } from "src/services";
import { SponsorDescription } from "src/model";

const PROJECT_QUERY_KEY = ["project"] as const;

const backendAPI = getBackendAPI();

export const projectHooks = {
  useFinancialIssueQuery(params: dto.GetIssueParams, query: dto.GetIssueQuery) {
    return useQuery<FinancialIssue>({
      queryKey: [...PROJECT_QUERY_KEY, "financialIssue", params, query],
      queryFn: () => backendAPI.getFinancialIssue(params, query),
      enabled: !!params.owner && !!params.repo && !!params.number,
    });
  },

  useAllFinancialIssuesQuery(params: dto.GetIssuesParams, query: dto.GetIssueQuery) {
    return useQuery<FinancialIssue[]>({
      queryKey: [...PROJECT_QUERY_KEY, "allFinancialIssues", params, query],
      queryFn: () => backendAPI.getAllFinancialIssues(params, query),
    });
  },

  useAvailableCreditsQuery(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery) {
    return useQuery<dto.GetAvailableCreditsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "availableCredits", params, query],
      queryFn: () => backendAPI.getAvailableCredits(params, query),
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

  useRequestFundingMutation() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, { params: dto.RequestIssueFundingParams; body: dto.RequestIssueFundingBody; query: dto.RequestIssueFundingQuery }>({
      mutationFn: ({ params, body, query }) => backendAPI.requestFunding(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEY });
      },
    });
  },

  useOwnerQuery(params: dto.GetOwnerParams, query: dto.GetOwnerQuery) {
    return useQuery<dto.GetOwnerResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "owner", params, query],
      queryFn: () => backendAPI.getOwner(params, query),
      enabled: !!params.owner,
    });
  },

  useRepositoryQuery(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery) {
    return useQuery<dto.GetRepositoryResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "repository", params, query],
      queryFn: () => backendAPI.getRepository(params, query),
      enabled: !!params.owner && !!params.repo,
    });
  },

  useProjectQuery(params: dto.GetProjectParams, query: dto.GetProjectQuery) {
    return useQuery<dto.GetProjectResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "project", params, query],
      queryFn: () => backendAPI.getProject(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectsQuery(params: dto.GetProjectsParams, query: dto.GetProjectsQuery) {
    return useQuery<dto.GetProjectsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "projects", params, query],
      queryFn: () => backendAPI.getProjects(params, query),
    });
  },

  useProjectDetailsQuery(params: dto.GetProjectDetailsParams, query: dto.GetProjectDetailsQuery) {
    return useQuery<dto.GetProjectDetailsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "details", params, query],
      queryFn: () => backendAPI.getProjectDetails(params, query),
      enabled: !!params.owner,
    });
  },

  useMaintainersQuery(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery) {
    return useQuery<dto.GetMaintainersResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "maintainers", params, query],
      queryFn: () => backendAPI.getMaintainers(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectAccordionQuery(params: dto.GetProjectAccordionParams, query: dto.GetProjectAccordionQuery) {
    return useQuery<dto.GetProjectAccordionResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "accordion", params, query],
      queryFn: () => backendAPI.getProjectAccordion(params, query),
      enabled: !!params.owner,
    });
  },

  useSponsorsQuery(params: dto.GetSponsorsParams, query: dto.GetSponsorsQuery) {
    return useQuery<SponsorDescription[]>({
      queryKey: [...PROJECT_QUERY_KEY, "sponsors", params, query],
      queryFn: () => backendAPI.getSponsors(params, query),
      enabled: !!params.owner,
    });
  },

  usePlansQuery(params: dto.GetPlansParams, query: dto.GetPlansQuery) {
    return useQuery<dto.GetPlansResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "plans", params, query],
      queryFn: () => backendAPI.getPlans(params, query),
    });
  },

  useUserPlanQuery(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery) {
    return useQuery<dto.GetUserPlanResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "userPlan", params, query],
      queryFn: () => backendAPI.getUserPlan(params, query),
    });
  },

  useCampaignQuery(params: dto.GetCampaignParams, query: dto.GetCampaignQuery) {
    return useQuery<dto.GetCampaignResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "campaign", params, query],
      queryFn: () => backendAPI.getCampaign(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectServicesQuery(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery) {
    return useQuery<dto.GetProjectServicesResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "services", params, query],
      queryFn: () => backendAPI.getProjectServices(params, query),
      enabled: !!params.owner,
    });
  },

  useProjectItemsWithDetailsQuery(params: dto.GetProjectItemsWithDetailsParams, query: dto.GetProjectItemsWithDetailsQuery) {
    return useQuery<dto.GetProjectItemsWithDetailsResponse>({
      queryKey: [...PROJECT_QUERY_KEY, "itemsWithDetails", params, query],
      queryFn: () => backendAPI.getProjectItemsWithDetails(params, query),
    });
  },
};
