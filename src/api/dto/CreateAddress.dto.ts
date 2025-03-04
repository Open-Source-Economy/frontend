import { AddressId } from "../model";

export interface CreateAddressParams {}

export interface CreateAddressBody {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface CreateAddressQuery {}

export interface CreateAddressResponse {
  createdAddressId: AddressId;
}
