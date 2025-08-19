import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError } from "./index";
import * as samdto from "src/api/dto/onboarding"; // TODO: sam the call is overtime to suppress all those types
import * as dto from "@open-source-economy/api-types";

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  return new OnboardingBackendAPIImpl();
}

export interface OnboardingBackendAPI {
  // Profile management
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
  }

  async getDeveloperProfile(): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    return handleError<dto.GetDeveloperProfileResponse>(() => axios.get(`${this.baseUrl}/profile`, { withCredentials: true }), "getDeveloperProfile");
  }

  async setDeveloperSettings(settings: samdto.SetDeveloperSettingsDto): Promise<samdto.SetDeveloperSettingsResponse | ApiError> {
    return handleError<samdto.SetDeveloperSettingsResponse>(
      () => axios.post(`${this.baseUrl}/settings`, settings, { withCredentials: true }),
      "setDeveloperSettings",
    );
  }

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
      "addDeveloperService",
    );
  }

  async updateDeveloperService(id: string, updates: samdto.UpdateDeveloperServiceDto): Promise<samdto.DeveloperServiceResponse | ApiError> {
    return handleError<samdto.DeveloperServiceResponse>(
      () => axios.put(`${this.baseUrl}/developer-services/${id}`, updates, { withCredentials: true }),
      "updateDeveloperService",
    );
  }

  async deleteDeveloperService(id: string): Promise<samdto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<samdto.DeleteDeveloperServiceResponse>(
      () => axios.delete(`${this.baseUrl}/developer-services/${id}`, { withCredentials: true }),
      "deleteDeveloperService",
    );
  }

  async completeOnboarding(): Promise<samdto.CompleteOnboardingResponse | ApiError> {
    return handleError<samdto.CompleteOnboardingResponse>(() => axios.post(`${this.baseUrl}/complete`, {}, { withCredentials: true }), "completeOnboarding");
  }
}
