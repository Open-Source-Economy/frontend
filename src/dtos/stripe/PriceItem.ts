import { StripePriceId } from "src/model/stripe/StripePrice";

export interface PriceItem {
  priceId: StripePriceId;
  quantity: number;
}
