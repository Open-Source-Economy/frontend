import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model/github";
import { SourceIdentifier } from "@open-source-economy/api-types";
import { GithubUrls } from "../../../ultils";

// TODO: improve type safety

// Type guards using structural checks (work for class instances *and* plain objects)
function isOwnerLike(x: any): x is OwnerId | { login: string } {
  return x && typeof x === "object" && typeof x.login === "string";
}
function isRepoLike(x: any): x is RepositoryId | { name: string; ownerId?: { login?: string } } {
  return x && typeof x === "object" && typeof x.name === "string" && x.ownerId && typeof x.ownerId === "object";
}

export namespace SourceIdentifierCompanion {
  export function displayName(sourceIdentifier: SourceIdentifier): string {
    // Strings pass through
    if (typeof sourceIdentifier === "string") return sourceIdentifier;

    // Handle Owner-like (class instance or plain object)
    if (isOwnerLike(sourceIdentifier)) {
      return sourceIdentifier.login;
    }

    // Handle Repo-like (class instance or plain object)
    if (isRepoLike(sourceIdentifier)) {
      const ownerLogin =
        (isOwnerLike(sourceIdentifier.ownerId) && sourceIdentifier.ownerId.login) ||
        // tolerate ownerId being just a string login
        (typeof (sourceIdentifier as any).ownerId === "string" ? (sourceIdentifier as any).ownerId : undefined) ||
        "(unknown)";
      return `${ownerLogin}/${sourceIdentifier.name}`;
    }

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
