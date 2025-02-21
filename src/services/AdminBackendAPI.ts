import {
  CreateAddressBody,
  CreateAddressQuery,
  CreateAddressResponse,
  CreateCompanyBody,
  CreateCompanyQuery,
  CreateCompanyResponse,
  CreateManualInvoiceBody,
  CreateManualInvoiceQuery,
  CreateManualInvoiceResponse,
  CreateProductAndPriceBody,
  CreateProductAndPriceParams,
  CreateProductAndPriceQuery,
  CreateProductAndPriceResponse,
  SendCompanyRoleInviteBody,
  SendCompanyRoleInviteParams,
  SendCompanyRoleInviteQuery,
  SendCompanyRoleInviteResponse,
  SendRepositoryRoleInviteBody,
  SendRepositoryRoleInviteParams,
  SendRepositoryRoleInviteQuery,
  SendRepositoryRoleInviteResponse,
} from "src/dtos";
import { handleError, projectPath } from "./index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl();
}

export interface AdminBackendAPI {
  createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError>;

  createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError>;

  sendCompanyRoleInvite(
    params: SendCompanyRoleInviteParams,
    body: SendCompanyRoleInviteBody,
    query: SendCompanyRoleInviteQuery,
  ): Promise<SendCompanyRoleInviteResponse | ApiError>;

  sendRepositoryRoleInvite(
    params: SendRepositoryRoleInviteParams,
    body: SendRepositoryRoleInviteBody,
    query: SendRepositoryRoleInviteQuery,
  ): Promise<SendRepositoryRoleInviteResponse | ApiError>;

  createManualInvoice(body: CreateManualInvoiceBody, query: CreateManualInvoiceQuery): Promise<CreateManualInvoiceResponse | ApiError>;

  createProductAndPrice(
    body: CreateProductAndPriceBody,
    params: CreateProductAndPriceParams,
    query: CreateProductAndPriceQuery,
  ): Promise<CreateProductAndPriceResponse | ApiError>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  async createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError> {
    return await handleError<CreateAddressResponse>(() => axios.post(`${config.api.url}/admin/address`, body, { withCredentials: true }), "createAddress");
  }

  async createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError> {
    return await handleError<CreateCompanyResponse>(() => axios.post(`${config.api.url}/admin/company`, body, { withCredentials: true }), "createCompany");
  }

  async sendCompanyRoleInvite(
    params: SendCompanyRoleInviteParams,
    body: SendCompanyRoleInviteBody,
    query: SendCompanyRoleInviteQuery,
  ): Promise<SendCompanyRoleInviteResponse | ApiError> {
    return await handleError<SendCompanyRoleInviteResponse>(
      () => axios.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async sendRepositoryRoleInvite(
    params: SendRepositoryRoleInviteParams,
    body: SendRepositoryRoleInviteBody,
    query: SendRepositoryRoleInviteQuery,
  ): Promise<SendRepositoryRoleInviteResponse | ApiError> {
    return await handleError<SendRepositoryRoleInviteResponse>(
      () => axios.post(`${config.api.url}/admin/repository/admin-invite`, body, { withCredentials: true }),
      "sendRepositoryAdminInvite",
    );
  }

  async createManualInvoice(body: CreateManualInvoiceBody, query: CreateManualInvoiceQuery): Promise<CreateManualInvoiceResponse | ApiError> {
    return await handleError<CreateManualInvoiceResponse>(
      () => axios.post(`${config.api.url}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice",
    );
  }

  async createProductAndPrice(
    body: CreateProductAndPriceBody,
    params: CreateProductAndPriceParams,
    query: CreateProductAndPriceQuery,
  ): Promise<CreateProductAndPriceResponse | ApiError> {
    return await handleError<CreateProductAndPriceResponse>(
      () => axios.post(`${config.api.url}/admin/${projectPath(params.owner, params.repo)}/stripe/product-and-price`, body, { withCredentials: true }),
      "createProductAndPrice",
    );
  }
}
