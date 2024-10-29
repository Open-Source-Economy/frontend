import { StripeCustomerId } from "../../model";
import { PriceItem } from "./index";

export interface CreatePaymentIntentBodyParams {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}
