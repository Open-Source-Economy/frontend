import React from "react";
import * as dto from "@open-source-economy/api-types";
import { displayedCurrencies } from "src/views/data";

interface HourlyRateDisplayProps {
  hourlyRate: number;
  currency: dto.Currency;
  onClick: () => void;
  showTooltip: boolean;
  onShowTooltip: () => void;
  onHideTooltip: () => void;
}

export function HourlyRateDisplaySection(props: HourlyRateDisplayProps) {
  const currentCurrency = displayedCurrencies[props.currency];

  return (
    <div className="flex justify-between items-center self-stretch">
      <div className="flex py-0.5 px-2.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
        <span className="text-white font-montserrat text-sm font-normal leading-[150%]">
          Hourly rate: {currentCurrency.symbol} {props.hourlyRate}
        </span>
      </div>

      <button
        onClick={props.onClick}
        onMouseEnter={props.onShowTooltip}
        onMouseLeave={props.onHideTooltip}
        className="w-[25.5px] h-[25.5px] flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Edit rate"
      >
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.2489 22H22.8114M17.8984 4.5984C18.3214 4.17543 18.8951 3.93781 19.4933 3.93781C20.0914 3.93781 20.6651 4.17543 21.0881 4.5984C21.511 5.02137 21.7487 5.59504 21.7487 6.19321C21.7487 6.79138 21.511 7.36505 21.0881 7.78802L8.32744 20.5497C8.07467 20.8025 7.76221 20.9874 7.419 21.0873L4.3675 21.9777C4.27607 22.0044 4.17916 22.006 4.0869 21.9823C3.99465 21.9587 3.91044 21.9107 3.8431 21.8434C3.77576 21.776 3.72776 21.6918 3.70412 21.5996C3.68049 21.5073 3.68208 21.4104 3.70875 21.319L4.59913 18.2675C4.69923 17.9246 4.88414 17.6126 5.13675 17.3601L17.8984 4.5984Z"
            stroke="white"
            strokeWidth="1.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
