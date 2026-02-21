import React from "react";
import { Check, X } from "lucide-react";
import { InfoTooltip } from "../ui/info-tooltip";
import { Feature } from "./types";
import { FeatureItem } from "./FeatureItem";

interface FeatureListProps {
  features: Feature[];
  gap?: "normal" | "compact";
}

export function FeatureList({ features, gap = "normal" }: FeatureListProps) {
  return (
    <ul className="space-y-2 p-[0px] mt-2">
      {features.map((feature, featureIndex) => (
        <li key={featureIndex}>
          <FeatureItem text={feature.text} included={feature.included} isNew={feature.isNew} hasInfo={feature.hasInfo} infoText={feature.infoText} />
        </li>
      ))}
    </ul>
  );
}
