import { AddressId, CompanyId } from "../model";

export interface CreateCompanyBodyParams {
  taxId: string | null;
  name: string;
  addressId: AddressId | null;
}

export interface CreateCompanyQueryParams {}

export interface CreateCompanyResponse {
  createdCompanyId: CompanyId;
}
