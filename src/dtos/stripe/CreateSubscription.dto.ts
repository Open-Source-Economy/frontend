import { StripeCustomerId } from "src/model";
import { PriceItem } from "./index";

export interface CreateSubscriptionBody {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}
