import { ValidationError, Validator } from "../error";
import { StripeProductId } from "./StripeProduct";
import { Currency } from "./Currency";

export enum PriceType {
  ANNUALLY = "annually",
  MONTHLY = "monthly",
  ONE_TIME = "one_time",
}

export enum CampaignPriceType {
  MONTHLY = PriceType.MONTHLY,
  ONE_TIME = PriceType.ONE_TIME,
}

export enum PlanPriceType {
  MONTHLY = PriceType.MONTHLY,
  ANNUALLY = PriceType.ANNUALLY,
}

export class StripePriceId {
  readonly id: string;

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
}

export class StripePrice {
  stripeId: StripePriceId;
  productId: StripeProductId;
  unitAmount: number; // in cents
  currency: Currency;
  active: boolean;
  type: PriceType;

  constructor(stripeId: StripePriceId, productId: StripeProductId, unitAmount: number, currency: Currency, active: boolean, type: PriceType) {
    this.stripeId = stripeId;
    this.productId = productId;
    this.unitAmount = unitAmount;
    this.currency = currency;
    this.active = active;
    this.type = type;
  }

  /**
   * Parse a StripePrice from an external Stripe API JSON response if needed.
   * Adjust field mappings as needed based on Stripe's actual API shape.
   */
  static fromStripeApi(json: any): StripePrice | ValidationError {
    const validator = new Validator(json);

    const id = validator.requiredString("id");
    const product = validator.requiredString("product"); // The "product" field in Stripe's price object
    const unitAmount = validator.requiredNumber("unit_amount");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const active = validator.requiredBoolean("active");
    let type = PriceType.ONE_TIME;
    if (json.recurring && json.recurring.interval === "month") {
      type = PriceType.MONTHLY;
    } else if (json.recurring && json.recurring.interval === "year") {
      type = PriceType.ANNUALLY;
    }
    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripePrice(new StripePriceId(id), new StripeProductId(product), unitAmount, currency, active, type);
  }

  /**
   * Parse a StripePrice from a database row.
   */
  static fromBackend(row: any): StripePrice | ValidationError {
    const validator = new Validator(row);

    const id = validator.requiredString("stripe_id");
    const productId = validator.requiredString("product_id"); // The "product" field in Stripe's price object
    const unitAmount = validator.requiredNumber("unit_amount");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const active = validator.requiredBoolean("active");
    const type = validator.requiredEnum("type", Object.values(PriceType) as PriceType[]);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripePrice(new StripePriceId(id), new StripeProductId(productId), unitAmount, currency, active, type);
  }
}
