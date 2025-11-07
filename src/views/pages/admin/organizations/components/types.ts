import * as dto from "@open-source-economy/api-types";

export interface OrganizationWithSyncState extends dto.ProjectItemWithDetails {
  syncInProgress: boolean;
  lastSyncMessage?: string;
}

export interface BulkSyncStatus {
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: any;
}
