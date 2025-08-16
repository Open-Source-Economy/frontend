import axios, { AxiosError } from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError } from "./index";
import * as dto from "src/api/dto/onboarding";

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  return new OnboardingBackendAPIImpl();
}

export interface OnboardingBackendAPI {
  // Profile management
  createProfile(profileData?: dto.CreateDeveloperProfileDto): Promise<dto.OnboardingResponse | ApiError>;
  updateProfile(updates: dto.UpdateDeveloperProfileDto): Promise<dto.OnboardingResponse | ApiError>;
  getDeveloperProfile(): Promise<dto.GetDeveloperProfileResponse | ApiError>;

  // Settings management
  setDeveloperSettings(settings: dto.SetDeveloperSettingsDto): Promise<dto.SetDeveloperSettingsResponse | ApiError>;
  setIncomeStreams(incomeStreams: dto.SetIncomeStreamsDto): Promise<dto.SetIncomeStreamsResponse | ApiError>;

  // Repository management
  addRepository(repository: dto.AddRepositoryDto): Promise<dto.AddRepositoryResponse | ApiError>;
  removeRepository(projectItemId: string): Promise<dto.RemoveRepositoryResponse | ApiError>;
  getRepositories(): Promise<dto.GetRepositoriesResponse | ApiError>;

  // GitHub integration
  getGitHubOrganizations(): Promise<dto.GetGitHubOrganizationsResponse | ApiError>;
  getGitHubRepositories(org: string): Promise<dto.GetGitHubRepositoriesResponse | ApiError>;
  getUserGitHubRepositories(): Promise<dto.GetUserGitHubRepositoriesResponse | ApiError>;

  // Rights management
  updateDeveloperRights(id: string, updates: dto.UpdateDeveloperRightsDto): Promise<dto.OnboardingResponse | ApiError>;

  // Service management
  getServices(): Promise<dto.GetServicesResponse | ApiError>;
  addDeveloperService(service: dto.AddDeveloperServiceDto): Promise<dto.DeveloperServiceResponse | ApiError>;
  updateDeveloperService(id: string, updates: dto.UpdateDeveloperServiceDto): Promise<dto.DeveloperServiceResponse | ApiError>;
  deleteDeveloperService(id: string): Promise<dto.DeleteDeveloperServiceResponse | ApiError>;

  // Onboarding completion
  completeOnboarding(): Promise<dto.CompleteOnboardingResponse | ApiError>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  private readonly baseUrl = `${config.api.url}/onboarding`;

  async createProfile(profileData?: dto.CreateDeveloperProfileDto): Promise<dto.OnboardingResponse | ApiError> {
    return handleError<dto.OnboardingResponse>(() => axios.post(`${this.baseUrl}/profile`, profileData || {}, { withCredentials: true }), "createProfile");
  }

  async updateProfile(updates: dto.UpdateDeveloperProfileDto): Promise<dto.OnboardingResponse | ApiError> {
    return handleError<dto.OnboardingResponse>(() => axios.put(`${this.baseUrl}/profile`, updates, { withCredentials: true }), "updateProfile");
  }

  async getDeveloperProfile(): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    return handleError<dto.GetDeveloperProfileResponse>(() => axios.get(`${this.baseUrl}/profile`, { withCredentials: true }), "getDeveloperProfile");
  }

  async setDeveloperSettings(settings: dto.SetDeveloperSettingsDto): Promise<dto.SetDeveloperSettingsResponse | ApiError> {
    return handleError<dto.SetDeveloperSettingsResponse>(
      () => axios.post(`${this.baseUrl}/settings`, settings, { withCredentials: true }),
      "setDeveloperSettings",
    );
  }

  async setIncomeStreams(incomeStreams: dto.SetIncomeStreamsDto): Promise<dto.SetIncomeStreamsResponse | ApiError> {
    return handleError<dto.SetIncomeStreamsResponse>(
      () => axios.post(`${this.baseUrl}/income-streams`, incomeStreams, { withCredentials: true }),
      "setIncomeStreams",
    );
  }

  async addRepository(repository: dto.AddRepositoryDto): Promise<dto.AddRepositoryResponse | ApiError> {
    return handleError<dto.AddRepositoryResponse>(() => axios.post(`${this.baseUrl}/repositories`, repository, { withCredentials: true }), "addRepository");
  }

  async removeRepository(projectItemId: string): Promise<dto.RemoveRepositoryResponse | ApiError> {
    return handleError<dto.RemoveRepositoryResponse>(
      () => axios.delete(`${this.baseUrl}/repositories/${projectItemId}`, { withCredentials: true }),
      "removeRepository",
    );
  }

  async getRepositories(): Promise<dto.GetRepositoriesResponse | ApiError> {
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

  async getGitHubOrganizations(): Promise<dto.GetGitHubOrganizationsResponse | ApiError> {
    return handleError<dto.GetGitHubOrganizationsResponse>(
      () => axios.get(`${this.baseUrl}/github/organizations`, { withCredentials: true }),
      "getGitHubOrganizations",
    );
  }

  async getGitHubRepositories(org: string): Promise<dto.GetGitHubRepositoriesResponse | ApiError> {
    return handleError<dto.GetGitHubRepositoriesResponse>(
      () => axios.get(`${this.baseUrl}/github/organizations/${org}/repositories`, { withCredentials: true }),
      "getGitHubRepositories",
    );
  }

  async getUserGitHubRepositories(): Promise<dto.GetUserGitHubRepositoriesResponse | ApiError> {
    return handleError<dto.GetUserGitHubRepositoriesResponse>(
      () => axios.get(`${this.baseUrl}/github/user/repositories`, { withCredentials: true }),
      "getUserGitHubRepositories",
    );
  }

  async updateDeveloperRights(id: string, updates: dto.UpdateDeveloperRightsDto): Promise<dto.OnboardingResponse | ApiError> {
    return handleError<dto.OnboardingResponse>(() => axios.put(`${this.baseUrl}/rights/${id}`, updates, { withCredentials: true }), "updateDeveloperRights");
  }

  async getServices(): Promise<dto.GetServicesResponse | ApiError> {
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

  async addDeveloperService(service: dto.AddDeveloperServiceDto): Promise<dto.DeveloperServiceResponse | ApiError> {
    return handleError<dto.DeveloperServiceResponse>(
      () => axios.post(`${this.baseUrl}/developer-services`, service, { withCredentials: true }),
      "addDeveloperService",
    );
  }

  async updateDeveloperService(id: string, updates: dto.UpdateDeveloperServiceDto): Promise<dto.DeveloperServiceResponse | ApiError> {
    return handleError<dto.DeveloperServiceResponse>(
      () => axios.put(`${this.baseUrl}/developer-services/${id}`, updates, { withCredentials: true }),
      "updateDeveloperService",
    );
  }

  async deleteDeveloperService(id: string): Promise<dto.DeleteDeveloperServiceResponse | ApiError> {
    return handleError<dto.DeleteDeveloperServiceResponse>(
      () => axios.delete(`${this.baseUrl}/developer-services/${id}`, { withCredentials: true }),
      "deleteDeveloperService",
    );
  }

  async completeOnboarding(): Promise<dto.CompleteOnboardingResponse | ApiError> {
    return handleError<dto.CompleteOnboardingResponse>(() => axios.post(`${this.baseUrl}/complete`, {}, { withCredentials: true }), "completeOnboarding");
  }
}
