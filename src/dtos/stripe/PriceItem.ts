import { StripePriceId } from "../../model/stripe/StripePrice";

export interface PriceItem {
  priceId: StripePriceId;
  quantity: number;
}
