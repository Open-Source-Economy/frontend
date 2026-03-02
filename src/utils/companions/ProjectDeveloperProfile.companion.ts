import * as dto from "@open-source-economy/api-types";

// TODO: this needs to be cleaned up and optimized
export namespace ProjectDeveloperProfileCompanion {
  export function getStableIdentifier(developer: dto.ProjectDeveloperProfile): string | null {
    return (
      developer.profileEntry?.profile?.id ??
      developer.profileEntry?.owner?.id?.login ??
      developer.profileEntry?.user?.name ??
      developer.profileEntry?.profile?.contactEmail ??
      null
    );
  }

  export function getDisplayName(developer: dto.ProjectDeveloperProfile): string {
    return (
      developer.profileEntry?.owner?.name ??
      developer.profileEntry?.user?.name ??
      developer.profileEntry?.owner?.id?.login ??
      developer.profileEntry?.profile?.contactEmail ??
      "maintainer"
    );
  }

  export function getAvatarUrl(developer: dto.ProjectDeveloperProfile, _loginFallback?: string): string | undefined {
    return developer.profileEntry?.owner?.displayAvatarUrl;
  }

  export function getPrimaryProject(developer: dto.ProjectDeveloperProfile) {
    return developer.project;
  }

  export function isVerified(developer: dto.ProjectDeveloperProfile): boolean {
    return (
      developer.profileEntry?.verificationRecords?.some(
        (record) => record.status === dto.VerificationStatus.APPROVED
      ) ?? false
    );
  }
}
