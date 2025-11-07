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

  async syncOwner(params: dto.SyncOwnerParams, query: dto.SyncOwnerQuery): Promise<dto.SyncOwnerResponse | ApiError> {
    return await handleError<dto.SyncOwnerResponse>(
      () => this.api.post(`${config.api.url}/github/owners/${params.owner}/sync`, {}, { withCredentials: true, params: query }),
      "syncOwner",
    );
  }

  async syncRepository(
    params: dto.SyncRepositoryParams,
    body: dto.SyncRepositoryBody,
    query: dto.SyncRepositoryQuery,
  ): Promise<dto.SyncRepositoryResponse | ApiError> {
    return await handleError<dto.SyncRepositoryResponse>(
      () => this.api.post(`${config.api.url}/github/repos/${params.owner}/${params.repo}/sync`, body ?? {}, { withCredentials: true, params: query }),
      "syncRepository",
    );
  }

  async syncProject(params: dto.SyncProjectParams, query: dto.SyncProjectQuery): Promise<dto.SyncProjectResponse | ApiError> {
    const path = params.repo
      ? `${config.api.url}/github/projects/${params.owner}/${params.repo}/sync`
      : `${config.api.url}/github/projects/${params.owner}/sync`;

    return await handleError<dto.SyncProjectResponse>(() => this.api.post(path, {}, { withCredentials: true, params: query }), "syncProject");
  }

  async createAddress(body: dto.CreateAddressBody, query: dto.CreateAddressQuery): Promise<dto.CreateAddressResponse | ApiError> {
    return await handleError<dto.CreateAddressResponse>(
      () => this.api.post(`${config.api.url}/admin/address`, body, { withCredentials: true }),
      "createAddress",
    );
  }

  async createCompany(body: dto.CreateCompanyBody, query: dto.CreateCompanyQuery): Promise<dto.CreateCompanyResponse | ApiError> {
    return await handleError<dto.CreateCompanyResponse>(
      () => this.api.post(`${config.api.url}/admin/company`, body, { withCredentials: true }),
      "createCompany",
    );
  }

  async sendCompanyRoleInvite(
    params: dto.SendCompanyRoleInviteParams,
    body: dto.SendCompanyRoleInviteBody,
    query: dto.SendCompanyRoleInviteQuery,
  ): Promise<dto.SendCompanyRoleInviteResponse | ApiError> {
    return await handleError<dto.SendCompanyRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async sendRepositoryRoleInvite(
    params: dto.SendRepositoryRoleInviteParams,
    body: dto.SendRepositoryRoleInviteBody,
    query: dto.SendRepositoryRoleInviteQuery,
  ): Promise<dto.SendRepositoryRoleInviteResponse | ApiError> {
    return await handleError<dto.SendRepositoryRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/repository/admin-invite`, body, { withCredentials: true }),
      "sendRepositoryAdminInvite",
    );
  }

  async createManualInvoice(body: dto.CreateManualInvoiceBody, query: dto.CreateManualInvoiceQuery): Promise<dto.CreateManualInvoiceResponse | ApiError> {
    return await handleError<dto.CreateManualInvoiceResponse>(
      () => this.api.post(`${config.api.url}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice",
    );
  }

  async createCampaignProductAndPrice(
    params: dto.CreateCampaignProductAndPriceParams,
    body: dto.CreateCampaignProductAndPriceBody,
    query: dto.CreateCampaignProductAndPriceQuery,
  ): Promise<dto.CreateCampaignProductAndPriceResponse | ApiError> {
    return await handleError<dto.CreateCampaignProductAndPriceResponse>(
      () => this.api.post(`${config.api.url}/admin/${projectPath(params.owner, params.repo)}/stripe/product-and-price`, body, { withCredentials: true }),
      "createCampaignProductAndPrice",
    );
  }

  async createPlanProductAndPrice(
    params: dto.CreatePlanProductAndPriceParams,
    body: dto.CreatePlanProductAndPriceBody,
    query: dto.CreatePlanProductAndPriceQuery,
  ): Promise<dto.CreatePlanProductAndPriceResponse | ApiError> {
    return await handleError<dto.CreatePlanProductAndPriceResponse>(
      () => this.api.post(`${config.api.url}/admin/plan/product-and-price`, body, { withCredentials: true }),
      "createPlanProductAndPrice",
    );
  }

  async createProject(
    params: dto.CreateProjectParams,
    body: dto.CreateProjectBody,
    query: dto.CreateProjectQuery,
  ): Promise<dto.CreateProjectResponse | ApiError> {
    return await handleError<dto.CreateProjectResponse>(
      () => this.api.post(`${config.api.url}/admin/projects/${projectPath(params.owner, params.repo)}`, body, { withCredentials: true }),
      "createProject",
    );
  }
}
