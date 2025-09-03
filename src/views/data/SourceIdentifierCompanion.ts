import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model/github";
import { SourceIdentifier } from "@open-source-economy/api-types";
import { GithubUrls } from "../../ultils";

export namespace SourceIdentifierCompanion {
  export function displayName(sourceIdentifier: SourceIdentifier): string {
    if (sourceIdentifier instanceof OwnerId) {
      return sourceIdentifier.login;
    } else if (sourceIdentifier instanceof RepositoryId) {
      return `${sourceIdentifier.ownerId.login}/${sourceIdentifier.name}`;
    } else {
      return sourceIdentifier;
    }
  }

  export function fromUrlOrShorthand(input: string): SourceIdentifier {
    const repoId = GithubUrls.extractRepositoryId(input, true);
    if (repoId) {
      return repoId;
    }
    const ownerId = GithubUrls.extractOwnerId(input, true);
    if (ownerId) {
      return ownerId;
    }
    return input;
  }
}
