import { PriceItem } from "./index";
import Stripe from "stripe";

export interface CreateSubscriptionParams {}

export interface CreateSubscriptionResponse {
  subscription: Stripe.Subscription;
}

export interface CreateSubscriptionBody {
  priceItems: PriceItem[];
  countryCode: string | null;
}

export interface CreateSubscriptionQuery {}
