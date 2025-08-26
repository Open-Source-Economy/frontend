import { ResponseTimeType } from "@open-source-economy/api-types";

export interface DisplayedResponseTime {
  name: string;
}

// Create the mapping from ResponseTimeType enum values to their display properties
export const displayedResponseTimes: Record<ResponseTimeType, DisplayedResponseTime> = {
  [ResponseTimeType.FourHours]: { name: "4 hours" },
  [ResponseTimeType.TwelveHours]: { name: "12 hours" },
  [ResponseTimeType.OneBusinessDay]: { name: "1 business day" },
  [ResponseTimeType.TwoBusinessDays]: { name: "2 business day" },
  [ResponseTimeType.ThreeBusinessDays]: { name: "3 business day" },
  [ResponseTimeType.FourBusinessDays]: { name: "4 business day" },
  [ResponseTimeType.FiveBusinessDays]: { name: "5 business day" },
  [ResponseTimeType.SevenBusinessDays]: { name: "7 business day" },
};
