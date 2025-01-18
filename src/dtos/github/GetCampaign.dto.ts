import { Currency, PriceType, ProductType } from "../../model";
import { Price } from "../stripe";

export interface GetCampaignParams {
  owner: string;
  repo: string;
}

export interface GetCampaignResponse {
  raisedAmount: Record<Currency, number>; // in cents, in the currency of the price
  targetAmount: Record<Currency, number>; // in cents, in the currency of the price
  numberOfBackers?: number;
  numberOfDaysLeft?: number;
  prices: Record<PriceType, Record<Currency, Record<ProductType, Price[]>>>;
}

export interface GetCampaignBody {}

export interface GetCampaignQuery {}
