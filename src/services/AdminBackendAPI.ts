import * as dto from "@open-source-economy/api-types";
import { handleError, projectPath } from "./index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl();
}

export interface AdminBackendAPI {
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
  async createAddress(body: dto.CreateAddressBody, query: dto.CreateAddressQuery): Promise<dto.CreateAddressResponse | ApiError> {
    return await handleError<dto.CreateAddressResponse>(() => axios.post(`${config.api.url}/admin/address`, body, { withCredentials: true }), "createAddress");
  }

  async createCompany(body: dto.CreateCompanyBody, query: dto.CreateCompanyQuery): Promise<dto.CreateCompanyResponse | ApiError> {
    return await handleError<dto.CreateCompanyResponse>(() => axios.post(`${config.api.url}/admin/company`, body, { withCredentials: true }), "createCompany");
  }

  async sendCompanyRoleInvite(
    params: dto.SendCompanyRoleInviteParams,
    body: dto.SendCompanyRoleInviteBody,
    query: dto.SendCompanyRoleInviteQuery,
  ): Promise<dto.SendCompanyRoleInviteResponse | ApiError> {
    return await handleError<dto.SendCompanyRoleInviteResponse>(
      () => axios.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async sendRepositoryRoleInvite(
    params: dto.SendRepositoryRoleInviteParams,
    body: dto.SendRepositoryRoleInviteBody,
    query: dto.SendRepositoryRoleInviteQuery,
  ): Promise<dto.SendRepositoryRoleInviteResponse | ApiError> {
    return await handleError<dto.SendRepositoryRoleInviteResponse>(
      () => axios.post(`${config.api.url}/admin/repository/admin-invite`, body, { withCredentials: true }),
      "sendRepositoryAdminInvite",
    );
  }

  async createManualInvoice(body: dto.CreateManualInvoiceBody, query: dto.CreateManualInvoiceQuery): Promise<dto.CreateManualInvoiceResponse | ApiError> {
    return await handleError<dto.CreateManualInvoiceResponse>(
      () => axios.post(`${config.api.url}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice",
    );
  }

  async createCampaignProductAndPrice(
    params: dto.CreateCampaignProductAndPriceParams,
    body: dto.CreateCampaignProductAndPriceBody,
    query: dto.CreateCampaignProductAndPriceQuery,
  ): Promise<dto.CreateCampaignProductAndPriceResponse | ApiError> {
    return await handleError<dto.CreateCampaignProductAndPriceResponse>(
      () => axios.post(`${config.api.url}/admin/${projectPath(params.owner, params.repo)}/stripe/product-and-price`, body, { withCredentials: true }),
      "createCampaignProductAndPrice",
    );
  }

  async createPlanProductAndPrice(
    params: dto.CreatePlanProductAndPriceParams,
    body: dto.CreatePlanProductAndPriceBody,
    query: dto.CreatePlanProductAndPriceQuery,
  ): Promise<dto.CreatePlanProductAndPriceResponse | ApiError> {
    return await handleError<dto.CreatePlanProductAndPriceResponse>(
      () => axios.post(`${config.api.url}/admin/plan/product-and-price`, body, { withCredentials: true }),
      "createPlanProductAndPrice",
    );
  }

  async createProject(
    params: dto.CreateProjectParams,
    body: dto.CreateProjectBody,
    query: dto.CreateProjectQuery,
  ): Promise<dto.CreateProjectResponse | ApiError> {
    return await handleError<dto.CreateProjectResponse>(
      () => axios.post(`${config.api.url}/admin/projects/${projectPath(params.owner, params.repo)}`, body, { withCredentials: true }),
      "createProject",
    );
  }
}
