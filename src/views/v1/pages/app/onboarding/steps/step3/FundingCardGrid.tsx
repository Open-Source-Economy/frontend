import React from "react";
import { FundingCard } from "./FundingCard";
import { ServiceModelSteps } from "./ServiceModelSteps";
import { IncomeStreamType } from "@open-source-economy/api-types";

interface FundingCardGridProps {
  incomeStreams: IncomeStreamType[];
  onToggleChange: (option: IncomeStreamType, enabled: boolean) => Promise<void>;
  showServiceModel: boolean;
  onServiceLearnMore: () => void;
  onCloseServiceModel: () => void;
}

export function FundingCardGrid(props: FundingCardGridProps) {
  const { incomeStreams, onToggleChange, showServiceModel, onServiceLearnMore, onCloseServiceModel } = props;

  return (
    <div className="flex flex-col items-start gap-9 self-stretch">
      {/* Offer Services Card (Full Width) */}
      <FundingCard
        title="Offer Services"
        description="Define your open source offerings, your terms, your rates, and your availability."
        isEnabled={incomeStreams.includes(IncomeStreamType.SERVICES)}
        onChange={enabled => onToggleChange(IncomeStreamType.SERVICES, enabled)}
        isRecommended={true}
        hasLearnMore={true}
        onLearnMore={onServiceLearnMore}
        isFullWidth={true}
      />

      {/* Service Model Section (Expanded when Learn More is clicked) */}
      {showServiceModel && <ServiceModelSteps onClose={onCloseServiceModel} />}

      {/* Royalties and Donations Cards (Side by Side) */}
      <div className="flex items-start gap-9 self-stretch">
        <FundingCard
          title="Dependency Payouts"
          description="Earn when your project is used by other funded projects—even transitively."
          isEnabled={incomeStreams.includes(IncomeStreamType.ROYALTIES)}
          onChange={enabled => onToggleChange(IncomeStreamType.ROYALTIES, enabled)}
        />

        <FundingCard
          title="Donations"
          description="Let companies fund you or your project—with or without public recognition."
          isEnabled={incomeStreams.includes(IncomeStreamType.DONATIONS)}
          onChange={enabled => onToggleChange(IncomeStreamType.DONATIONS, enabled)}
        />
      </div>
    </div>
  );
}
