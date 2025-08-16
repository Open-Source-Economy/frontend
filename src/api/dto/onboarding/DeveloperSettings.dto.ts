import { CurrencyType, IncomeStreamType, OpenToOtherOpportunityType } from "@open-source-economy/api-types";

export interface SetIncomeStreamsDto {
  incomeStreams: IncomeStreamType[];
}

export interface SetIncomeStreamsResponse {
  success: {
    incomeStreams: IncomeStreamType[];
    message: string;
  };
}

export interface SetDeveloperSettingsDto {
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: CurrencyType;
}

export interface SetDeveloperSettingsResponse {
  success: boolean;
  data: {
    id: string;
    developerProfileId: string;
    incomeStreams: IncomeStreamType[];
    hourlyWeeklyCommitment: number;
    openToOtherOpportunity: OpenToOtherOpportunityType;
    hourlyRate: number;
    currency: CurrencyType;
    createdAt: string;
    updatedAt: string;
  };
}
