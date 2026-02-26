import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBackendAPI,
  CreateAddressBody,
  CreateAddressQuery,
  CreateAddressResponse,
  CreateCompanyBody,
  CreateCompanyQuery,
  CreateCompanyResponse,
  SendCompanyRoleInviteParams,
  SendCompanyRoleInviteBody,
  SendCompanyRoleInviteQuery,
  SendCompanyRoleInviteResponse,
  SendRepositoryRoleInviteParams,
  SendRepositoryRoleInviteBody,
  SendRepositoryRoleInviteQuery,
  SendRepositoryRoleInviteResponse,
  CreateCampaignProductAndPriceParams,
  CreateCampaignProductAndPriceBody,
  CreateCampaignProductAndPriceQuery,
  CreateCampaignProductAndPriceResponse,
  CreateManualInvoiceBody,
  CreateManualInvoiceQuery,
  CreateManualInvoiceResponse,
  CreatePlanProductAndPriceParams,
  CreatePlanProductAndPriceBody,
  CreatePlanProductAndPriceQuery,
  CreatePlanProductAndPriceResponse,
  CreateProjectParams,
  CreateProjectBody,
  CreateProjectQuery,
  CreateProjectResponse,
} from "src/services";

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
    return useMutation<CreateAddressResponse, Error, { body: CreateAddressBody; query: CreateAddressQuery }>({
      mutationFn: ({ body, query }) => adminAPI.createAddress(body, query),
    });
  },

  useCreateCompanyMutation() {
    return useMutation<CreateCompanyResponse, Error, { body: CreateCompanyBody; query: CreateCompanyQuery }>({
      mutationFn: ({ body, query }) => adminAPI.createCompany(body, query),
    });
  },

  useSendCompanyRoleInviteMutation() {
    return useMutation<
      SendCompanyRoleInviteResponse,
      Error,
      {
        params: SendCompanyRoleInviteParams;
        body: SendCompanyRoleInviteBody;
        query: SendCompanyRoleInviteQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.sendCompanyRoleInvite(params, body, query),
    });
  },

  useSendRepositoryRoleInviteMutation() {
    return useMutation<
      SendRepositoryRoleInviteResponse,
      Error,
      {
        params: SendRepositoryRoleInviteParams;
        body: SendRepositoryRoleInviteBody;
        query: SendRepositoryRoleInviteQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.sendRepositoryRoleInvite(params, body, query),
    });
  },

  useCreateCampaignProductAndPriceMutation() {
    return useMutation<
      CreateCampaignProductAndPriceResponse,
      Error,
      {
        params: CreateCampaignProductAndPriceParams;
        body: CreateCampaignProductAndPriceBody;
        query: CreateCampaignProductAndPriceQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createCampaignProductAndPrice(params, body, query),
    });
  },

  useCreateManualInvoiceMutation() {
    return useMutation<
      CreateManualInvoiceResponse,
      Error,
      { body: CreateManualInvoiceBody; query: CreateManualInvoiceQuery }
    >({
      mutationFn: ({ body, query }) => adminAPI.createManualInvoice(body, query),
    });
  },

  useCreatePlanProductAndPriceMutation() {
    return useMutation<
      CreatePlanProductAndPriceResponse,
      Error,
      {
        params: CreatePlanProductAndPriceParams;
        body: CreatePlanProductAndPriceBody;
        query: CreatePlanProductAndPriceQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createPlanProductAndPrice(params, body, query),
    });
  },

  useCreateProjectMutation() {
    return useMutation<
      CreateProjectResponse,
      Error,
      { params: CreateProjectParams; body: CreateProjectBody; query: CreateProjectQuery }
    >({
      mutationFn: ({ params, body, query }) => adminAPI.createProject(params, body, query),
    });
  },
};
