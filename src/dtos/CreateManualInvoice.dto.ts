import { CompanyId, UserId } from "../model";
import Decimal from "decimal.js";

export interface CreateManualInvoiceBody {
  number: number;
  companyId?: CompanyId;
  userId?: UserId;
  paid: boolean;
  dowAmount: Decimal;
}

export interface CreateManualInvoiceQuery {}

export interface CreateManualInvoiceResponse {}
