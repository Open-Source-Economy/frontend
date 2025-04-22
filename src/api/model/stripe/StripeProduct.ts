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

// to enable match exhaustiveness
export enum PlanProductType {
  INDIVIDUAL_PLAN = ProductType.INDIVIDUAL_PLAN,
  START_UP_PLAN = ProductType.START_UP_PLAN,
  SCALE_UP_PLAN = ProductType.SCALE_UP_PLAN,
  ENTERPRISE_PLAN = ProductType.ENTERPRISE_PLAN,
}

export const productTypeUtils = {
  toProductType: (productType: CampaignProductType | PlanProductType): ProductType => {
    switch (productType) {
      case CampaignProductType.CREDIT:
        return ProductType.CREDIT;
      case CampaignProductType.DONATION:
        return ProductType.DONATION;

      case PlanProductType.INDIVIDUAL_PLAN:
        return ProductType.INDIVIDUAL_PLAN;
      case PlanProductType.START_UP_PLAN:
        return ProductType.START_UP_PLAN;
      case PlanProductType.SCALE_UP_PLAN:
        return ProductType.SCALE_UP_PLAN;
      case PlanProductType.ENTERPRISE_PLAN:
        return ProductType.ENTERPRISE_PLAN;
      default:
        throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unknown product type: ${productType}`);
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

  credits: (productType: ProductType): number => {
    switch (productType) {
      case ProductType.CREDIT:
        return 1;
      case ProductType.INDIVIDUAL_PLAN:
        return 30;
      case ProductType.START_UP_PLAN:
        return 2 * 60;
      case ProductType.SCALE_UP_PLAN:
        return 4 * 60;
      case ProductType.ENTERPRISE_PLAN:
        return 10 * 60;
      default:
        throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unknown product type: ${productType}`);
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
