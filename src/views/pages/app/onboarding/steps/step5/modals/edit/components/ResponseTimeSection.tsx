import React from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { ResponseTimeTypeSelectInput } from "../../../../../../../../components/form/select/enum/ResponseTimeTypeSelectInput";

interface ResponseTimeSectionProps {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
}

export function ResponseTimeSection(props: ResponseTimeSectionProps) {
  return (
    <>
      <div className="flex h-12 items-center gap-2 self-stretch">
        <ResponseTimeTypeSelectInput value={props.value} onChange={props.onChange} required={false} />
      </div>
    </>
  );
}
