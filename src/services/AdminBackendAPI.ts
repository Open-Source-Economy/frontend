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
  SendCompanyAdminInviteBody,
  SendCompanyAdminInviteQuery,
  SendCompanyAdminInviteResponse,
  SendRepositoryAdminInviteBody,
  SendRepositoryAdminInviteQuery,
  SendRepositoryAdminInviteResponse,
} from "src/dtos";
import { handleError } from "src/services/index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl();
}

export interface AdminBackendAPI {
  createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError>;

  createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError>;

  sendCompanyAdminInvite(body: SendCompanyAdminInviteBody, query: SendCompanyAdminInviteQuery): Promise<SendCompanyAdminInviteResponse | ApiError>;

  sendRepositoryAdminInvite(body: SendRepositoryAdminInviteBody, query: SendRepositoryAdminInviteQuery): Promise<SendRepositoryAdminInviteResponse | ApiError>;

  createManualInvoice(body: CreateManualInvoiceBody, query: CreateManualInvoiceQuery): Promise<CreateManualInvoiceResponse | ApiError>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  async createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError> {
    return await handleError<CreateAddressResponse>(() => axios.post(`${config.api.url}/admin/address`, body, { withCredentials: true }), "createAddress");
  }

  async createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError> {
    return await handleError<CreateCompanyResponse>(() => axios.post(`${config.api.url}/admin/company`, body, { withCredentials: true }), "createCompany");
  }

  async sendCompanyAdminInvite(body: SendCompanyAdminInviteBody, query: SendCompanyAdminInviteQuery): Promise<SendCompanyAdminInviteResponse | ApiError> {
    return await handleError<SendCompanyAdminInviteResponse>(
      () => axios.post(`${config.api.url}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async sendRepositoryAdminInvite(
    body: SendRepositoryAdminInviteBody,
    query: SendRepositoryAdminInviteQuery,
  ): Promise<SendRepositoryAdminInviteResponse | ApiError> {
    return await handleError<SendRepositoryAdminInviteResponse>(
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
}
