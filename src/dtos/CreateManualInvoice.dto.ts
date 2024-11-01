import { CompanyId, UserId } from "../model";

export interface CreateManualInvoiceBodyParams {
  number: number;
  companyId?: CompanyId;
  userId?: UserId;
  paid: boolean;
  dowAmount: number;
}

export interface CreateManualInvoiceQueryParams {}

export interface CreateManualInvoiceResponse {}
