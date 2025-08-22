import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model/github";

export namespace ProjectItemIdCompanion {
  export function displayName(sourceIdentifier: OwnerId | RepositoryId | string): string {
    if (sourceIdentifier instanceof OwnerId) {
      return sourceIdentifier.login;
    } else if (sourceIdentifier instanceof RepositoryId) {
      return sourceIdentifier.name;
    } else {
      return sourceIdentifier;
    }
  }
}