import { ValidationError, Validator } from "../error";
import { OwnerId, ProjectId, RepositoryId } from "../github";
import { ApiError } from "../error/ApiError";
import { StatusCodes } from "http-status-codes";

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

// do not change the naming, used in the database
export enum ProductType {
  CREDIT = "credit",
  DONATION = "donation",
  INDIVIDUAL_PLAN = "individual_plan",
  START_UP_PLAN = "start_up_plan",
  SCALE_UP_PLAN = "scale_up_plan",
  ENTERPRISE_PLAN = "enterprise_plan",
}

// to enable match exhaustiveness
export enum CampaignProductType {
  CREDIT = ProductType.CREDIT,
  DONATION = ProductType.DONATION,
}

export enum PlanProductType {
  INDIVIDUAL_PLAN = ProductType.INDIVIDUAL_PLAN,
  START_UP_PLAN = ProductType.START_UP_PLAN,
  SCALE_UP_PLAN = ProductType.SCALE_UP_PLAN,
  ENTERPRISE_PLAN = ProductType.ENTERPRISE_PLAN,
}

export const productTypeUtils = {
  toProductType: (campaignProductType: CampaignProductType): ProductType => {
    switch (campaignProductType) {
      case CampaignProductType.CREDIT:
        return ProductType.CREDIT;
      case CampaignProductType.DONATION:
        return ProductType.DONATION;
      default:
        throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unknown campaign product type: ${campaignProductType}`);
    }
  },

  toCampaignProductType: (productType: ProductType): CampaignProductType => {
    switch (productType) {
      case ProductType.CREDIT:
        return CampaignProductType.CREDIT;
      case ProductType.DONATION:
        return CampaignProductType.DONATION;
      default:
        throw new Error(`Product type ${productType} cannot be used in campaigns`);
    }
  },
};

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
