import { CompanyId, UserId } from "../model";

export interface CreateManualInvoiceBody {
  number: number;
  companyId?: CompanyId;
  userId?: UserId;
  paid: boolean;
  milliDowAmount: number;
}

export interface CreateManualInvoiceQuery {}

export interface CreateManualInvoiceResponse {}
