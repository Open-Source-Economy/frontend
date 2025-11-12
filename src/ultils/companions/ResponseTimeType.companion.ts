/**
 * Companion utilities for ResponseTimeType enum
 * Centralizes all display and formatting logic for response times
 */

import * as dto from "@open-source-economy/api-types";

const responseTimeLabelMap: Record<dto.ResponseTimeType, string> = {
  [dto.ResponseTimeType.None]: "None",
  [dto.ResponseTimeType.FourHours]: "4 hours",
  [dto.ResponseTimeType.TwelveHours]: "12 hours",
  [dto.ResponseTimeType.OneBusinessDay]: "1 business day",
  [dto.ResponseTimeType.TwoBusinessDays]: "2 business days",
  [dto.ResponseTimeType.ThreeBusinessDays]: "3 business days",
  [dto.ResponseTimeType.FourBusinessDays]: "4 business days",
  [dto.ResponseTimeType.FiveBusinessDays]: "5 business days",
  [dto.ResponseTimeType.SevenBusinessDays]: "7 business days",
};

export namespace ResponseTimeTypeCompanion {
  /**
   * Get display label for a response time
   */
  export function label(responseTime: dto.ResponseTimeType): string {
    return responseTimeLabelMap[responseTime];
  }

  /**
   * Get all displays (for EnumSelectInput compatibility)
   */
  export function displays(): Record<dto.ResponseTimeType, string> {
    return responseTimeLabelMap;
  }

  /**
   * Get all response time options for SelectField
   */
  export function selectOptions() {
    return Object.entries(responseTimeLabelMap).map(([value, label]) => ({
      value,
      label,
    }));
  }

  /**
   * Returns the fastest response time (smallest value) advertised across the provided offerings.
   */
  export function fastestResponseTime(offerings: Array<{ responseTimeHours?: [dto.ResponseTimeType, unknown][] }>): dto.ResponseTimeType | undefined {
    let best: dto.ResponseTimeType | undefined;

    for (const offering of offerings) {
      const responseEntries = offering.responseTimeHours ?? [];
      for (const [responseTime] of responseEntries) {
        if (best === undefined || responseTime < best) {
          best = responseTime;
        }
      }
    }

    return best;
  }
}
