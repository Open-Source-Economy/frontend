import {
  CreateAddressBodyParams,
  CreateAddressQueryParams,
  CreateAddressResponse,
  CreateCompanyBodyParams,
  CreateCompanyQueryParams,
  CreateCompanyResponse,
  CreateManualInvoiceBodyParams,
  CreateManualInvoiceQueryParams,
  CreateManualInvoiceResponse,
  SendCompanyAdminInviteBodyParams,
  SendCompanyAdminInviteQueryParams,
  SendCompanyAdminInviteResponse,
} from "src/dtos";
import { API_URL, handleError } from "src/services/index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl();
}

export interface AdminBackendAPI {
  createAddress(body: CreateAddressBodyParams, query: CreateAddressQueryParams): Promise<CreateAddressResponse | ApiError>;

  createCompany(body: CreateCompanyBodyParams, query: CreateCompanyQueryParams): Promise<CreateCompanyResponse | ApiError>;

  sendCompanyAdminInvite(body: SendCompanyAdminInviteBodyParams, query: SendCompanyAdminInviteQueryParams): Promise<SendCompanyAdminInviteResponse | ApiError>;

  createManualInvoice(body: CreateManualInvoiceBodyParams, query: CreateManualInvoiceQueryParams): Promise<CreateManualInvoiceResponse | ApiError>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  async createAddress(body: CreateAddressBodyParams, query: CreateAddressQueryParams): Promise<CreateAddressResponse | ApiError> {
    return await handleError<CreateAddressResponse>(() => axios.post(`${API_URL}/admin/address`, body, { withCredentials: true }), "createAddress");
  }

  async createCompany(body: CreateCompanyBodyParams, query: CreateCompanyQueryParams): Promise<CreateCompanyResponse | ApiError> {
    return await handleError<CreateCompanyResponse>(() => axios.post(`${API_URL}/admin/company`, body, { withCredentials: true }), "createCompany");
  }

  async sendCompanyAdminInvite(
    body: SendCompanyAdminInviteBodyParams,
    query: SendCompanyAdminInviteQueryParams,
  ): Promise<SendCompanyAdminInviteResponse | ApiError> {
    return await handleError<SendCompanyAdminInviteResponse>(
      () => axios.post(`${API_URL}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async createManualInvoice(body: CreateManualInvoiceBodyParams, query: CreateManualInvoiceQueryParams): Promise<CreateManualInvoiceResponse | ApiError> {
    return await handleError<CreateManualInvoiceResponse>(
      () => axios.post(`${API_URL}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice",
    );
  }
}
