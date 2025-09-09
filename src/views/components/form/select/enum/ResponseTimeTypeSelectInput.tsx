import React, { forwardRef, Ref } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { GenericInputRef } from "../../input/GenericInput";
import { DisplayedEnum, EnumSelectInput, EnumSelectInputChildrenProps } from "./EnumSelectInput";

export const displayedResponseTimes: Record<ResponseTimeType, DisplayedEnum> = {
  [ResponseTimeType.None]: { name: "No response time" },
  [ResponseTimeType.FourHours]: { name: "4 hours" },
  [ResponseTimeType.TwelveHours]: { name: "12 hours" },
  [ResponseTimeType.OneBusinessDay]: { name: "1 business day" },
  [ResponseTimeType.TwoBusinessDays]: { name: "2 business day" },
  [ResponseTimeType.ThreeBusinessDays]: { name: "3 business day" },
  [ResponseTimeType.FourBusinessDays]: { name: "4 business day" },
  [ResponseTimeType.FiveBusinessDays]: { name: "5 business day" },
  [ResponseTimeType.SevenBusinessDays]: { name: "7 business day" },
};

export interface ResponseTimeTypeSelectInputProps extends EnumSelectInputChildrenProps<ResponseTimeType> {}

export const ResponseTimeTypeSelectInput = forwardRef(function ResponseTimeTypeSelectInput(props: ResponseTimeTypeSelectInputProps, ref: Ref<GenericInputRef>) {
  return (
    // @ts-ignore
    <EnumSelectInput<ResponseTimeType> name="response_time" enumObject={ResponseTimeType} displayedEnums={displayedResponseTimes} {...props} ref={ref} />
  );
});
