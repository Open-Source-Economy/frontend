import type { ProjectDeveloperProfile } from "@open-source-economy/api-types";
import { VerificationStatus } from "@open-source-economy/api-types";

// TODO: this needs to be cleaned up and optimized
export namespace ProjectDeveloperProfileCompanion {
  export function getStableIdentifier(developer: ProjectDeveloperProfile): string | null {
    return (
      developer.profileEntry?.profile?.id.uuid ??
      developer.profileEntry?.owner?.id.login ??
      developer.profileEntry?.user?.name ??
      developer.profileEntry?.profile?.contactEmail ??
      null
    );
  }

  export function getDisplayName(developer: ProjectDeveloperProfile): string {
    return (
      developer.profileEntry?.owner?.name ??
      developer.profileEntry?.user?.name ??
      developer.profileEntry?.owner?.id.login ??
      developer.profileEntry?.profile?.contactEmail ??
      "maintainer"
    );
  }

  export function getAvatarUrl(developer: ProjectDeveloperProfile, loginFallback?: string): string | undefined {
    return developer.profileEntry?.owner?.displayAvatarUrl;
  }

  export function getPrimaryProject(developer: ProjectDeveloperProfile) {
    return developer.project;
  }

  export function isVerified(developer: ProjectDeveloperProfile): boolean {
    return developer.profileEntry?.verificationRecords?.some(record => record.status === VerificationStatus.APPROVED) ?? false;
  }
}
