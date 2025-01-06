import { PriceItem } from "./index";
import Stripe from "stripe";

export interface CheckoutParams {}

export interface CheckoutResponse {}

export interface CheckoutBody {
  mode: Stripe.Checkout.SessionCreateParams.Mode;
  priceItems: PriceItem[];
  countryCode: string | null;

  // base URL for the frontend (no parameters, no "?" nor "/" at the end)
  successUrl: string;
  // base URL for the frontend (no parameters, no "?" nor "/" at the end)
  cancelUrl: string;
}

export interface CheckoutQuery {}
