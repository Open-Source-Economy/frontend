import React from "react";
import * as dto from "@open-source-economy/api-types";
import { CloseIcon } from "../../../../icons";
import { HourlyRateInput } from "../../../../../../../../../components/form";

// Hourly Rate Editing Component
interface HourlyRateEditingProps {
  hourlyRate: number | null;
  currency: dto.Currency;
  onHourlyRateChange: (rate: number | null) => void;
  onCancelEdit: () => void;
}

export function HourlyRateEditingSection(props: HourlyRateEditingProps) {
  return (
    <div className="flex flex-col gap-2.5 self-stretch relative">
      <button
        onClick={props.onCancelEdit}
        className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center text-white hover:text-[#FF7E4B] transition-colors"
      >
        <CloseIcon className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-start gap-3 self-stretch">
        <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Want to change your hourly rate for this service?</label>
        <HourlyRateInput currency={props.currency} hourlyRate={props.hourlyRate} onHourlyRateChange={props.onHourlyRateChange} />
      </div>
    </div>
  );
}
