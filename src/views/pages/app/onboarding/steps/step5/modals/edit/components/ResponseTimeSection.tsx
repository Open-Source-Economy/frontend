import React from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { ResponseTimeTypeSelectInput } from "../../../../../../../../components/form/select/enum/ResponseTimeTypeSelectInput";

interface ResponseTimeSectionProps {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
}

export function ResponseTimeSection(props: ResponseTimeSectionProps) {
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

        <div className="flex items-center gap-2.5 self-stretch">
          <ResponseTimeTypeSelectInput
            value={props.value}
            onChange={props.onChange}
            required={false}
          />
        </div>
      </div>
    </div>
  );
}
