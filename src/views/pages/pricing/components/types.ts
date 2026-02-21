import React from "react";
import { PlanProductType } from "@open-source-economy/api-types";

export interface Feature {
  text: string;
  included: boolean;
  isNew?: boolean;
  hasInfo?: boolean;
  infoText?: string;
  infoDescription?: string;
  infoLink?: {
    text: string;
    href: string;
  };
}

export interface FeatureSection {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export interface PlanOption {
  id: PlanProductType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  monthlyPrice: number;
  annualPrice: number;
  sections: FeatureSection[];
  highlighted?: boolean;
  previousPlanName?: string;
}
