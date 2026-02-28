import { AxiosInstance } from "axios";
import * as dto from "@open-source-economy/api-types";
import { handleError, projectPath } from "./apiClient";
import { config } from "src/utils";

// TODO: re-add when available in api-types
export interface CreateAddressBody {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

// TODO: re-add when available in api-types
export type CreateAddressQuery = Record<string, never>;

// TODO: re-add when available in api-types
export interface CreateAddressResponse {
  address: { id: string };
}

// TODO: re-add when available in api-types
export interface CreateCompanyBody {
  name: string;
  taxId?: string;
  addressId?: string;
}

// TODO: re-add when available in api-types
export type CreateCompanyQuery = Record<string, never>;

// TODO: re-add when available in api-types
export interface CreateCompanyResponse {
  company: { id: string; name: string };
}

// TODO: re-add when available in api-types
export type SendCompanyRoleInviteParams = Record<string, never>;

// TODO: re-add when available in api-types
export type SendCompanyRoleInviteBody = Record<string, string>;

// TODO: re-add when available in api-types
export type SendCompanyRoleInviteQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type SendCompanyRoleInviteResponse = Record<string, unknown>;

// TODO: re-add when available in api-types
export type SendRepositoryRoleInviteParams = Record<string, never>;

// TODO: re-add when available in api-types
export type SendRepositoryRoleInviteBody = Record<string, string>;

// TODO: re-add when available in api-types
export type SendRepositoryRoleInviteQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type SendRepositoryRoleInviteResponse = Record<string, unknown>;

// TODO: re-add when available in api-types
export interface CreateCampaignProductAndPriceParams {
  owner: string;
  repo?: string;
}

// TODO: re-add when available in api-types
export type CreateCampaignProductAndPriceBody = Record<string, unknown>;

// TODO: re-add when available in api-types
export type CreateCampaignProductAndPriceQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type CreateCampaignProductAndPriceResponse = Record<string, unknown>;

// TODO: re-add when available in api-types
export type CreateManualInvoiceBody = Record<string, unknown>;

// TODO: re-add when available in api-types
export type CreateManualInvoiceQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type CreateManualInvoiceResponse = Record<string, unknown>;

// TODO: re-add when available in api-types
export interface CreatePlanProductAndPriceParams {
  owner?: string;
}

// TODO: re-add when available in api-types
export type CreatePlanProductAndPriceBody = Record<string, unknown>;

// TODO: re-add when available in api-types
export type CreatePlanProductAndPriceQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type CreatePlanProductAndPriceResponse = Record<string, unknown>;

// TODO: re-add when available in api-types
export interface CreateProjectParams {
  owner: string;
  repo?: string;
}

// TODO: re-add when available in api-types
export type CreateProjectBody = Record<string, unknown>;

// TODO: re-add when available in api-types
export type CreateProjectQuery = Record<string, never>;

// TODO: re-add when available in api-types
export type CreateProjectResponse = Record<string, unknown>;

// getAdminBackendAPI factory is in src/services/getAPI.ts

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
  createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse>;
  createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse>;
  sendCompanyRoleInvite(
    params: SendCompanyRoleInviteParams,
    body: SendCompanyRoleInviteBody,
    query: SendCompanyRoleInviteQuery
  ): Promise<SendCompanyRoleInviteResponse>;
  sendRepositoryRoleInvite(
    params: SendRepositoryRoleInviteParams,
    body: SendRepositoryRoleInviteBody,
    query: SendRepositoryRoleInviteQuery
  ): Promise<SendRepositoryRoleInviteResponse>;
  createCampaignProductAndPrice(
    params: CreateCampaignProductAndPriceParams,
    body: CreateCampaignProductAndPriceBody,
    query: CreateCampaignProductAndPriceQuery
  ): Promise<CreateCampaignProductAndPriceResponse>;
  createManualInvoice(
    body: CreateManualInvoiceBody,
    query: CreateManualInvoiceQuery
  ): Promise<CreateManualInvoiceResponse>;
  createPlanProductAndPrice(
    params: CreatePlanProductAndPriceParams,
    body: CreatePlanProductAndPriceBody,
    query: CreatePlanProductAndPriceQuery
  ): Promise<CreatePlanProductAndPriceResponse>;
  createProject(
    params: CreateProjectParams,
    body: CreateProjectBody,
    query: CreateProjectQuery
  ): Promise<CreateProjectResponse>;
}

export class AdminBackendAPIImpl implements AdminBackendAPI {
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
    return await handleError<dto.SyncProjectResponse>(
      () =>
        this.api.post(
          `${config.api.url}/github/projects/${params.owner}/sync`,
          {},
          { withCredentials: true, params: query }
        ),
      "syncProject"
    );
  }

  async createAddress(body: CreateAddressBody, _query: CreateAddressQuery): Promise<CreateAddressResponse> {
    return await handleError<CreateAddressResponse>(
      () => this.api.post(`${config.api.url}/admin/address`, body, { withCredentials: true }),
      "createAddress"
    );
  }

  async createCompany(body: CreateCompanyBody, _query: CreateCompanyQuery): Promise<CreateCompanyResponse> {
    return await handleError<CreateCompanyResponse>(
      () => this.api.post(`${config.api.url}/admin/company`, body, { withCredentials: true }),
      "createCompany"
    );
  }

  async sendCompanyRoleInvite(
    params: SendCompanyRoleInviteParams,
    body: SendCompanyRoleInviteBody,
    _query: SendCompanyRoleInviteQuery
  ): Promise<SendCompanyRoleInviteResponse> {
    return await handleError<SendCompanyRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite"
    );
  }

  async sendRepositoryRoleInvite(
    params: SendRepositoryRoleInviteParams,
    body: SendRepositoryRoleInviteBody,
    _query: SendRepositoryRoleInviteQuery
  ): Promise<SendRepositoryRoleInviteResponse> {
    return await handleError<SendRepositoryRoleInviteResponse>(
      () => this.api.post(`${config.api.url}/admin/repository/admin-invite`, body, { withCredentials: true }),
      "sendRepositoryAdminInvite"
    );
  }

  async createManualInvoice(
    body: CreateManualInvoiceBody,
    _query: CreateManualInvoiceQuery
  ): Promise<CreateManualInvoiceResponse> {
    return await handleError<CreateManualInvoiceResponse>(
      () => this.api.post(`${config.api.url}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice"
    );
  }

  async createCampaignProductAndPrice(
    params: CreateCampaignProductAndPriceParams,
    body: CreateCampaignProductAndPriceBody,
    _query: CreateCampaignProductAndPriceQuery
  ): Promise<CreateCampaignProductAndPriceResponse> {
    return await handleError<CreateCampaignProductAndPriceResponse>(
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
    params: CreatePlanProductAndPriceParams,
    body: CreatePlanProductAndPriceBody,
    _query: CreatePlanProductAndPriceQuery
  ): Promise<CreatePlanProductAndPriceResponse> {
    return await handleError<CreatePlanProductAndPriceResponse>(
      () => this.api.post(`${config.api.url}/admin/plan/product-and-price`, body, { withCredentials: true }),
      "createPlanProductAndPrice"
    );
  }

  async createProject(
    params: CreateProjectParams,
    body: CreateProjectBody,
    _query: CreateProjectQuery
  ): Promise<CreateProjectResponse> {
    return await handleError<CreateProjectResponse>(
      () =>
        this.api.post(`${config.api.url}/admin/projects/${projectPath(params.owner, params.repo)}`, body, {
          withCredentials: true,
        }),
      "createProject"
    );
  }
}
