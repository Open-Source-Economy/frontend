import * as dto from "@open-source-economy/api-types";
import { handleError } from "./index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  return new OnboardingBackendAPIImpl();
}

export interface OnboardingBackendAPI {
  // Profile management
  createDeveloperProfile(
    params: dto.CreateDeveloperProfileParams,
    body: dto.CreateDeveloperProfileBody,
    query: dto.CreateDeveloperProfileQuery
  ): Promise<dto.CreateDeveloperProfileResponse | ApiError>;

  updateDeveloperProfile(
    params: dto.UpdateDeveloperContactInfosParams,
    body: dto.UpdateDeveloperContactInfosBody,
    query: dto.UpdateDeveloperContactInfosQuery
  ): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError>;

  getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse | ApiError>;

  // Settings management
  setDeveloperSettings(
    params: dto.SetDeveloperSettingsParams,
    body: dto.SetDeveloperSettingsBody,
    query: dto.SetDeveloperSettingsQuery
  ): Promise<dto.SetDeveloperSettingsResponse | ApiError>;

  // Project items management
  upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError>;

  removeProjectItem(
    params: dto.RemoveDeveloperProjectProjectItemParams,
    body: dto.RemoveDeveloperProjectProjectItemBody,
    query: dto.RemoveDeveloperProjectProjectItemQuery,
  ): Promise<dto.RemoveDeveloperProjectProjectItemResponse | ApiError>;

  getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError>;

  // Service management (Not developer services)
  getServices(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<any | ApiError>;

  addDeveloperService(
    params: dto.AddDeveloperServiceParams,
    body: dto.AddDeveloperServiceBody,
    query: dto.AddDeveloperServiceQuery
  ): Promise<dto.AddDeveloperServiceResponse | ApiError>;

  updateDeveloperService(
    params: dto.UpdateDeveloperServiceParams,
    body: dto.UpdateDeveloperServiceBody,
    query: dto.UpdateDeveloperServiceQuery,
  ): Promise<dto.UpdateDeveloperServiceResponse | ApiError>;

  deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError>;

  createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse | ApiError>;

  // Onboarding completion
  completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse | ApiError>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  async createDeveloperProfile(
    params: dto.CreateDeveloperProfileParams,
    body: dto.CreateDeveloperProfileBody,
    query: dto.CreateDeveloperProfileQuery
  ): Promise<dto.CreateDeveloperProfileResponse | ApiError> {
    return handleError<dto.CreateDeveloperProfileResponse>(
      () => axios.post(`${config.api.url}/onboarding/profile`, body, { withCredentials: true, params: query }),
      "createDeveloperProfile",
    );
  }

  async updateDeveloperProfile(
    params: dto.UpdateDeveloperContactInfosParams,
    body: dto.UpdateDeveloperContactInfosBody,
    query: dto.UpdateDeveloperContactInfosQuery
  ): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError> {
    return handleError<dto.UpdateDeveloperContactInfosResponse>(
      () => axios.put(`${config.api.url}/onboarding/profile`, body, { withCredentials: true, params: query }),
      "updateDeveloperProfile",
    );
  }

  async getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    return handleError<dto.GetDeveloperProfileResponse>(
      () => axios.get(`${config.api.url}/onboarding/profile`, { withCredentials: true, params: query }),
      "getDeveloperProfile",
    );
  }

  async setDeveloperSettings(
    params: dto.SetDeveloperSettingsParams,
    body: dto.SetDeveloperSettingsBody,
    query: dto.SetDeveloperSettingsQuery
  ): Promise<dto.SetDeveloperSettingsResponse | ApiError> {
    return handleError<dto.SetDeveloperSettingsResponse>(
      () => axios.post(`${config.api.url}/onboarding/settings`, body, { withCredentials: true, params: query }),
      "setDeveloperSettings",
    );
  }


  async upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError> {
    return handleError<dto.UpsertDeveloperProjectItemResponse>(
      () => axios.post(`${config.api.url}/onboarding/project-items`, body, { withCredentials: true, params: query }),
      "upsertProjectItem",
    );
  }

  async removeProjectItem(
    params: dto.RemoveDeveloperProjectProjectItemParams,
    body: dto.RemoveDeveloperProjectProjectItemBody,
    query: dto.RemoveDeveloperProjectProjectItemQuery,
  ): Promise<dto.RemoveDeveloperProjectProjectItemResponse | ApiError> {
    return handleError<dto.RemoveDeveloperProjectProjectItemResponse>(
      () => axios.delete(`${config.api.url}/onboarding/project-items/${body.projectItemId}`, { withCredentials: true, params: query }),
      "removeProjectItem",
    );
  }

  async getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError> {
    return handleError<dto.GetPotentialDeveloperProjectItemsResponse>(
      () => axios.get(`${config.api.url}/onboarding/project-items/potential`, { withCredentials: true, params: query }),
      "getPotentialProjectItems",
    );
  }

  async getServices(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<any | ApiError> {
    return handleError<any>(() => axios.get(`${config.api.url}/onboarding/services`, { withCredentials: true, params: query }), "getServices");
  }

  async addDeveloperService(
    params: dto.AddDeveloperServiceParams,
    body: dto.AddDeveloperServiceBody,
    query: dto.AddDeveloperServiceQuery
  ): Promise<dto.AddDeveloperServiceResponse | ApiError> {
    return handleError<dto.AddDeveloperServiceResponse>(
      () => axios.post(`${config.api.url}/onboarding/services`, body, { withCredentials: true, params: query }),
      "addDeveloperService",
    );
  }

  async updateDeveloperService(
    params: dto.UpdateDeveloperServiceParams,
    body: dto.UpdateDeveloperServiceBody,
    query: dto.UpdateDeveloperServiceQuery,
  ): Promise<dto.UpdateDeveloperServiceResponse | ApiError> {
    return handleError<dto.UpdateDeveloperServiceResponse>(
      () => axios.put(`${config.api.url}/onboarding/services/${body.id}`, body, { withCredentials: true, params: query }),
      "updateDeveloperService",
    );
  }

  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<dto.DeleteDeveloperServiceResponse>(
      () => axios.delete(`${config.api.url}/onboarding/services/${body.serviceId}`, { withCredentials: true, params: query }),
      "deleteDeveloperService",
    );
  }

  async createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse | ApiError> {
    return handleError<dto.CreateCustomServiceResponse>(
      () => axios.post(`${config.api.url}/onboarding/services/custom`, body, { withCredentials: true, params: query }),
      "createCustomService",
    );
  }

  async completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse | ApiError> {
    return handleError<dto.CompleteOnboardingResponse>(
      () => axios.post(`${config.api.url}/onboarding/complete`, body, { withCredentials: true, params: query }),
      "completeOnboarding",
    );
  }
}
