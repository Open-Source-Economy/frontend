import React, { useState, useEffect } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";

interface ResponseTimeSectionProps {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
}

// Map ResponseTimeType enum values to hours for display
const responseTimeToHours = (responseTime: ResponseTimeType): string => {
  switch (responseTime) {
    case ResponseTimeType.FourHours:
      return "4";
    case ResponseTimeType.TwelveHours:
      return "12";
    case ResponseTimeType.OneBusinessDay:
      return "24";
    case ResponseTimeType.TwoBusinessDays:
      return "48";
    case ResponseTimeType.ThreeBusinessDays:
      return "72";
    case ResponseTimeType.FourBusinessDays:
      return "96";
    case ResponseTimeType.FiveBusinessDays:
      return "120";
    case ResponseTimeType.SevenBusinessDays:
      return "168";
    default:
      return "";
  }
};

// Map hours input to closest ResponseTimeType enum value
const hoursToResponseTime = (hours: number): ResponseTimeType => {
  if (hours <= 4) return ResponseTimeType.FourHours;
  if (hours <= 12) return ResponseTimeType.TwelveHours;
  if (hours <= 24) return ResponseTimeType.OneBusinessDay;
  if (hours <= 48) return ResponseTimeType.TwoBusinessDays;
  if (hours <= 72) return ResponseTimeType.ThreeBusinessDays;
  if (hours <= 96) return ResponseTimeType.FourBusinessDays;
  if (hours <= 120) return ResponseTimeType.FiveBusinessDays;
  return ResponseTimeType.SevenBusinessDays;
};

export function ResponseTimeSection(props: ResponseTimeSectionProps) {
  const [inputValue, setInputValue] = useState<string>("");

  // Initialize input value from props
  useEffect(() => {
    if (props.value) {
      setInputValue(responseTimeToHours(props.value));
    } else {
      setInputValue("");
    }
  }, [props.value]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numericValue = parseInt(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      props.onChange(hoursToResponseTime(numericValue));
    } else if (value === "") {
      props.onChange(null);
    }
  };

  return (
    <div className="flex p-9 px-8 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A]">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="flex w-full items-start gap-1">
          <div className="flex flex-col items-start">
            <label className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
              First Response Time
            </label>
            <div className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
              Expect sickness and vacations
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-10 pl-3 items-center gap-3 rounded-md bg-[#202F45]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="eg. 12"
              className="bg-transparent text-white font-montserrat text-base font-normal leading-[150%] opacity-60 outline-none placeholder:text-white placeholder:opacity-60 w-16"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="flex py-3 px-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">
              <span className="text-white font-montserrat text-base font-normal leading-[150%]">h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
