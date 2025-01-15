import { ValidationError, Validator } from "../error";
import { RepositoryId } from "../github";

export enum ProductType {
  milliDow = "milli_dow",
  donation = "donation",
}

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
  repositoryId: RepositoryId | null;
  type: ProductType;

  constructor(stripeId: StripeProductId, repositoryId: RepositoryId | null, type: ProductType) {
    this.stripeId = stripeId;
    this.repositoryId = repositoryId;
    this.type = type;
  }

  // Method to create a StripeProduct from a database row
  static fromBackend(row: any): StripeProduct | ValidationError {
    const validator = new Validator(row);
    const stripeId = validator.requiredString("stripe_id");
    const repositoryId = RepositoryId.fromBackendForeignKey(row);

    const type = validator.requiredEnum("type", Object.values(ProductType) as ProductType[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    // TODO: Implement the optionality properly
    let repositoryIdValue: RepositoryId | null;
    if (repositoryId instanceof ValidationError) {
      repositoryIdValue = null;
    } else {
      repositoryIdValue = repositoryId;
    }

    return new StripeProduct(new StripeProductId(stripeId), repositoryIdValue, type);
  }
}
