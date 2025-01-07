import { ValidationError, Validator } from "../error";
import { UserId } from "../user";
import { CompanyId } from "../Company";

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
    const id = validator.requiredString("id");
    const userId = validator.requiredString("user_id");
    const companyId = validator.optionalString("company_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeCustomer(new StripeCustomerId(id), new UserId(userId));
  }

  static fromBackend(row: any): StripeCustomer | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("stripe_id");
    const userId = validator.requiredString("user_id");
    const companyId = validator.optionalString("company_id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeCustomer(new StripeCustomerId(id), new UserId(userId), companyId ? new CompanyId(companyId) : undefined);
  }
}
