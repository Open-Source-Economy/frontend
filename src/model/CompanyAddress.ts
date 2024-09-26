import { ValidationError, Validator } from "./utils";

export class CompanyAddressId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class CompanyAddress {
  id: CompanyAddressId;
  companyName: string | null;
  streetAddress1: string | null;
  streetAddress2: string | null;
  city: string | null;
  stateProvince: string | null;
  postalCode: string | null;
  country: string | null;

  constructor(
    id: CompanyAddressId,
    companyName: string | null = null,
    streetAddress1: string | null = null,
    streetAddress2: string | null = null,
    city: string | null = null,
    stateProvince: string | null = null,
    postalCode: string | null = null,
    country: string | null = null,
  ) {
    this.id = id;
    this.companyName = companyName;
    this.streetAddress1 = streetAddress1;
    this.streetAddress2 = streetAddress2;
    this.city = city;
    this.stateProvince = stateProvince;
    this.postalCode = postalCode;
    this.country = country;
  }

  static fromBackend(row: any): CompanyAddress | ValidationError {
    const validator = new Validator(row);
    validator.requiredNumber("id");
    validator.optionalString("company_name");
    validator.optionalString("street_address_1");
    validator.optionalString("street_address_2");
    validator.optionalString("city");
    validator.optionalString("state_province");
    validator.optionalString("postal_code");
    validator.optionalString("country");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new CompanyAddress(
      new CompanyAddressId(row.id),
      row.company_name ?? null,
      row.street_address_1 ?? null,
      row.street_address_2 ?? null,
      row.city ?? null,
      row.state_province ?? null,
      row.postal_code ?? null,
      row.country ?? null,
    );
  }
}
