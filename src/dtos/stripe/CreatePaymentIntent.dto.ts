import { StripeCustomerId } from "../../model";
import { PriceItem } from "./index";

export interface CreatePaymentIntentBody {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}
