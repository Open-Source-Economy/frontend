import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOnboardingBackendAPI } from "src/services";

const ONBOARDING_QUERY_KEY = ["onboarding"] as const;

const onboardingAPI = getOnboardingBackendAPI();

export const onboardingHooks = {
  useDeveloperProfileQuery(params: dto.GetDeveloperProfileParams, query: dto.GetDeveloperProfileQuery, enabled = true) {
    return useQuery<dto.GetDeveloperProfileResponse>({
      queryKey: [...ONBOARDING_QUERY_KEY, "profile", params, query],
      queryFn: () => onboardingAPI.getDeveloperProfile(params, query),
      enabled,
    });
  },

  useCreateDeveloperProfileMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.CreateProfileResponse,
      Error,
      {
        params: dto.CreateProfileParams;
        body: dto.CreateProfileBody;
        query: dto.CreateProfileQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.createDeveloperProfile(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useUpdateDeveloperContactInfosMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.UpdateContactInfosResponse,
      Error,
      {
        params: dto.UpdateContactInfosParams;
        body: dto.UpdateContactInfosBody;
        query: dto.UpdateContactInfosQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.updateDeveloperContactInfos(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useSetDeveloperPreferencesMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.SetDeveloperPreferencesResponse,
      Error,
      {
        params: dto.SetDeveloperPreferencesParams;
        body: dto.SetDeveloperPreferencesBody;
        query: dto.SetDeveloperPreferencesQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.setDeveloperPreferences(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useSetDeveloperServiceSettingsMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.SetDeveloperServiceSettingsResponse,
      Error,
      {
        params: dto.SetDeveloperServiceSettingsParams;
        body: dto.SetDeveloperServiceSettingsBody;
        query: dto.SetDeveloperServiceSettingsQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.setDeveloperServiceSettings(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useUpsertProjectItemMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.UpsertDeveloperProjectItemResponse,
      Error,
      {
        params: dto.UpsertDeveloperProjectItemParams;
        body: dto.UpsertDeveloperProjectItemBody;
        query: dto.UpsertDeveloperProjectItemQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.upsertProjectItem(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useRemoveProjectItemMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      void,
      Error,
      {
        params: dto.RemoveDeveloperProjectItemParams;
        query: dto.RemoveDeveloperProjectItemQuery;
      }
    >({
      mutationFn: ({ params, query }) => onboardingAPI.removeProjectItem(params, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  usePotentialProjectItemsQuery(params: dto.GetPotentialProjectItemsParams, query: dto.GetPotentialProjectItemsQuery) {
    return useQuery<dto.GetPotentialProjectItemsResponse>({
      queryKey: [...ONBOARDING_QUERY_KEY, "potentialProjectItems", params, query],
      queryFn: () => onboardingAPI.getPotentialProjectItems(params, query),
    });
  },

  useServiceHierarchyQuery(params: dto.GetServiceHierarchyParams, query: dto.GetServiceHierarchyQuery) {
    return useQuery<dto.GetServiceHierarchyResponse>({
      queryKey: [...ONBOARDING_QUERY_KEY, "serviceHierarchy", params, query],
      queryFn: () => onboardingAPI.getServiceHierarchy(params, query),
    });
  },

  useUpsertDeveloperServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.UpsertDeveloperServiceResponse,
      Error,
      {
        params: dto.UpsertDeveloperServiceParams;
        body: dto.UpsertDeveloperServiceBody;
        query: dto.UpsertDeveloperServiceQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.upsertDeveloperService(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useUpsertDeveloperServicesMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.UpsertDeveloperServicesResponse,
      Error,
      {
        params: dto.UpsertDeveloperServicesParams;
        body: dto.UpsertDeveloperServicesBody;
        query: dto.UpsertDeveloperServicesQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.upsertDeveloperServices(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useDeleteDeveloperServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      void,
      Error,
      {
        params: dto.DeleteDeveloperServiceParams;
        query: dto.DeleteDeveloperServiceQuery;
      }
    >({
      mutationFn: ({ params, query }) => onboardingAPI.deleteDeveloperService(params, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useCreateCustomServiceMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.CreateCustomServiceResponse,
      Error,
      { params: dto.CreateCustomServiceParams; body: dto.CreateCustomServiceBody; query: dto.CreateCustomServiceQuery }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.createCustomService(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },

  useCompleteOnboardingMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.CompleteOnboardingResponse,
      Error,
      { params: dto.CompleteOnboardingParams; body: dto.CompleteOnboardingBody; query: dto.CompleteOnboardingQuery }
    >({
      mutationFn: ({ params, body, query }) => onboardingAPI.completeOnboarding(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      },
    });
  },
};
