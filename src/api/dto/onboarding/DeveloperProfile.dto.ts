import { Currency, DeveloperRoleType, IncomeStreamType, MergeRightsType, OpenToOtherOpportunityType } from "@open-source-economy/api-types";

export interface CreateDeveloperProfileDto {
  name?: string;
  email?: string;
  agreedToTerms?: boolean;
}

export interface UpdateDeveloperProfileDto {
  name?: string;
  email?: string;
  agreedToTerms?: boolean;
}

export interface GetDeveloperProfileResponse {
  user: {
    name: string | null;
    email: string | null;
  };
  profile?: {
    id: string;
    onboardingCompleted: boolean;
  } | null;
  settings?: DeveloperSettingsData;
  rights?: DeveloperRightsData[];
  services?: DeveloperServiceData[];
}

export interface DeveloperSettingsData {
  id: string;
  developerProfileId: string;
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}

export interface DeveloperRightsData {
  id: string;
  developerProfileId: string;
  projectItemId: string;
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  createdAt: string;
  updatedAt: string;
}

export interface DeveloperServiceData {
  id: string;
  developerProfileId: string;
  projectItemId: string;
  serviceId: string;
  hourlyRate: number;
  currency: Currency;
  responseTimeHours?: number | null;
  createdAt: string;
  updatedAt: string;
}
