import * as dto from "@open-source-economy/api-types";
import { CreatePortalSessionBody, CreatePortalSessionResponse, StripeService } from "src/services/stripe.service";

export const stripeServiceMock: StripeService = {
  async getPlans(_params, _query) {
    // Extract enum values properly, avoiding TypeScript enum peculiarities
    const planTypes = Object.keys(dto.PlanProductType)
      .filter((key) => isNaN(Number(key)))
      .map((key) => dto.PlanProductType[key as keyof typeof dto.PlanProductType]);

    const currencies = Object.values(dto.Currency).filter((value): value is dto.Currency => typeof value === "string");

    const priceTypes = Object.values(dto.PlanPriceType).filter(
      (value): value is dto.PlanPriceType => typeof value === "string"
    );

    // Define price generation strategy with more realistic values
    const getPriceAmount = (_planType: dto.PlanProductType, priceType: dto.PlanPriceType): number => {
      // Apply discount for annual pricing
      const multiplier = priceType === dto.PlanPriceType.ANNUALLY ? 0.8 * 12 : 1; // 20% discount for annual
      return Math.round(69_00 * multiplier);
    };

    // Create a type-safe StripePrice factory function
    const createPrice = (
      planType: dto.PlanProductType,
      priceType: dto.PlanPriceType,
      currency: dto.Currency
    ): dto.StripePrice => {
      const amount = getPriceAmount(planType, priceType);
      const id = `price_${planType}_${priceType}_${currency.toLowerCase()}`;

      return {
        stripeId: id as dto.StripePriceId,
        productId: planType.toString() as dto.StripeProductId,
        unitAmount: amount,
        currency: currency,
        active: true,
        type: priceType === dto.PlanPriceType.MONTHLY ? dto.PriceType.MONTHLY : dto.PriceType.ANNUALLY,
      };
    };

    // Build the plans object with proper typing
    const plans: Record<
      dto.PlanProductType,
      Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>
    > = {} as Record<dto.PlanProductType, Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>>;

    // Generate each plan
    for (const planType of planTypes) {
      const priceMappings = {} as Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>;

      for (const currency of currencies) {
        priceMappings[currency] = {} as Record<dto.PlanPriceType, dto.StripePrice>;

        for (const priceType of priceTypes) {
          priceMappings[currency][priceType] = createPrice(planType, priceType, currency);
        }
      }

      plans[planType] = priceMappings;
    }

    return { plans };
  },

  async getUserPlan(_params, _query) {
    return { productType: dto.PlanProductType.SCALE_UP_PLAN, priceType: dto.PlanPriceType.ANNUALLY };
  },

  async checkout(_params, _body, _query) {
    return { redirectUrl: "https://checkout.stripe.com/c/pay/cs_test_a1WpXh4fW6XG9J5vYyZ2M3Q4R5T6U7V8W9X0" };
  },

  async setUserPreferredCurrency(_params, _body, _query) {
    return {};
  },

  async createPortalSession(_body: CreatePortalSessionBody): Promise<CreatePortalSessionResponse> {
    return Promise.resolve({ url: "https://billing.stripe.com/p/session/test_123" });
  },
};
