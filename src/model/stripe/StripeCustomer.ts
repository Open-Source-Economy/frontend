import { ValidationError, Validator } from "../utils";

import { CompanyId } from "../Company";
import { UserId } from "../User";

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
  userId: UserId;
  companyId?: CompanyId;

  constructor(stripeId: StripeCustomerId, userId: UserId, companyId?: CompanyId) {
    this.stripeId = stripeId;
    this.userId = userId;
    this.companyId = companyId;
  }

  static fromStripeApi(json: any): StripeCustomer | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");
    validator.requiredNumber("user_id");
    validator.optionalNumber("company_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const stripeId = StripeCustomerId.fromJson({ id: json.id });
    if (stripeId instanceof ValidationError) {
      return stripeId;
    }

    const userId = new UserId(json.user_id);
    const companyId = json.company_id ? new CompanyId(json.company_id) : undefined;

    return new StripeCustomer(stripeId, userId, companyId);
  }

  static fromBackend(row: any): StripeCustomer | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("stripe_id");
    validator.requiredNumber("user_id");
    validator.optionalNumber("company_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const stripeId = StripeCustomerId.fromJson({ id: row.stripe_id });
    if (stripeId instanceof ValidationError) {
      return stripeId;
    }

    const userId = new UserId(row.user_id);
    const companyId = row.company_id ? new CompanyId(row.company_id) : undefined;

    return new StripeCustomer(stripeId, userId, companyId);
  }
}
