import { AxiosInstance } from "axios";
import * as dto from "@open-source-economy/api-types";
import { api, handleError, projectPath } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl(api);
}

export interface AdminBackendAPI {
  getAllDeveloperProfiles(
    params: dto.GetAllDeveloperProfilesParams,
    query: dto.GetAllDeveloperProfilesQuery,
  ): Promise<dto.GetAllDeveloperProfilesResponse | ApiError>;
  getDeveloperProfile(params: { githubUsername: string }, query: dto.GetDeveloperProfileQuery): Promise<dto.GetDeveloperProfileResponse | ApiError>;
  createVerificationRecord(
    params: dto.CreateVerificationRecordParams,
    body: dto.CreateVerificationRecordBody,
    query: dto.CreateVerificationRecordQuery,
  ): Promise<dto.CreateVerificationRecordResponse | ApiError>;
  syncOrganizationRepositories(
    params: dto.SyncOrganizationRepositoriesParams,
    query: dto.SyncOrganizationRepositoriesQuery,
  ): Promise<dto.SyncOrganizationRepositoriesResponse | ApiError>;
  syncOwner(params: dto.SyncOwnerParams, query: dto.SyncOwnerQuery): Promise<dto.SyncOwnerResponse | ApiError>;
  syncRepository(
    params: dto.SyncRepositoryParams,
    body: dto.SyncRepositoryBody,
    query: dto.SyncRepositoryQuery,
  ): Promise<dto.SyncRepositoryResponse | ApiError>;
  syncProject(params: dto.SyncProjectParams, query: dto.SyncProjectQuery): Promise<dto.SyncProjectResponse | ApiError>;
  createAddress(body: dto.CreateAddressBody, query: dto.CreateAddressQuery): Promise<dto.CreateAddressResponse | ApiError>;
  createCompany(body: dto.CreateCompanyBody, query: dto.CreateCompanyQuery): Promise<dto.CreateCompanyResponse | ApiError>;
  sendCompanyRoleInvite(
    params: dto.SendCompanyRoleInviteParams,
    body: dto.SendCompanyRoleInviteBody,
    query: dto.SendCompanyRoleInviteQuery,
  ): Promise<dto.SendCompanyRoleInviteResponse | ApiError>;
  sendRepositoryRoleInvite(
    params: dto.SendRepositoryRoleInviteParams,
    body: dto.SendRepositoryRoleInviteBody,
    query: dto.SendRepositoryRoleInviteQuery,
  ): Promise<dto.SendRepositoryRoleInviteResponse | ApiError>;
  createCampaignProductAndPrice(
    params: dto.CreateCampaignProductAndPriceParams,
    body: dto.CreateCampaignProductAndPriceBody,
    query: dto.CreateCampaignProductAndPriceQuery,
  ): Promise<dto.CreateCampaignProductAndPriceResponse | ApiError>;
  createManualInvoice(body: dto.CreateManualInvoiceBody, query: dto.CreateManualInvoiceQuery): Promise<dto.CreateManualInvoiceResponse | ApiError>;
  createPlanProductAndPrice(
    params: dto.CreatePlanProductAndPriceParams,
    body: dto.CreatePlanProductAndPriceBody,
    query: dto.CreatePlanProductAndPriceQuery,
  ): Promise<dto.CreatePlanProductAndPriceResponse | ApiError>;
  createProject(params: dto.CreateProjectParams, body: dto.CreateProjectBody, query: dto.CreateProjectQuery): Promise<dto.CreateProjectResponse | ApiError>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getAllDeveloperProfiles(
    params: dto.GetAllDeveloperProfilesParams,
    query: dto.GetAllDeveloperProfilesQuery,
  ): Promise<dto.GetAllDeveloperProfilesResponse | ApiError> {
    return await handleError<dto.GetAllDeveloperProfilesResponse>(
      () => this.api.get(`${config.api.url}/admin/profiles`, { withCredentials: true, params: query }),
      "getAllDeveloperProfiles",
    );
  }

  async getDeveloperProfile(params: { githubUsername: string }, query: dto.GetDeveloperProfileQuery): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    return await handleError<dto.GetDeveloperProfileResponse>(
      () => this.api.get(`${config.api.url}/admin/developer-profile/${params.githubUsername}`, { withCredentials: true, params: query }),
      "getDeveloperProfile",
    );
  }

  async createVerificationRecord(
    params: dto.CreateVerificationRecordParams,
    body: dto.CreateVerificationRecordBody,
    query: dto.CreateVerificationRecordQuery,
  ): Promise<dto.CreateVerificationRecordResponse | ApiError> {
    return await handleError<dto.CreateVerificationRecordResponse>(
      () => this.api.post(`${config.api.url}/admin/verification-record`, body, { withCredentials: true, params: query }),
      "createVerificationRecord",
    );
  }

  async syncOrganizationRepositories(
    params: dto.SyncOrganizationRepositoriesParams,
    query: dto.SyncOrganizationRepositoriesQuery,
  ): Promise<dto.SyncOrganizationRepositoriesResponse | ApiError> {
    return await handleError<dto.SyncOrganizationRepositoriesResponse>(
      () => this.api.post(`${config.api.url}/admin/organizations/${params.projectItemId}/sync-repositories`, {}, { withCredentials: true, params: query }),
      "syncOrganizationRepositories",
    );
  }
}
