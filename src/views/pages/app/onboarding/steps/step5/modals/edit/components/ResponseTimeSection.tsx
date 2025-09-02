import React, { useState } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";

interface ResponseTimeSectionProps {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
}

export function ResponseTimeSection(props: ResponseTimeSectionProps) {
  const [inputValue, setInputValue] = useState<string>(props.value?.toString() || "");

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Convert string to ResponseTimeType (assuming it's a number in hours)
    const numericValue = parseInt(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      props.onChange(numericValue as ResponseTimeType);
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
