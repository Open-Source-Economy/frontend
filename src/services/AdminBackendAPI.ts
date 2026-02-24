import { AxiosInstance } from "axios";
import * as dto from "@open-source-economy/api-types";
import { api, handleError, projectPath } from "./index";
import { config } from "src/ultils";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl(api);
}

export interface AdminBackendAPI {
  getAllDeveloperProfiles(
    params: dto.GetAllDeveloperProfilesParams,
    query: dto.GetAllDeveloperProfilesQuery
  ): Promise<dto.GetAllDeveloperProfilesResponse>;
  getDeveloperProfile(
    params: { githubUsername: string },
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse>;
  createVerificationRecord(
    params: dto.CreateVerificationRecordParams,
    body: dto.CreateVerificationRecordBody,
    query: dto.CreateVerificationRecordQuery
  ): Promise<dto.CreateVerificationRecordResponse>;
  syncOrganizationRepositories(
    params: dto.SyncOrganizationRepositoriesParams,
    query: dto.SyncOrganizationRepositoriesQuery
  ): Promise<dto.SyncOrganizationRepositoriesResponse>;
  syncOwner(params: dto.SyncOwnerParams, query: dto.SyncOwnerQuery): Promise<dto.SyncOwnerResponse>;
  syncRepository(
    params: dto.SyncRepositoryParams,
    body: dto.SyncRepositoryBody,
    query: dto.SyncRepositoryQuery
  ): Promise<dto.SyncRepositoryResponse>;
  syncProject(params: dto.SyncProjectParams, query: dto.SyncProjectQuery): Promise<dto.SyncProjectResponse>;
  createAddress(body: dto.CreateAddressBody, query: dto.CreateAddressQuery): Promise<dto.CreateAddressResponse>;
  createCompany(body: dto.CreateCompanyBody, query: dto.CreateCompanyQuery): Promise<dto.CreateCompanyResponse>;
  sendCompanyRoleInvite(
    params: dto.SendCompanyRoleInviteParams,
    body: dto.SendCompanyRoleInviteBody,
    query: dto.SendCompanyRoleInviteQuery
  ): Promise<dto.SendCompanyRoleInviteResponse>;
  sendRepositoryRoleInvite(
    params: dto.SendRepositoryRoleInviteParams,
    body: dto.SendRepositoryRoleInviteBody,
    query: dto.SendRepositoryRoleInviteQuery
  ): Promise<dto.SendRepositoryRoleInviteResponse>;
  createCampaignProductAndPrice(
    params: dto.CreateCampaignProductAndPriceParams,
    body: dto.CreateCampaignProductAndPriceBody,
    query: dto.CreateCampaignProductAndPriceQuery
  ): Promise<dto.CreateCampaignProductAndPriceResponse>;
  createManualInvoice(
    body: dto.CreateManualInvoiceBody,
    query: dto.CreateManualInvoiceQuery
  ): Promise<dto.CreateManualInvoiceResponse>;
  createPlanProductAndPrice(
    params: dto.CreatePlanProductAndPriceParams,
    body: dto.CreatePlanProductAndPriceBody,
    query: dto.CreatePlanProductAndPriceQuery
  ): Promise<dto.CreatePlanProductAndPriceResponse>;
  createProject(
    params: dto.CreateProjectParams,
    body: dto.CreateProjectBody,
    query: dto.CreateProjectQuery
  ): Promise<dto.CreateProjectResponse>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getAllDeveloperProfiles(
    params: dto.GetAllDeveloperProfilesParams,
    query: dto.GetAllDeveloperProfilesQuery
  ): Promise<dto.GetAllDeveloperProfilesResponse> {
    return await handleError<dto.GetAllDeveloperProfilesResponse>(
      () => this.api.get(`${config.api.url}/admin/profiles`, { withCredentials: true, params: query }),
      "getAllDeveloperProfiles"
    );
  }

  async getDeveloperProfile(
    params: { githubUsername: string },
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse> {
    return await handleError<dto.GetDeveloperProfileResponse>(
      () =>
        this.api.get(`${config.api.url}/admin/developer-profile/${params.githubUsername}`, {
          withCredentials: true,
          params: query,
        }),
      "getDeveloperProfile"
    );
  }

  async createVerificationRecord(
    params: dto.CreateVerificationRecordParams,
    body: dto.CreateVerificationRecordBody,
    query: dto.CreateVerificationRecordQuery
  ): Promise<dto.CreateVerificationRecordResponse> {
    return await handleError<dto.CreateVerificationRecordResponse>(
      () =>
        this.api.post(`${config.api.url}/admin/verification-record`, body, { withCredentials: true, params: query }),
      "createVerificationRecord"
    );
  }

  async syncOrganizationRepositories(
    params: dto.SyncOrganizationRepositoriesParams,
    query: dto.SyncOrganizationRepositoriesQuery
  ): Promise<dto.SyncOrganizationRepositoriesResponse> {
    return await handleError<dto.SyncOrganizationRepositoriesResponse>(
      () =>
        this.api.post(
          `${config.api.url}/admin/organizations/${params.projectItemId}/sync-repositories`,
          {},
          { withCredentials: true, params: query }
        ),
      "syncOrganizationRepositories"
    );
  }

  async syncOwner(params: dto.SyncOwnerParams, query: dto.SyncOwnerQuery): Promise<dto.SyncOwnerResponse> {
    return await handleError<dto.SyncOwnerResponse>(
      () =>
        this.api.post(
          `${config.api.url}/github/owners/${params.owner}/sync`,
          {},
          { withCredentials: true, params: query }
        ),
      "syncOwner"
    );
  }

  async syncRepository(
    params: dto.SyncRepositoryParams,
    body: dto.SyncRepositoryBody,
    query: dto.SyncRepositoryQuery
  ): Promise<dto.SyncRepositoryResponse> {
    return await handleError<dto.SyncRepositoryResponse>(
      () =>
        this.api.post(`${config.api.url}/github/repos/${params.owner}/${params.repo}/sync`, body ?? {}, {
          withCredentials: true,
          params: query,
        }),
      "syncRepository"
    );
  }

  async syncProject(params: dto.SyncProjectParams, query: dto.SyncProjectQuery): Promise<dto.SyncProjectResponse> {
    const path = params.repo
      ? `${config.api.url}/github/projects/${params.owner}/${params.repo}/sync`
      : `${config.api.url}/github/projects/${params.owner}/sync`;

    return await handleError<dto.SyncProjectResponse>(
      () => this.api.post(path, {}, { withCredentials: true, params: query }),
      "syncProject"
    );
  }

  async createAddress(body: dto.CreateAddressBody, _query: dto.CreateAddressQuery): Promise<dto.CreateAddressResponse> {
    return await handleError<dto.CreateAddressResponse>(
      () => this.api.post(`${config.api.url}/admin/address`, body, { withCredentials: true }),
      "createAddress"
    );
  }

  async createCompany(body: dto.CreateCompanyBody, _query: dto.CreateCompanyQuery): Promise<dto.CreateCompanyResponse> {
    return await handleError<dto.CreateCompanyResponse>(
      () => this.api.post(`${config.api.url}/admin/company`, body, { withCredentials: true }),
      "createCompany"
    );
  }

  async sendCompanyRoleInvite(
    params: dto.SendCompanyRoleInviteParams,
    body: dto.SendCompanyRoleInviteBody,
    _query: dto.SendCompanyRoleInviteQuery
  ): Promise<dto.SendCompanyRoleInviteResponse> {
    return await handleError<dto.SendCompanyRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite"
    );
  }

  async sendRepositoryRoleInvite(
    params: dto.SendRepositoryRoleInviteParams,
    body: dto.SendRepositoryRoleInviteBody,
    _query: dto.SendRepositoryRoleInviteQuery
  ): Promise<dto.SendRepositoryRoleInviteResponse> {
    return await handleError<dto.SendRepositoryRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/repository/admin-invite`, body, { withCredentials: true }),
      "sendRepositoryAdminInvite"
    );
  }

  async createManualInvoice(
    body: dto.CreateManualInvoiceBody,
    _query: dto.CreateManualInvoiceQuery
  ): Promise<dto.CreateManualInvoiceResponse> {
    return await handleError<dto.CreateManualInvoiceResponse>(
      () => this.api.post(`${config.api.url}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice"
    );
  }

  async createCampaignProductAndPrice(
    params: dto.CreateCampaignProductAndPriceParams,
    body: dto.CreateCampaignProductAndPriceBody,
    _query: dto.CreateCampaignProductAndPriceQuery
  ): Promise<dto.CreateCampaignProductAndPriceResponse> {
    return await handleError<dto.CreateCampaignProductAndPriceResponse>(
      () =>
        this.api.post(
          `${config.api.url}/admin/${projectPath(params.owner, params.repo)}/stripe/product-and-price`,
          body,
          { withCredentials: true }
        ),
      "createCampaignProductAndPrice"
    );
  }

  async createPlanProductAndPrice(
    params: dto.CreatePlanProductAndPriceParams,
    body: dto.CreatePlanProductAndPriceBody,
    _query: dto.CreatePlanProductAndPriceQuery
  ): Promise<dto.CreatePlanProductAndPriceResponse> {
    return await handleError<dto.CreatePlanProductAndPriceResponse>(
      () => this.api.post(`${config.api.url}/admin/plan/product-and-price`, body, { withCredentials: true }),
      "createPlanProductAndPrice"
    );
  }

  async createProject(
    params: dto.CreateProjectParams,
    body: dto.CreateProjectBody,
    _query: dto.CreateProjectQuery
  ): Promise<dto.CreateProjectResponse> {
    return await handleError<dto.CreateProjectResponse>(
      () =>
        this.api.post(`${config.api.url}/admin/projects/${projectPath(params.owner, params.repo)}`, body, {
          withCredentials: true,
        }),
      "createProject"
    );
  }
}
