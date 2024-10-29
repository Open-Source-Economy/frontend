import { StripeCustomerId } from "../../model";
import { PriceItem } from "./index";

export interface CreateSubscriptionBodyParams {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}
