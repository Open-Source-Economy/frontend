import { UserId } from "./user";
import { AddressId } from "./Address";
import { ValidationError, Validator } from "./utils";

export class CompanyId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  toString(): string {
    return this.id.toString();
  }
}

export class Company {
  id: CompanyId;
  taxId: string | null;
  name: string | null;
  contactPersonId: UserId | null;
  addressId: AddressId | null;

  constructor(id: CompanyId, taxId: string | null, name: string | null, contactPersonId: UserId | null = null, addressId: AddressId | null = null) {
    this.id = id;
    this.taxId = taxId;
    this.name = name;
    this.contactPersonId = contactPersonId;
    this.addressId = addressId;
  }

  static fromBackend(row: any): Company | ValidationError {
    const validator = new Validator(row);
    validator.requiredNumber("id");
    validator.optionalString("tax_id");
    validator.optionalString("name");
    validator.optionalNumber("contact_person_id");
    validator.optionalNumber("address_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Company(
      new CompanyId(row.id),
      row.tax_id,
      row.name,
      row.contact_person_id ? new UserId(row.contact_person_id) : null,
      row.address_id ? new AddressId(row.address_id) : null,
    );
  }
}
