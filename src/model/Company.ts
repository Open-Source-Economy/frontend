import { AddressId } from "./Address";
import { ValidationError, Validator } from "./error";

export class CompanyId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid.toString();
  }
}

export class Company {
  id: CompanyId;
  taxId: string | null;
  name: string;
  addressId: AddressId | null;

  constructor(id: CompanyId, taxId: string | null, name: string, addressId: AddressId | null = null) {
    this.id = id;
    this.taxId = taxId;
    this.name = name;
    this.addressId = addressId;
  }

  static fromBackend(row: any): Company | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const taxId = validator.optionalString("tax_id");
    const name = validator.requiredString("name");
    const addressId = validator.optionalString("address_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Company(new CompanyId(id), taxId ?? null, name, addressId ? new AddressId(addressId) : null);
  }
}
