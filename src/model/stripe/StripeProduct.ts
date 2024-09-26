import { ValidationError, Validator } from "../utils";

export class StripeProductId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromJson(json: any): StripeProductId | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeProductId(json.id);
  }

  toString(): string {
    return this.id;
  }
}

export class StripeProduct {
  stripeId: StripeProductId;
  unit: string;
  unitAmount: number; // TODO: should be an integer

  constructor(stripeId: StripeProductId, unit: string, unitAmount: number) {
    this.stripeId = stripeId;
    this.unit = unit;
    this.unitAmount = unitAmount;
  }

  // Method to create a StripeProduct from a JSON response from the Stripe API
  static fromStripeApi(json: any): StripeProduct | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");
    validator.requiredString("unit");
    validator.requiredNumber("unit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeProduct(new StripeProductId(json.id), json.unit, json.unit_amount);
  }

  // Method to create a StripeProduct from a database row
  static fromBackend(row: any): StripeProduct | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("stripe_id");
    validator.requiredString("unit");
    validator.requiredNumber("unit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeProduct(new StripeProductId(row.stripe_id), row.unit, row.unit_amount);
  }
}
