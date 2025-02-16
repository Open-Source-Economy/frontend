import { ValidationError, Validator } from "../error";
import { OwnerId, ProjectId, RepositoryId } from "../github";

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
}

export enum ProductType {
  credit = "credit",
  donation = "donation",
}

export class StripeProduct {
  stripeId: StripeProductId;
  projectId: ProjectId | null;
  type: ProductType;

  constructor(stripeId: StripeProductId, projectId: ProjectId | null, type: ProductType) {
    this.stripeId = stripeId;
    this.projectId = projectId;
    this.type = type;
  }

  // Method to create a StripeProduct from a database row
  static fromBackend(row: any): StripeProduct | ValidationError {
    const validator = new Validator(row);
    const stripeId = validator.requiredString("stripe_id");
    const type = validator.requiredEnum("type", Object.values(ProductType) as ProductType[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    let projectId: ProjectId | null | ValidationError = null;
    if (row.github_repository_name) {
      projectId = RepositoryId.fromBackendForeignKey(row);
    } else {
      projectId = OwnerId.fromBackendForeignKey(row);
    }

    // TODO: Implement the optionality properly
    if (projectId instanceof ValidationError) {
      projectId = null;
    }

    return new StripeProduct(new StripeProductId(stripeId), projectId, type);
  }
}
