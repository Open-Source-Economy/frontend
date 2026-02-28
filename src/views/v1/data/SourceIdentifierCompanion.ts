import * as dto from "@open-source-economy/api-types";
import { SourceIdentifier } from "src/utils/local-types";
import { GithubUrls } from "src/utils";

// TODO: improve type safety

// Type guard: RepositoryId is an object with ownerId (branded string) and name (string)
function isRepoLike(x: unknown): x is dto.RepositoryId {
  return (
    x !== null &&
    typeof x === "object" &&
    "name" in x &&
    typeof (x as dto.RepositoryId).name === "string" &&
    "ownerId" in x &&
    typeof (x as dto.RepositoryId).ownerId === "string"
  );
}

export namespace SourceIdentifierCompanion {
  export function displayName(sourceIdentifier: SourceIdentifier): string {
    // RepositoryId is the only non-string shape (object with ownerId + name)
    if (isRepoLike(sourceIdentifier)) {
      return `${sourceIdentifier.ownerId}/${sourceIdentifier.name}`;
    }

    // OwnerId is a branded string, and plain strings also pass through here
    if (typeof sourceIdentifier === "string") return sourceIdentifier;

    // Last resort: stringify safely so React gets a string, never an object
    try {
      return JSON.stringify(sourceIdentifier);
    } catch {
      return String(sourceIdentifier);
    }
  }

  export function fromUrlOrShorthand(input: string): SourceIdentifier {
    const repoId = GithubUrls.extractRepositoryId(input, true);
    if (repoId) return repoId;

    const ownerId = GithubUrls.extractOwnerId(input, true);
    if (ownerId) return ownerId;

    return input;
  }
}
