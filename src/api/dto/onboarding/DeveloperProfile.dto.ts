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
  currency: CurrencyType;
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
  currency: CurrencyType;
  responseTimeHours?: number | null;
  createdAt: string;
  updatedAt: string;
}

export type IncomeStreamType = "royalties" | "services" | "donations";
export type OpenToOtherOpportunityType = "yes" | "maybe" | "no";
export type CurrencyType = "USD" | "EUR" | "GBP" | "CHF";
export type MergeRightsType = "full_rights" | "no_rights" | "formal_process";
export type DeveloperRoleType = "creator_founder" | "project_lead" | "core_developer" | "maintainer";
