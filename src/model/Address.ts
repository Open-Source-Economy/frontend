import { ValidationError, Validator } from "./error";

export class AddressId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  toString(): string {
    return this.uuid;
  }
}

export class Address {
  id: AddressId;
  name?: string;
  /**
   * Address line 1 (e.g., street, block, PO Box, or company name).
   */
  line1?: string;
  /**
   * Address line 2 (e.g., apartment, suite, unit, or building).
   */
  line2?: string;
  /**
   * City, district, suburb, town, village, or ward.
   */
  city?: string;
  /**
   * State, county, province, prefecture, or region.
   */
  state?: string;
  /**
   * ZIP or postal code.
   */
  postalCode?: string;
  /**
   * Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string;

  constructor(id: AddressId, companyName?: string, line1?: string, line2?: string, city?: string, state?: string, postalCode?: string, country?: string) {
    this.id = id;
    this.name = companyName;
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }

  static fromBackend(row: any): Address | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const name = validator.optionalString("name");
    const line1 = validator.optionalString("line_1");
    const line2 = validator.optionalString("line_2");
    const city = validator.optionalString("city");
    const state = validator.optionalString("state");
    const postalCode = validator.optionalString("postal_code");
    const country = validator.optionalString("country");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Address(new AddressId(id), name, line1, line2, city, state, postalCode, country);
  }
}
