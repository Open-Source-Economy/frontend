import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminBackendAPI } from "src/services";

const ADMIN_QUERY_KEY = ["admin"] as const;

const adminAPI = getAdminBackendAPI();

export const adminHooks = {
  useAllDeveloperProfilesQuery(params: dto.GetAllDeveloperProfilesParams, query: dto.GetAllDeveloperProfilesQuery) {
    return useQuery<dto.GetAllDeveloperProfilesResponse>({
      queryKey: [...ADMIN_QUERY_KEY, "allDeveloperProfiles", params, query],
      queryFn: () => adminAPI.getAllDeveloperProfiles(params, query),
    });
  },

  useDeveloperProfileQuery(params: { githubUsername: string }, query: dto.GetDeveloperProfileQuery, enabled = true) {
    return useQuery<dto.GetDeveloperProfileResponse>({
      queryKey: [...ADMIN_QUERY_KEY, "developerProfile", params, query],
      queryFn: () => adminAPI.getDeveloperProfile(params, query),
      enabled: enabled && !!params.githubUsername,
    });
  },

  useCreateVerificationRecordMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.CreateVerificationRecordResponse,
      Error,
      {
        params: dto.CreateVerificationRecordParams;
        body: dto.CreateVerificationRecordBody;
        query: dto.CreateVerificationRecordQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createVerificationRecord(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
      },
    });
  },

  useSyncOrganizationRepositoriesMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.SyncOrganizationRepositoriesResponse,
      Error,
      { params: dto.SyncOrganizationRepositoriesParams; query: dto.SyncOrganizationRepositoriesQuery }
    >({
      mutationFn: ({ params, query }) => adminAPI.syncOrganizationRepositories(params, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
      },
    });
  },

  useSyncOwnerMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.SyncOwnerResponse, Error, { params: dto.SyncOwnerParams; query: dto.SyncOwnerQuery }>({
      mutationFn: ({ params, query }) => adminAPI.syncOwner(params, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
      },
    });
  },

  useSyncRepositoryMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.SyncRepositoryResponse,
      Error,
      { params: dto.SyncRepositoryParams; body: dto.SyncRepositoryBody; query: dto.SyncRepositoryQuery }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.syncRepository(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
      },
    });
  },

  useSyncProjectMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.SyncProjectResponse, Error, { params: dto.SyncProjectParams; query: dto.SyncProjectQuery }>({
      mutationFn: ({ params, query }) => adminAPI.syncProject(params, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
      },
    });
  },

  useCreateAddressMutation() {
    return useMutation<
      dto.CreateAddressResponse,
      Error,
      { body: dto.CreateAddressBody; query: dto.CreateAddressQuery }
    >({
      mutationFn: ({ body, query }) => adminAPI.createAddress(body, query),
    });
  },

  useCreateCompanyMutation() {
    return useMutation<
      dto.CreateCompanyResponse,
      Error,
      { body: dto.CreateCompanyBody; query: dto.CreateCompanyQuery }
    >({
      mutationFn: ({ body, query }) => adminAPI.createCompany(body, query),
    });
  },

  useSendCompanyRoleInviteMutation() {
    return useMutation<
      dto.SendCompanyRoleInviteResponse,
      Error,
      {
        params: dto.SendCompanyRoleInviteParams;
        body: dto.SendCompanyRoleInviteBody;
        query: dto.SendCompanyRoleInviteQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.sendCompanyRoleInvite(params, body, query),
    });
  },

  useSendRepositoryRoleInviteMutation() {
    return useMutation<
      dto.SendRepositoryRoleInviteResponse,
      Error,
      {
        params: dto.SendRepositoryRoleInviteParams;
        body: dto.SendRepositoryRoleInviteBody;
        query: dto.SendRepositoryRoleInviteQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.sendRepositoryRoleInvite(params, body, query),
    });
  },

  useCreateCampaignProductAndPriceMutation() {
    return useMutation<
      dto.CreateCampaignProductAndPriceResponse,
      Error,
      {
        params: dto.CreateCampaignProductAndPriceParams;
        body: dto.CreateCampaignProductAndPriceBody;
        query: dto.CreateCampaignProductAndPriceQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createCampaignProductAndPrice(params, body, query),
    });
  },

  useCreateManualInvoiceMutation() {
    return useMutation<
      dto.CreateManualInvoiceResponse,
      Error,
      { body: dto.CreateManualInvoiceBody; query: dto.CreateManualInvoiceQuery }
    >({
      mutationFn: ({ body, query }) => adminAPI.createManualInvoice(body, query),
    });
  },

  useCreatePlanProductAndPriceMutation() {
    return useMutation<
      dto.CreatePlanProductAndPriceResponse,
      Error,
      {
        params: dto.CreatePlanProductAndPriceParams;
        body: dto.CreatePlanProductAndPriceBody;
        query: dto.CreatePlanProductAndPriceQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createPlanProductAndPrice(params, body, query),
    });
  },

  useCreateProjectMutation() {
    return useMutation<
      dto.CreateProjectResponse,
      Error,
      { params: dto.CreateProjectParams; body: dto.CreateProjectBody; query: dto.CreateProjectQuery }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createProject(params, body, query),
    });
  },
};
