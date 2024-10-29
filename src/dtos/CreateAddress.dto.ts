import { AddressId } from "../model";

export interface CreateAddressBodyParams {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface CreateAddressQueryParams {}

export interface CreateAddressResponse {
  createdAddressId: AddressId;
}
