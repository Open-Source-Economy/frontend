import { CampaignPriceType, CampaignProductType, Currency, StripePrice } from "../model";

export interface Price {
  totalAmount: number; // in cents, in the currency of the price
  quantity: number;
  label: string;
  price: StripePrice;
}

export interface GetCampaignParams {
  owner: string;
  repo?: string;
}

export interface GetCampaignResponse {
  raisedAmount: Record<Currency, number>; // in cents, in the currency of the price
  targetAmount: Record<Currency, number>; // in cents, in the currency of the price
  numberOfBackers?: number;
  numberOfDaysLeft?: number;
  prices: Record<CampaignPriceType, Record<Currency, Record<CampaignProductType, Price[]>>>;
}

export interface GetCampaignBody {}

export interface GetCampaignQuery {}
