import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { GetServiceHierarchyResponse } from "@open-source-economy/api-types/dist/dto/GetServiceHierarchy.dto";
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
    params: dto.CreateDeveloperProfileParams,
    body: dto.CreateDeveloperProfileBody,
    query: dto.CreateDeveloperProfileQuery,
  ): Promise<dto.CreateDeveloperProfileResponse | ApiError>;

  // Renamed to match the specific action and backend route
  updateDeveloperContactInfos(
    params: dto.UpdateDeveloperContactInfosParams,
    body: dto.UpdateDeveloperContactInfosBody,
    query: dto.UpdateDeveloperContactInfosQuery,
  ): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError>;

  getDeveloperProfile(params: dto.GetDeveloperProfileParams, query: dto.GetDeveloperProfileQuery): Promise<dto.GetDeveloperProfileResponse | ApiError>;

  // Settings management
  setDeveloperPreferences(
    params: dto.SetDeveloperPreferencesParams,
    body: dto.SetDeveloperPreferencesBody,
    query: dto.SetDeveloperPreferencesQuery,
  ): Promise<dto.SetDeveloperPreferencesResponse | ApiError>;

  setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery,
  ): Promise<dto.SetDeveloperServiceSettingsResponse | ApiError>;

  // Project items management
  upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery,
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError>;

  removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    body: dto.RemoveDeveloperProjectItemBody, // projectItemId now in body for DELETE
    query: dto.RemoveDeveloperProjectItemQuery,
  ): Promise<dto.RemoveDeveloperProjectItemResponse | ApiError>;

  getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery,
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError>;

  // Service management (Not developer services)
  getServiceHierarchy(params: dto.GetServiceHierarchyParams, query: dto.GetServiceHierarchyQuery): Promise<GetServiceHierarchyResponse | ApiError>;

  upsertDeveloperService(
    params: dto.UpsertDeveloperServiceParams,
    body: dto.UpsertDeveloperServiceBody,
    query: dto.UpsertDeveloperServiceQuery,
  ): Promise<dto.UpsertDeveloperServiceResponse | ApiError>;

  upsertDeveloperServices(
    params: dto.UpsertDeveloperServicesParams,
    body: dto.UpsertDeveloperServicesBody,
    query: dto.UpsertDeveloperServicesQuery,
  ): Promise<dto.UpsertDeveloperServicesResponse | ApiError>;

  deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody, // serviceId now in body for DELETE
    query: dto.DeleteDeveloperServiceQuery,
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError>;

  createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery,
  ): Promise<dto.CreateCustomServiceResponse | ApiError>;

  // Onboarding completion
  completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery,
  ): Promise<dto.CompleteOnboardingResponse | ApiError>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async createDeveloperProfile(
    params: dto.CreateDeveloperProfileParams,
    body: dto.CreateDeveloperProfileBody,
    query: dto.CreateDeveloperProfileQuery,
  ): Promise<dto.CreateDeveloperProfileResponse | ApiError> {
    return handleError<dto.CreateDeveloperProfileResponse>(
      () => this.api.post(`${config.api.url}/onboarding/profile`, body, { withCredentials: true, params: query }),
      "createDeveloperProfile",
    );
  }

  async updateDeveloperContactInfos(
    params: dto.UpdateDeveloperContactInfosParams,
    body: dto.UpdateDeveloperContactInfosBody,
    query: dto.UpdateDeveloperContactInfosQuery,
  ): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError> {
    return handleError<dto.UpdateDeveloperContactInfosResponse>(
      () => this.api.put(`${config.api.url}/onboarding/profile/contact-infos`, body, { withCredentials: true, params: query }),
      "updateDeveloperContactInfos",
    );
  }

  async getDeveloperProfile(params: dto.GetDeveloperProfileParams, query: dto.GetDeveloperProfileQuery): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    return handleError<dto.GetDeveloperProfileResponse>(
      () => this.api.get(`${config.api.url}/onboarding/profile`, { withCredentials: true, params: query }),
      "getDeveloperProfile",
    );
  }

  async setDeveloperPreferences(
    params: dto.SetDeveloperPreferencesParams,
    body: dto.SetDeveloperPreferencesBody,
    query: dto.SetDeveloperPreferencesQuery,
  ): Promise<dto.SetDeveloperPreferencesResponse | ApiError> {
    return handleError<dto.SetDeveloperPreferencesResponse>(
      () => this.api.put(`${config.api.url}/onboarding/settings/preferences`, body, { withCredentials: true, params: query }),
      "setDeveloperPreferences",
    );
  }

  async setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery,
  ): Promise<dto.SetDeveloperServiceSettingsResponse | ApiError> {
    return handleError<dto.SetDeveloperServiceSettingsResponse>(
      () => this.api.put(`${config.api.url}/onboarding/settings/services`, body, { withCredentials: true, params: query }),
      "setDeveloperServiceSettings",
    );
  }

  async upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery,
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError> {
    return handleError<dto.UpsertDeveloperProjectItemResponse>(
      () => this.api.post(`${config.api.url}/onboarding/projects`, body, { withCredentials: true, params: query }),
      "upsertProjectItem",
    );
  }

  async removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    body: dto.RemoveDeveloperProjectItemBody,
    query: dto.RemoveDeveloperProjectItemQuery,
  ): Promise<dto.RemoveDeveloperProjectItemResponse | ApiError> {
    return handleError<dto.RemoveDeveloperProjectItemResponse>(
      () => this.api.delete(`${config.api.url}/onboarding/projects`, { data: body, withCredentials: true, params: query }),
      "removeProjectItem",
    );
  }

  async getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery,
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError> {
    return handleError<dto.GetPotentialDeveloperProjectItemsResponse>(
      () => this.api.get(`${config.api.url}/onboarding/projects/potential`, { withCredentials: true, params: query }),
      "getPotentialProjectItems",
    );
  }

  async getServiceHierarchy(params: dto.GetServiceHierarchyParams, query: dto.GetServiceHierarchyQuery): Promise<GetServiceHierarchyResponse | ApiError> {
    return handleError<GetServiceHierarchyResponse>(
      () => this.api.get(`${config.api.url}/onboarding/services/hierarchy`, { withCredentials: true, params: query }),
      "getServiceHierarchy",
    );
  }

  async upsertDeveloperService(
    params: dto.UpsertDeveloperServiceParams,
    body: dto.UpsertDeveloperServiceBody,
    query: dto.UpsertDeveloperServiceQuery,
  ): Promise<dto.UpsertDeveloperServiceResponse | ApiError> {
    return handleError<dto.UpsertDeveloperServiceResponse>(
      () => this.api.put(`${config.api.url}/onboarding/services`, body, { withCredentials: true, params: query }),
      "upsertDeveloperService",
    );
  }

  async upsertDeveloperServices(
    params: dto.UpsertDeveloperServicesParams,
    body: dto.UpsertDeveloperServicesBody,
    query: dto.UpsertDeveloperServicesQuery,
  ): Promise<dto.UpsertDeveloperServicesResponse | ApiError> {
    return handleError<dto.UpsertDeveloperServicesResponse>(
      () => this.api.post(`${config.api.url}/onboarding/services/batch`, body, { withCredentials: true, params: query }),
      "upsertDeveloperServices",
    );
  }

  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody,
    query: dto.DeleteDeveloperServiceQuery,
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<dto.DeleteDeveloperServiceResponse>(
      () => this.api.delete(`${config.api.url}/onboarding/services`, { data: body, withCredentials: true, params: query }),
      "deleteDeveloperService",
    );
  }

  async createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery,
  ): Promise<dto.CreateCustomServiceResponse | ApiError> {
    return handleError<dto.CreateCustomServiceResponse>(
      () => this.api.post(`${config.api.url}/onboarding/services/custom`, body, { withCredentials: true, params: query }),
      "createCustomService",
    );
  }

  async completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery,
  ): Promise<dto.CompleteOnboardingResponse | ApiError> {
    return handleError<dto.CompleteOnboardingResponse>(
      () => this.api.post(`${config.api.url}/onboarding/complete`, body, { withCredentials: true, params: query }),
      "completeOnboarding",
    );
  }
}
