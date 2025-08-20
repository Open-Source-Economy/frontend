import axios, { AxiosError } from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { handleError } from "./index";
import {
  CreateDeveloperProfileBody,
  CreateDeveloperProfileResponse,
  UpdateDeveloperContactInfosBody,
  UpdateDeveloperContactInfosResponse,
  GetDeveloperProfileResponse,
  SetDeveloperSettingsBody,
  SetDeveloperSettingsResponse,
  UpsertDeveloperProjectItemBody,
  UpsertDeveloperProjectItemResponse,
  RemoveDeveloperProjectProjectItemResponse,
  GetPotentialDeveloperProjectItemsResponse,
  AddDeveloperServiceBody,
  AddDeveloperServiceResponse,
  UpdateDeveloperServiceBody,
  UpdateDeveloperServiceResponse,
  DeleteDeveloperServiceResponse,
  CompleteOnboardingResponse,
  CreateCustomServiceBody,
  CreateCustomServiceResponse,
} from "@open-source-economy/api-types";

export function getOnboardingBackendAPI(): OnboardingBackendAPI {
  return new OnboardingBackendAPIImpl();
}

export interface OnboardingBackendAPI {
  // Profile management
  createProfile(profileData?: CreateDeveloperProfileBody): Promise<CreateDeveloperProfileResponse | ApiError>;
  updateProfile(updates: UpdateDeveloperContactInfosBody): Promise<UpdateDeveloperContactInfosResponse | ApiError>;
  getDeveloperProfile(): Promise<GetDeveloperProfileResponse | ApiError>;

  // Settings management
  setDeveloperSettings(settings: SetDeveloperSettingsBody): Promise<SetDeveloperSettingsResponse | ApiError>;
  setIncomeStreams(incomeStreams: any): Promise<any | ApiError>; // Legacy method for compatibility

  // Project items (repositories) management
  addProjectItem(projectItem: UpsertDeveloperProjectItemBody): Promise<UpsertDeveloperProjectItemResponse | ApiError>;
  addRepository(repository: any): Promise<any | ApiError>; // Legacy method for compatibility
  removeProjectItem(projectItemId: string): Promise<RemoveDeveloperProjectProjectItemResponse | ApiError>;
  getPotentialProjectItems(): Promise<GetPotentialDeveloperProjectItemsResponse | ApiError>;
  getRepositories(): Promise<any | ApiError>; // Legacy method for compatibility

  // GitHub integration
  getGitHubOrganizations(): Promise<any | ApiError>; // Keep as any for now, will need to check api-types
  getGitHubRepositories(org: string): Promise<any | ApiError>;
  getUserGitHubRepositories(): Promise<any | ApiError>;

  // Service management
  getServices(): Promise<any | ApiError>; // Keep as any for now
  addDeveloperService(service: AddDeveloperServiceBody): Promise<AddDeveloperServiceResponse | ApiError>;
  updateDeveloperService(id: string, updates: UpdateDeveloperServiceBody): Promise<UpdateDeveloperServiceResponse | ApiError>;
  deleteDeveloperService(id: string): Promise<DeleteDeveloperServiceResponse | ApiError>;
  createCustomService(service: CreateCustomServiceBody): Promise<CreateCustomServiceResponse | ApiError>;

  // Onboarding completion
  completeOnboarding(): Promise<CompleteOnboardingResponse | ApiError>;
}

class OnboardingBackendAPIImpl implements OnboardingBackendAPI {
  private readonly baseUrl = `${config.api.url}/onboarding`;

  async createProfile(profileData?: CreateDeveloperProfileBody): Promise<CreateDeveloperProfileResponse | ApiError> {
    const data = profileData || { name: "", email: "", agreedToTerms: false };
    return handleError<CreateDeveloperProfileResponse>(() => axios.post(`${this.baseUrl}/profile`, data, { withCredentials: true }), "createProfile");
  }

  async updateProfile(updates: UpdateDeveloperContactInfosBody): Promise<UpdateDeveloperContactInfosResponse | ApiError> {
    return handleError<UpdateDeveloperContactInfosResponse>(() => axios.put(`${this.baseUrl}/profile`, updates, { withCredentials: true }), "updateProfile");
  }

  async getDeveloperProfile(): Promise<GetDeveloperProfileResponse | ApiError> {
    return handleError<GetDeveloperProfileResponse>(() => axios.get(`${this.baseUrl}/profile`, { withCredentials: true }), "getDeveloperProfile");
  }

  async setDeveloperSettings(settings: SetDeveloperSettingsBody): Promise<SetDeveloperSettingsResponse | ApiError> {
    return handleError<SetDeveloperSettingsResponse>(
      () => axios.post(`${this.baseUrl}/settings`, settings, { withCredentials: true }),
      "setDeveloperSettings",
    );
  }

  async setIncomeStreams(incomeStreams: any): Promise<any | ApiError> {
    // Legacy method - maps to settings
    return handleError<any>(() => axios.post(`${this.baseUrl}/income-streams`, incomeStreams, { withCredentials: true }), "setIncomeStreams");
  }

  async addProjectItem(projectItem: UpsertDeveloperProjectItemBody): Promise<UpsertDeveloperProjectItemResponse | ApiError> {
    return handleError<UpsertDeveloperProjectItemResponse>(
      () => axios.post(`${this.baseUrl}/project-items`, projectItem, { withCredentials: true }),
      "addProjectItem",
    );
  }

  async addRepository(repository: any): Promise<any | ApiError> {
    // Legacy method - maps to addProjectItem
    return handleError<any>(() => axios.post(`${this.baseUrl}/repositories`, repository, { withCredentials: true }), "addRepository");
  }

  async removeProjectItem(projectItemId: string): Promise<RemoveDeveloperProjectProjectItemResponse | ApiError> {
    return handleError<RemoveDeveloperProjectProjectItemResponse>(
      () => axios.delete(`${this.baseUrl}/project-items/${projectItemId}`, { withCredentials: true }),
      "removeProjectItem",
    );
  }

  async getPotentialProjectItems(): Promise<GetPotentialDeveloperProjectItemsResponse | ApiError> {
    try {
      const response = await axios.get(`${this.baseUrl}/project-items/potential`, { withCredentials: true });
      return response.data;
    } catch (err) {
      console.error("Error in getPotentialProjectItems:", err);
      if (err instanceof Error) {
        return new ApiError(500, "Network Error", err.message);
      }
      return new ApiError(500, "Unknown Error", "An unknown error occurred");
    }
  }

  async getRepositories(): Promise<any | ApiError> {
    // Legacy method - maps to getPotentialProjectItems
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

  async getGitHubOrganizations(): Promise<any | ApiError> {
    return handleError<any>(() => axios.get(`${this.baseUrl}/github/organizations`, { withCredentials: true }), "getGitHubOrganizations");
  }

  async getGitHubRepositories(org: string): Promise<any | ApiError> {
    return handleError<any>(() => axios.get(`${this.baseUrl}/github/organizations/${org}/repositories`, { withCredentials: true }), "getGitHubRepositories");
  }

  async getUserGitHubRepositories(): Promise<any | ApiError> {
    return handleError<any>(() => axios.get(`${this.baseUrl}/github/user/repositories`, { withCredentials: true }), "getUserGitHubRepositories");
  }

  async getServices(): Promise<any | ApiError> {
    try {
      const response = await axios.get(`${this.baseUrl}/services`, { withCredentials: true });
      console.log("Raw services API response:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error in getServices:", err);
      if (err instanceof Error) {
        return new ApiError(500, "Network Error", err.message);
      }
      return new ApiError(500, "Unknown Error", "An unknown error occurred");
    }
  }

  async addDeveloperService(service: AddDeveloperServiceBody): Promise<AddDeveloperServiceResponse | ApiError> {
    return handleError<AddDeveloperServiceResponse>(
      () => axios.post(`${this.baseUrl}/services`, service, { withCredentials: true }),
      "addDeveloperService",
    );
  }

  async updateDeveloperService(id: string, updates: UpdateDeveloperServiceBody): Promise<UpdateDeveloperServiceResponse | ApiError> {
    return handleError<UpdateDeveloperServiceResponse>(
      () => axios.put(`${this.baseUrl}/services/${id}`, updates, { withCredentials: true }),
      "updateDeveloperService",
    );
  }

  async deleteDeveloperService(id: string): Promise<DeleteDeveloperServiceResponse | ApiError> {
    return handleError<DeleteDeveloperServiceResponse>(
      () => axios.delete(`${this.baseUrl}/services/${id}`, { withCredentials: true }),
      "deleteDeveloperService",
    );
  }

  async createCustomService(service: CreateCustomServiceBody): Promise<CreateCustomServiceResponse | ApiError> {
    return handleError<CreateCustomServiceResponse>(
      () => axios.post(`${this.baseUrl}/services/custom`, service, { withCredentials: true }),
      "createCustomService",
    );
  }

  async completeOnboarding(): Promise<CompleteOnboardingResponse | ApiError> {
    return handleError<CompleteOnboardingResponse>(() => axios.post(`${this.baseUrl}/complete`, {}, { withCredentials: true }), "completeOnboarding");
  }
}
