import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "./index";
import { config } from "src/ultils";
import { OnboardingBackendAPIMock } from "src/__mocks__/OnboardingBackendAPI.mock";
import { AxiosInstance } from "axios";

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  if (config.api.useMock) {
    return new OnboardingBackendAPIMock();
  }
  return new OnboardingBackendAPIImpl(api);
}

export interface OnboardingBackendAPI {
  // Profile management
  createDeveloperProfile(
    params: dto.CreateProfileParams,
    body: dto.CreateProfileBody,
    query: dto.CreateProfileQuery
  ): Promise<dto.CreateProfileResponse>;

  // Renamed to match the specific action and backend route
  updateDeveloperContactInfos(
    params: dto.UpdateContactInfosParams,
    body: dto.UpdateContactInfosBody,
    query: dto.UpdateContactInfosQuery
  ): Promise<dto.UpdateContactInfosResponse>;

  getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse>;

  // Settings management
  setDeveloperPreferences(
    params: dto.SetDeveloperPreferencesParams,
    body: dto.SetDeveloperPreferencesBody,
    query: dto.SetDeveloperPreferencesQuery
  ): Promise<dto.SetDeveloperPreferencesResponse>;

  setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery
  ): Promise<dto.SetDeveloperServiceSettingsResponse>;

  // Project items management
  upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse>;

  removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    query: dto.RemoveDeveloperProjectItemQuery
  ): Promise<void>;

  getPotentialProjectItems(
    params: dto.GetPotentialProjectItemsParams,
    query: dto.GetPotentialProjectItemsQuery
  ): Promise<dto.GetPotentialProjectItemsResponse>;

  // Service management (Not developer services)
  getServiceHierarchy(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<dto.GetServiceHierarchyResponse>;

  upsertDeveloperService(
    params: dto.UpsertDeveloperServiceParams,
    body: dto.UpsertDeveloperServiceBody,
    query: dto.UpsertDeveloperServiceQuery
  ): Promise<dto.UpsertDeveloperServiceResponse>;

  upsertDeveloperServices(
    params: dto.UpsertDeveloperServicesParams,
    body: dto.UpsertDeveloperServicesBody,
    query: dto.UpsertDeveloperServicesQuery
  ): Promise<dto.UpsertDeveloperServicesResponse>;

  deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<void>;

  createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse>;

  // Onboarding completion
  completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createDeveloperProfile(
    params: dto.CreateProfileParams,
    body: dto.CreateProfileBody,
    query: dto.CreateProfileQuery
  ): Promise<dto.CreateProfileResponse> {
    return handleError<dto.CreateProfileResponse>(
      () => this.api.post(`${config.api.url}/onboarding/profile`, body, { withCredentials: true, params: query }),
      "createDeveloperProfile"
    );
  }

  async updateDeveloperContactInfos(
    params: dto.UpdateContactInfosParams,
    body: dto.UpdateContactInfosBody,
    query: dto.UpdateContactInfosQuery
  ): Promise<dto.UpdateContactInfosResponse> {
    return handleError<dto.UpdateContactInfosResponse>(
      () =>
        this.api.put(`${config.api.url}/onboarding/profile/contact-infos`, body, {
          withCredentials: true,
          params: query,
        }),
      "updateDeveloperContactInfos"
    );
  }

  async getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse> {
    return handleError<dto.GetDeveloperProfileResponse>(
      () => this.api.get(`${config.api.url}/onboarding/profile`, { withCredentials: true, params: query }),
      "getDeveloperProfile"
    );
  }

  async setDeveloperPreferences(
    params: dto.SetDeveloperPreferencesParams,
    body: dto.SetDeveloperPreferencesBody,
    query: dto.SetDeveloperPreferencesQuery
  ): Promise<dto.SetDeveloperPreferencesResponse> {
    return handleError<dto.SetDeveloperPreferencesResponse>(
      () =>
        this.api.put(`${config.api.url}/onboarding/settings/preferences`, body, {
          withCredentials: true,
          params: query,
        }),
      "setDeveloperPreferences"
    );
  }

  async setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery
  ): Promise<dto.SetDeveloperServiceSettingsResponse> {
    return handleError<dto.SetDeveloperServiceSettingsResponse>(
      () =>
        this.api.put(`${config.api.url}/onboarding/settings/services`, body, { withCredentials: true, params: query }),
      "setDeveloperServiceSettings"
    );
  }

  async upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse> {
    return handleError<dto.UpsertDeveloperProjectItemResponse>(
      () => this.api.post(`${config.api.url}/onboarding/projects`, body, { withCredentials: true, params: query }),
      "upsertProjectItem"
    );
  }

  async removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    query: dto.RemoveDeveloperProjectItemQuery
  ): Promise<void> {
    return handleError<void>(
      () =>
        this.api.delete(`${config.api.url}/onboarding/projects/${params.developerProjectItemId}`, {
          withCredentials: true,
          params: query,
        }),
      "removeProjectItem"
    );
  }

  async getPotentialProjectItems(
    params: dto.GetPotentialProjectItemsParams,
    query: dto.GetPotentialProjectItemsQuery
  ): Promise<dto.GetPotentialProjectItemsResponse> {
    return handleError<dto.GetPotentialProjectItemsResponse>(
      () => this.api.get(`${config.api.url}/onboarding/projects/potential`, { withCredentials: true, params: query }),
      "getPotentialProjectItems"
    );
  }

  async getServiceHierarchy(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<dto.GetServiceHierarchyResponse> {
    return handleError<dto.GetServiceHierarchyResponse>(
      () => this.api.get(`${config.api.url}/onboarding/services/hierarchy`, { withCredentials: true, params: query }),
      "getServiceHierarchy"
    );
  }

  async upsertDeveloperService(
    params: dto.UpsertDeveloperServiceParams,
    body: dto.UpsertDeveloperServiceBody,
    query: dto.UpsertDeveloperServiceQuery
  ): Promise<dto.UpsertDeveloperServiceResponse> {
    return handleError<dto.UpsertDeveloperServiceResponse>(
      () => this.api.put(`${config.api.url}/onboarding/services`, body, { withCredentials: true, params: query }),
      "upsertDeveloperService"
    );
  }

  async upsertDeveloperServices(
    params: dto.UpsertDeveloperServicesParams,
    body: dto.UpsertDeveloperServicesBody,
    query: dto.UpsertDeveloperServicesQuery
  ): Promise<dto.UpsertDeveloperServicesResponse> {
    return handleError<dto.UpsertDeveloperServicesResponse>(
      () =>
        this.api.post(`${config.api.url}/onboarding/services/batch`, body, { withCredentials: true, params: query }),
      "upsertDeveloperServices"
    );
  }

  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<void> {
    return handleError<void>(
      () =>
        this.api.delete(`${config.api.url}/onboarding/services/${params.developerServiceId}`, {
          withCredentials: true,
          params: query,
        }),
      "deleteDeveloperService"
    );
  }

  async createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse> {
    return handleError<dto.CreateCustomServiceResponse>(
      () =>
        this.api.post(`${config.api.url}/onboarding/services/custom`, body, { withCredentials: true, params: query }),
      "createCustomService"
    );
  }

  async completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse> {
    return handleError<dto.CompleteOnboardingResponse>(
      () => this.api.post(`${config.api.url}/onboarding/complete`, body, { withCredentials: true, params: query }),
      "completeOnboarding"
    );
  }
}
