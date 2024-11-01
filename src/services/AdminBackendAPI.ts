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
} from "src/dtos";
import { API_URL, handleError } from "src/services/index";
import axios from "axios";
import { ApiError } from "src/ultils/error/ApiError";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPIImpl();
}

export interface AdminBackendAPI {
  createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError>;

  createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError>;

  sendCompanyAdminInvite(body: SendCompanyAdminInviteBody, query: SendCompanyAdminInviteQuery): Promise<SendCompanyAdminInviteResponse | ApiError>;

  createManualInvoice(body: CreateManualInvoiceBody, query: CreateManualInvoiceQuery): Promise<CreateManualInvoiceResponse | ApiError>;
}

class AdminBackendAPIImpl implements AdminBackendAPI {
  async createAddress(body: CreateAddressBody, query: CreateAddressQuery): Promise<CreateAddressResponse | ApiError> {
    return await handleError<CreateAddressResponse>(() => axios.post(`${API_URL}/admin/address`, body, { withCredentials: true }), "createAddress");
  }

  async createCompany(body: CreateCompanyBody, query: CreateCompanyQuery): Promise<CreateCompanyResponse | ApiError> {
    return await handleError<CreateCompanyResponse>(() => axios.post(`${API_URL}/admin/company`, body, { withCredentials: true }), "createCompany");
  }

  async sendCompanyAdminInvite(body: SendCompanyAdminInviteBody, query: SendCompanyAdminInviteQuery): Promise<SendCompanyAdminInviteResponse | ApiError> {
    return await handleError<SendCompanyAdminInviteResponse>(
      () => axios.post(`${API_URL}/admin/company/admin-invite`, body, { withCredentials: true }),
      "sendCompanyAdminInvite",
    );
  }

  async createManualInvoice(body: CreateManualInvoiceBody, query: CreateManualInvoiceQuery): Promise<CreateManualInvoiceResponse | ApiError> {
    return await handleError<CreateManualInvoiceResponse>(
      () => axios.post(`${API_URL}/admin/company/create-manual-invoice`, body, { withCredentials: true }),
      "createManualInvoice",
    );
  }
}
