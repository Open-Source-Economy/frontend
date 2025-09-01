import React from "react";
import { HourlyRateInput } from "../../../../../components/form/select/HourlyRateInput";
import { OnboardingSectionWrapper } from "./OnboardingSectionWrapper";
import { Currency } from "@open-source-economy/api-types";

interface IndicativeRateSectionProps {
  hourlyRate: number | null;
  currency: Currency;
  onHourlyRateChange: (value: number | undefined) => void;
  onCurrencyChange: (currency: Currency | null) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function IndicativeRateSection(props: IndicativeRateSectionProps) {
  return (
    <OnboardingSectionWrapper
      title="Your Indicative Rate"
      subtitle="What is your typical hourly rate?"
      commentValue={props.commentValue}
      onCommentChange={props.onCommentChange}
      error={props.error}
    >
      {(showComment, commentButtonComponent) => (
        <div className="flex h-12 items-center gap-2 self-stretch">
          <HourlyRateInput
            hourlyRate={props.hourlyRate}
            currency={props.currency}
            onHourlyRateChange={value => props.onHourlyRateChange(value || undefined)}
            onCurrencyChange={props.onCurrencyChange}
          />
          {commentButtonComponent}
        </div>
      )}
    </OnboardingSectionWrapper>
  );
}
