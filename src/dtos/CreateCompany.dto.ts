import { AddressId, CompanyId } from "../model";

export interface CreateCompanyBody {
  taxId: string | null;
  name: string;
  addressId: AddressId | null;
}

export interface CreateCompanyQuery {}

export interface CreateCompanyResponse {
  createdCompanyId: CompanyId;
}
