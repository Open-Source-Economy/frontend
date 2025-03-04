import { ReactNode } from "react";

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
