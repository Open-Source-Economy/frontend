import React from "react";
import * as dto from "@open-source-economy/api-types";
import { PenIcon } from "../../../../icons";
import { HourlyRateInput } from "../../../../../../../../../components/form";

interface HourlyRateDisplayProps {
  hourlyRate: number;
  currency: dto.Currency;
  onClick: () => void;
  showTooltip: boolean;
  onShowTooltip: () => void;
  onHideTooltip: () => void;
}

export function HourlyRateDisplaySection(props: HourlyRateDisplayProps) {
  const [hourlyRate, setHourlyRate] = React.useState<number>(props.hourlyRate);
  return (
    <div className="flex justify-between items-center self-stretch">
      <div className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
        <HourlyRateInput currency={props.currency} hourlyRate={props.hourlyRate} onHourlyRateChange={setHourlyRate} />
      </div>
      <div className="relative">
        <button
          onClick={() => props.onClick()}
          onMouseEnter={props.onShowTooltip}
          onMouseLeave={props.onHideTooltip}
          className="w-6 h-6 flex items-center justify-center text-white hover:text-[#FF7E4B] transition-colors"
        >
          <PenIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
