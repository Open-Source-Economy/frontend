import { OwnerId, RepositoryId } from "@open-source-economy/api-types/dist/model/github";
import { ProjectItemType, SourceIdentifier } from "@open-source-economy/api-types";
import { GithubUrls } from "../index";

// TODO: improve type safety

// Type guards using structural checks (work for class instances *and* plain objects)
function isOwnerLike(x: any): x is OwnerId | { login: string } {
  return x && typeof x === "object" && typeof x.login === "string";
}
function isRepoLike(x: any): x is RepositoryId | { name: string; ownerId?: { login?: string } } {
  return x && typeof x === "object" && typeof x.name === "string" && x.ownerId && typeof x.ownerId === "object" && typeof x.ownerId.login === "string";
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
    if (repoId) {
      // Ensure repository name doesn't have .git suffix (normalize)
      // This is a safety check in case .git wasn't stripped during extraction
      const normalizedName = repoId.name.endsWith(".git") ? repoId.name.slice(0, -4) : repoId.name;
      if (normalizedName !== repoId.name) {
        // Create new RepositoryId with normalized name, preserving githubId if it exists
        const githubId = (repoId as any).githubId;
        return githubId !== undefined ? new RepositoryId(repoId.ownerId, normalizedName, githubId) : new RepositoryId(repoId.ownerId, normalizedName);
      }
      return repoId;
    }

    const ownerId = GithubUrls.extractOwnerId(input, true);
    if (ownerId) return ownerId;

    return input;
  }

  /**
   * Compares two SourceIdentifiers for equality
   * @param a First SourceIdentifier to compare
   * @param b Second SourceIdentifier to compare
   * @param normalizeCase Whether to normalize to lowercase for case-insensitive comparison (default: true)
   * @returns true if the identifiers are equal
   */
  export function equals(a: SourceIdentifier, b: SourceIdentifier, normalizeCase: boolean = true): boolean {
    // Both are strings
    if (typeof a === "string" && typeof b === "string") {
      if (normalizeCase) {
        return a.toLowerCase() === b.toLowerCase();
      }
      return a === b;
    }

    // One is string, the other is not
    if (typeof a === "string" || typeof b === "string") {
      return false;
    }

    // Both are Owner-like
    if (isOwnerLike(a) && isOwnerLike(b)) {
      if (normalizeCase) {
        return a.login.toLowerCase() === b.login.toLowerCase();
      }
      return a.login === b.login;
    }

    // Both are Repo-like
    if (isRepoLike(a) && isRepoLike(b)) {
      const nameEqual = normalizeCase ? a.name.toLowerCase() === b.name.toLowerCase() : a.name === b.name;

      const ownerLoginEqual = normalizeCase ? a.ownerId.login.toLowerCase() === b.ownerId.login.toLowerCase() : a.ownerId.login === b.ownerId.login;

      return nameEqual && ownerLoginEqual;
    }

    // Different types
    return false;
  }

  /**
   * Detects the project type from a URL
   * @param url The URL to analyze
   * @returns The detected ProjectItemType, or null if the URL is invalid
   */
  export function detectProjectType(url: string): ProjectItemType | null {
    try {
      const trimmedUrl = url.trim();
      const urlObj = new URL(trimmedUrl);

      if (urlObj.hostname === "github.com") {
        const pathParts = urlObj.pathname.split("/").filter(Boolean);
        // If has 2+ parts (owner/repo/...), it's a repo
        // If has 1 part (owner), it's an org
        if (pathParts.length >= 2) {
          return ProjectItemType.GITHUB_REPOSITORY;
        } else if (pathParts.length === 1) {
          return ProjectItemType.GITHUB_OWNER;
        }
      }

      // For non-GitHub URLs, return URL type
      return ProjectItemType.URL;
    } catch {
      return null;
    }
  }

  /**
   * Validates a single URL against a specific project type
   * @param url The URL to validate
   * @param projectType The expected project type
   * @param allowShorthand Whether to allow shorthand URLs
   * @returns true if valid, false otherwise
   */
  export function validateUrlForType(url: string, projectType: ProjectItemType, allowShorthand: boolean = false): boolean {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      return false;
    }

    try {
      switch (projectType) {
        case ProjectItemType.GITHUB_REPOSITORY:
          return GithubUrls.extractRepositoryId(trimmedUrl, allowShorthand) !== null;

        case ProjectItemType.GITHUB_OWNER:
          return GithubUrls.extractOwnerId(trimmedUrl, allowShorthand) !== null;

        case ProjectItemType.URL:
          // Basic URL validation
          new URL(trimmedUrl);
          return true;

        default:
          return false;
      }
    } catch {
      return false;
    }
  }

  /**
   * Finds duplicate SourceIdentifiers in a list.
   * SourceIdentifiers should already be normalized (e.g., .git stripped, trailing paths removed)
   * by GithubUrls.extractRepositoryId() or GithubUrls.extractOwnerId().
   * Uses SourceIdentifierCompanion.equals for case-insensitive comparison.
   *
   * @param sourceIdentifiers Array of SourceIdentifier objects (already normalized) to check for duplicates
   * @returns Array of arrays, where each inner array contains SourceIdentifiers that are duplicates of each other
   */
  export function findDuplicateUrls(sourceIdentifiers: SourceIdentifier[]): SourceIdentifier[][] {
    // Group identifiers by exact equality using SourceIdentifierCompanion.equals
    const groups: SourceIdentifier[][] = [];
    const processed = new Set<number>();

    for (let i = 0; i < sourceIdentifiers.length; i++) {
      if (processed.has(i)) continue;

      const group = [sourceIdentifiers[i]];
      processed.add(i);

      // Find all other identifiers that are equal to this one
      for (let j = i + 1; j < sourceIdentifiers.length; j++) {
        if (processed.has(j)) continue;

        if (equals(sourceIdentifiers[i], sourceIdentifiers[j])) {
          group.push(sourceIdentifiers[j]);
          processed.add(j);
        }
      }

      // Only add groups with duplicates (more than 1 identifier)
      if (group.length > 1) {
        groups.push(group);
      }
    }

    return groups;
  }

  /**
   * Finds which SourceIdentifiers from the first array are included in the second array.
   * SourceIdentifiers should already be normalized (e.g., .git stripped, trailing paths removed)
   * by GithubUrls.extractRepositoryId() or GithubUrls.extractOwnerId().
   * Uses SourceIdentifierCompanion.equals for case-insensitive comparison.
   *
   * @param firstArray Array of SourceIdentifier objects to check
   * @param secondArray Array of SourceIdentifier objects to check against
   * @returns Array of SourceIdentifiers from the first array that are found in the second array
   */
  export function findIncludedUrls(firstArray: SourceIdentifier[], secondArray: SourceIdentifier[]): SourceIdentifier[] {
    const included: SourceIdentifier[] = [];
    const processed = new Set<number>();

    for (let i = 0; i < firstArray.length; i++) {
      if (processed.has(i)) continue;

      // Check if this identifier exists in the second array
      for (let j = 0; j < secondArray.length; j++) {
        if (equals(firstArray[i], secondArray[j])) {
          included.push(firstArray[i]);
          processed.add(i);
          break; // Found a match, no need to check further
        }
      }
    }

    return included;
  }
}
