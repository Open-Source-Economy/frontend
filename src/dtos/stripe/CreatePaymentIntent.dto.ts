import { StripeCustomerId } from "src/model";
import { PriceItem } from "./index";
import Stripe from "stripe";

export interface CreatePaymentIntentParams {}

export interface CreatePaymentIntentResponse {
  paymentIntent: Stripe.PaymentIntent;
}

export interface CreatePaymentIntentBody {
  stripeCustomerId: StripeCustomerId;
  priceItems: PriceItem[];
}

export interface CreatePaymentIntentQuery {}
