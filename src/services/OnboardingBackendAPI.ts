<<<<<<< HEAD
import * as dto from "@open-source-economy/api-types";
import { handleError } from "./index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
=======
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError } from "./index";
import * as samdto from "src/api/dto/onboarding"; // TODO: sam the call is overtime to suppress all those types
import * as dto from "@open-source-economy/api-types";
>>>>>>> stage

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  return new OnboardingBackendAPIImpl();
}

export interface OnboardingBackendAPI {
  // Profile management
<<<<<<< HEAD
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

  // Project items (repositories) management
  addProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError>;

  // addRepository(
  //   params: dto.AddProjectItemParams,
  //   body: dto.AddRepositoryBody,
  //   query: dto.AddRepositoryQuery
  // ): Promise<any | ApiError>;

  removeProjectItem(
    params: dto.RemoveDeveloperProjectProjectItemParams,
    body: dto.RemoveDeveloperProjectProjectItemBody,
    query: dto.RemoveDeveloperProjectProjectItemQuery,
  ): Promise<dto.RemoveDeveloperProjectProjectItemResponse | ApiError>;

  getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError>;

  // getRepositories(
  //   params: dto.GetRepositoriesParams,
  //   query: dto.GetRepositoriesQuery
  // ): Promise<any | ApiError>;

  // GitHub integration
  // getGitHubOrganizations(
  //   params: dto.GetGitHubOrganizationsParams,
  //   query: dto.GetGitHubOrganizationsQuery
  // ): Promise<any | ApiError>;

  // getGitHubRepositories(
  //   params: dto.GetGitHubRepositoriesParams,
  //   query: dto.GetGitHubRepositoriesQuery
  // ): Promise<any | ApiError>;

  // getUserGitHubRepositories(
  //   params: dto.GetUserGitHubRepositoriesParams,
  //   query: dto.GetUserGitHubRepositoriesQuery
  // ): Promise<any | ApiError>;

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
=======
  createProfile(body: dto.CreateDeveloperProfileBody): Promise<dto.CreateDeveloperProfileResponse | ApiError>;
  updateProfile(body: dto.UpdateDeveloperContactInfosBody): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError>;
  getDeveloperProfile(): Promise<dto.GetDeveloperProfileResponse | ApiError>;

  // Settings management
  setDeveloperSettings(settings: samdto.SetDeveloperSettingsDto): Promise<samdto.SetDeveloperSettingsResponse | ApiError>;
  setIncomeStreams(incomeStreams: samdto.SetIncomeStreamsDto): Promise<samdto.SetIncomeStreamsResponse | ApiError>;

  // Repository management
  addRepository(repository: samdto.AddRepositoryDto): Promise<samdto.AddRepositoryResponse | ApiError>;
  removeRepository(projectItemId: string): Promise<samdto.RemoveRepositoryResponse | ApiError>;
  getRepositories(): Promise<samdto.GetRepositoriesResponse | ApiError>;

  // GitHub integration
  // TODO: should be in the GitHubBackendAPI
  // getGitHubOrganizations(): Promise<samdto.GetGitHubOrganizationsResponse | ApiError>;
  // getGitHubRepositories(org: string): Promise<samdto.GetGitHubRepositoriesResponse | ApiError>;
  getUserGitHubRepositories(): Promise<samdto.GetUserGitHubRepositoriesResponse | ApiError>;

  // Rights management
  updateDeveloperRights(id: string, updates: samdto.UpdateDeveloperRightsDto): Promise<samdto.OnboardingResponse | ApiError>;

  // Service management
  getServices(): Promise<samdto.GetServicesResponse | ApiError>;
  addDeveloperService(service: samdto.AddDeveloperServiceDto): Promise<samdto.DeveloperServiceResponse | ApiError>;
  updateDeveloperService(id: string, updates: samdto.UpdateDeveloperServiceDto): Promise<samdto.DeveloperServiceResponse | ApiError>;
  deleteDeveloperService(id: string): Promise<samdto.DeleteDeveloperServiceResponse | ApiError>;

  // Onboarding completion
  completeOnboarding(): Promise<samdto.CompleteOnboardingResponse | ApiError>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  private readonly baseUrl = `${config.api.url}/onboarding`;

  async createProfile(profileData?: samdto.CreateDeveloperProfileDto): Promise<samdto.OnboardingResponse | ApiError> {
    return handleError<samdto.OnboardingResponse>(() => axios.post(`${this.baseUrl}/profile`, profileData || {}, { withCredentials: true }), "createProfile");
  }

  async updateProfile(updates: samdto.UpdateDeveloperProfileDto): Promise<samdto.OnboardingResponse | ApiError> {
    return handleError<samdto.OnboardingResponse>(() => axios.put(`${this.baseUrl}/profile`, updates, { withCredentials: true }), "updateProfile");
>>>>>>> stage
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

<<<<<<< HEAD
  async setDeveloperSettings(
    params: dto.SetDeveloperSettingsParams,
    body: dto.SetDeveloperSettingsBody,
    query: dto.SetDeveloperSettingsQuery
  ): Promise<dto.SetDeveloperSettingsResponse | ApiError> {
    return handleError<dto.SetDeveloperSettingsResponse>(
      () => axios.post(`${config.api.url}/onboarding/settings`, body, { withCredentials: true, params: query }),
=======
  async setDeveloperSettings(settings: samdto.SetDeveloperSettingsDto): Promise<samdto.SetDeveloperSettingsResponse | ApiError> {
    return handleError<samdto.SetDeveloperSettingsResponse>(
      () => axios.post(`${this.baseUrl}/settings`, settings, { withCredentials: true }),
>>>>>>> stage
      "setDeveloperSettings",
    );
  }

<<<<<<< HEAD

  async addProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError> {
    return handleError<dto.UpsertDeveloperProjectItemResponse>(
      () => axios.post(`${config.api.url}/onboarding/project-items`, body, { withCredentials: true, params: query }),
      "addProjectItem",
    );
  }

  // async addRepository(
  //   params: dto.AddRepositoryParams,
  //   body: dto.AddRepositoryBody,
  //   query: dto.AddRepositoryQuery): Promise<any | ApiError> {
  //   return handleError<any>(() => axios.post(`${config.api.url}/onboarding/repositories`, body, { withCredentials: true, params: query }), "addRepository");
  // }

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

  // async getRepositories(
  //   params: dto.GetRepositoriesParams,
  //   query: dto.GetRepositoriesQuery
  // ): Promise<any | ApiError> {
  //   return handleError<any>(() => axios.get(`${config.api.url}/onboarding/repositories`, { withCredentials: true, params: query }), "getRepositories");
  // }

  // async getGitHubOrganizations(
  //   params: dto.GetGitHubOrganizationsParams,
  //   query: dto.GetGitHubOrganizationsQuery
  // ): Promise<any | ApiError> {
  //   return handleError<any>(
  //     () => axios.get(`${config.api.url}/onboarding/github/organizations`, { withCredentials: true, params: query }),
  //     "getGitHubOrganizations",
  //   );
  // }

  // async getGitHubRepositories(
  //   params: dto.GetGitHubRepositoriesParams,
  //   query: dto.GetGitHubRepositoriesQuery
  // ): Promise<any | ApiError> {
  //   return handleError<any>(
  //     () => axios.get(`${config.api.url}/onboarding/github/organizations/${params.org}/repositories`, { withCredentials: true, params: query }),
  //     "getGitHubRepositories",
  //   );
  // }

  // async getUserGitHubRepositories(
  //   params: dto.GetUserGitHubRepositoriesParams,
  //   query: dto.GetUserGitHubRepositoriesQuery
  // ): Promise<any | ApiError> {
  //   return handleError<any>(
  //     () => axios.get(`${config.api.url}/onboarding/github/user/repositories`, { withCredentials: true, params: query }),
  //     "getUserGitHubRepositories",
  //   );
  // }

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
=======
  async setIncomeStreams(incomeStreams: samdto.SetIncomeStreamsDto): Promise<samdto.SetIncomeStreamsResponse | ApiError> {
    return handleError<samdto.SetIncomeStreamsResponse>(
      () => axios.post(`${this.baseUrl}/income-streams`, incomeStreams, { withCredentials: true }),
      "setIncomeStreams",
    );
  }

  async addRepository(repository: samdto.AddRepositoryDto): Promise<samdto.AddRepositoryResponse | ApiError> {
    return handleError<samdto.AddRepositoryResponse>(() => axios.post(`${this.baseUrl}/repositories`, repository, { withCredentials: true }), "addRepository");
  }

  async removeRepository(projectItemId: string): Promise<samdto.RemoveRepositoryResponse | ApiError> {
    return handleError<samdto.RemoveRepositoryResponse>(
      () => axios.delete(`${this.baseUrl}/repositories/${projectItemId}`, { withCredentials: true }),
      "removeRepository",
    );
  }

  async getRepositories(): Promise<samdto.GetRepositoriesResponse | ApiError> {
    try {
      const response = await axios.get(`${this.baseUrl}/repositories`, { withCredentials: true });
      // Handle the actual backend response format: { success: boolean, data: [...] }
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data || [] };
      } else {
        return new ApiError(response.status, "API Error", response.data?.message || "Failed to fetch repositories");
      }
    } catch (err) {
      console.error("Error in getRepositories:", err);
      if (err instanceof Error) {
        return new ApiError(500, "Network Error", err.message);
      }
      return new ApiError(500, "Unknown Error", "An unknown error occurred");
    }
  }

  async getGitHubOrganizations(): Promise<samdto.GetGitHubOrganizationsResponse | ApiError> {
    return handleError<samdto.GetGitHubOrganizationsResponse>(
      () => axios.get(`${this.baseUrl}/github/organizations`, { withCredentials: true }),
      "getGitHubOrganizations",
    );
  }

  async getGitHubRepositories(org: string): Promise<samdto.GetGitHubRepositoriesResponse | ApiError> {
    return handleError<samdto.GetGitHubRepositoriesResponse>(
      () => axios.get(`${this.baseUrl}/github/organizations/${org}/repositories`, { withCredentials: true }),
      "getGitHubRepositories",
    );
  }

  async getUserGitHubRepositories(): Promise<samdto.GetUserGitHubRepositoriesResponse | ApiError> {
    return handleError<samdto.GetUserGitHubRepositoriesResponse>(
      () => axios.get(`${this.baseUrl}/github/user/repositories`, { withCredentials: true }),
      "getUserGitHubRepositories",
    );
  }

  async updateDeveloperRights(id: string, updates: samdto.UpdateDeveloperRightsDto): Promise<samdto.OnboardingResponse | ApiError> {
    return handleError<samdto.OnboardingResponse>(() => axios.put(`${this.baseUrl}/rights/${id}`, updates, { withCredentials: true }), "updateDeveloperRights");
  }

  async getServices(): Promise<samdto.GetServicesResponse | ApiError> {
    try {
      const response = await axios.get(`${this.baseUrl}/services`, { withCredentials: true });
      console.log("Raw services API response:", response.data);

      // Handle the actual backend response format: { success: boolean, data: Service[] }
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data || [] };
      } else {
        return new ApiError(response.status, "API Error", response.data?.message || "Failed to fetch services");
      }
    } catch (err) {
      console.error("Error in getServices:", err);
      if (err instanceof Error) {
        return new ApiError(500, "Network Error", err.message);
      }
      return new ApiError(500, "Unknown Error", "An unknown error occurred");
    }
  }

  async addDeveloperService(service: samdto.AddDeveloperServiceDto): Promise<samdto.DeveloperServiceResponse | ApiError> {
    return handleError<samdto.DeveloperServiceResponse>(
      () => axios.post(`${this.baseUrl}/developer-services`, service, { withCredentials: true }),
>>>>>>> stage
      "addDeveloperService",
    );
  }

<<<<<<< HEAD
  async updateDeveloperService(
    params: dto.UpdateDeveloperServiceParams,
    body: dto.UpdateDeveloperServiceBody,
    query: dto.UpdateDeveloperServiceQuery,
  ): Promise<dto.UpdateDeveloperServiceResponse | ApiError> {
    return handleError<dto.UpdateDeveloperServiceResponse>(
      () => axios.put(`${config.api.url}/onboarding/services/${body.id}`, body, { withCredentials: true, params: query }),
=======
  async updateDeveloperService(id: string, updates: samdto.UpdateDeveloperServiceDto): Promise<samdto.DeveloperServiceResponse | ApiError> {
    return handleError<samdto.DeveloperServiceResponse>(
      () => axios.put(`${this.baseUrl}/developer-services/${id}`, updates, { withCredentials: true }),
>>>>>>> stage
      "updateDeveloperService",
    );
  }

<<<<<<< HEAD
  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<dto.DeleteDeveloperServiceResponse>(
      () => axios.delete(`${config.api.url}/onboarding/services/${body.serviceId}`, { withCredentials: true, params: query }),
=======
  async deleteDeveloperService(id: string): Promise<samdto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<samdto.DeleteDeveloperServiceResponse>(
      () => axios.delete(`${this.baseUrl}/developer-services/${id}`, { withCredentials: true }),
>>>>>>> stage
      "deleteDeveloperService",
    );
  }

<<<<<<< HEAD
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
=======
  async completeOnboarding(): Promise<samdto.CompleteOnboardingResponse | ApiError> {
    return handleError<samdto.CompleteOnboardingResponse>(() => axios.post(`${this.baseUrl}/complete`, {}, { withCredentials: true }), "completeOnboarding");
>>>>>>> stage
  }
}
