import React, { useState } from "react";
import { HourlyRateInput } from "../../../../../components/form/select/HourlyRateInput";
import { CommentInput } from "./CommentInput";
import { Currency } from "@open-source-economy/api-types";

interface IndicativeRateSectionProps {
  hourlyRate: number | null;
  currency: Currency;
  onHourlyRateChange: (value: number | undefined) => void;
  onCurrencyChange: (currency: Currency) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function IndicativeRateSection(props: IndicativeRateSectionProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">
            Your Indicative Rate
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">
          What is your typical hourly rate?
        </div>
        <div className="flex h-12 items-center gap-2 self-stretch">
          <HourlyRateInput
            hourlyRate={props.hourlyRate}
            currency={props.currency}
            onHourlyRateChange={value => props.onHourlyRateChange(value || undefined)}
            onCurrencyChange={props.onCurrencyChange}
          />
          <CommentInput
            isExpanded={showComment}
            onToggle={() => setShowComment(!showComment)}
            value={props.commentValue}
            onChange={props.onCommentChange}
          />
        </div>
        {props.error && <div className="text-red-400 text-sm">{props.error}</div>}
      </div>
    </div>
  );
}
