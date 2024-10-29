import { ValidationError, Validator } from "../error";

export class StripePriceId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromJson(json: any): StripePriceId | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripePriceId(json.id);
  }

  toString(): string {
    return this.id;
  }
}

export class StripePrice {
  stripeId: StripePriceId;
  currency: string;
  /** The unit amount in cents to be charged */
  unitAmount: number; // TODO: should be an integer

  constructor(stripeId: StripePriceId, currency: string, unitAmount: number) {
    this.stripeId = stripeId;
    this.currency = currency;
    this.unitAmount = unitAmount;
  }

  // Method to create a StripePrice from a JSON response from the Stripe API
  static fromStripeApi(json: any): StripePrice | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");
    validator.requiredString("currency");
    validator.requiredNumber("unit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripePrice(new StripePriceId(json.id), json.currency, json.unit_amount);
  }

  // Method to create a StripePrice from a database row
  static fromBackend(row: any): StripePrice | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("stripe_id");
    validator.requiredString("currency");
    validator.requiredNumber("unit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripePrice(new StripePriceId(row.stripe_id), row.currency, row.unit_amount);
  }
}
