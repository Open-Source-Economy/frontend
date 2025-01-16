import { ValidationError, Validator } from "../error";
import { AddressId } from "../Address";

export class StripeCustomerId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromJson(json: any): StripeCustomerId | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeCustomerId(json.id);
  }

  toString(): string {
    return this.id;
  }
}

export class StripeCustomer {
  stripeId: StripeCustomerId;
  currency?: string;
  email?: string;
  name?: string;
  phone?: string;
  preferredLocales?: string[];
  addressId: AddressId | null;

  constructor(
    stripeId: StripeCustomerId,
    currency?: string,
    email?: string,
    name?: string,
    phone?: string,
    preferredLocales?: string[],
    addressId: AddressId | null = null,
  ) {
    this.stripeId = stripeId;
    this.currency = currency;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.preferredLocales = preferredLocales;
    this.addressId = addressId;
  }

  static fromStripeApi(apiResponse: any): StripeCustomer | ValidationError {
    const validator = new Validator(apiResponse);

    const stripeId = validator.requiredString("id");
    const currency = validator.optionalString("currency");
    const email = validator.optionalString("email");
    const name = validator.optionalString("name");
    const phone = validator.optionalString("phone");
    const preferredLocales = validator.optionalArray("preferred_locales", "string");
    const addressId = validator.optionalString("address_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeCustomer(new StripeCustomerId(stripeId), currency, email, name, phone, preferredLocales, addressId ? new AddressId(addressId) : null);
  }

  static fromBackend(row: any): StripeCustomer | ValidationError {
    const validator = new Validator(row);

    const stripeId = validator.requiredString("stripe_id");
    const currency = validator.optionalString("currency");
    const email = validator.optionalString("email");
    const name = validator.optionalString("name");
    const phone = validator.optionalString("phone");
    const preferredLocales: string[] = validator.optionalArray("preferred_locales", "string");
    const addressId = validator.optionalString("address_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeCustomer(new StripeCustomerId(stripeId), currency, email, name, phone, preferredLocales, addressId ? new AddressId(addressId) : null);
  }
}
