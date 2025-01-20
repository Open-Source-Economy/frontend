import { Currency, PriceType, ProductType } from "../model";
import { Price } from "./stripe";
import React, { ReactNode } from "react";

export interface GetCampaignParams {
  owner: string;
  repo?: string;
}

export interface GetCampaignResponse {
  raisedAmount: Record<Currency, number>; // in cents, in the currency of the price
  targetAmount: Record<Currency, number>; // in cents, in the currency of the price
  numberOfBackers?: number;
  numberOfDaysLeft?: number;
  prices: Record<PriceType, Record<Currency, Record<ProductType, Price[]>>>;
  description: CampaignDescription | null; // TODO: when description will come from the backend, remove null
}

export interface GetCampaignBody {}

export interface GetCampaignQuery {}

/*TODO: where to place it? */
export interface CampaignDescription {
  summary: CampaignDescription.Summary;
  aQuestion: CampaignDescription.Section;
  whyWeNeedYourHelp: CampaignDescription.Section;
  useOfFunds: CampaignDescription.Section;
  whyTrustUs: CampaignDescription.Section;
}

export namespace CampaignDescription {
  export interface Summary {
    title: string | ReactNode;
    subtitle: string | ReactNode;
    summaryType: Summary.Type;
    features?: Summary.Feature[];
  }

  export namespace Summary {
    export enum Type {
      ONE,
      TWO,
    }

    export interface Feature {
      icon: React.ReactNode;
      heading: string;
      text: string;
    }
  }

  export interface Section {
    paragraph1?: string | ReactNode;
    items?: Item[];
    paragraph2?: string | ReactNode;
  }

  export interface Item {
    text: string | ReactNode;
  }
}
