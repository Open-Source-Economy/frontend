import { StripeCustomerId } from "src/model";
import { PriceItem } from "./index";

export interface CreatePaymentIntentBody {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}
