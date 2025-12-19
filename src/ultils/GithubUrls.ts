import { IssueId, OwnerId, RepositoryId } from "@open-source-economy/api-types";

export class GithubUrls {
  /**
   * Extracts GitHub owner information from a GitHub URL or shorthand.
   * @param input GitHub URL or shorthand
   * @param allowShorthand Whether to allow shorthand like "owner"
   * @returns An OwnerId object if successful, null otherwise.
   */
  static extractOwnerId(input: string, allowShorthand: boolean = false): OwnerId | null {
    const value = input.trim();

    // Shorthand case: just "owner"
    if (allowShorthand && /^[A-Za-z0-9-_.]+$/.test(value) && !value.includes("/")) {
      return new OwnerId(value);
    }

    // Full GitHub URL - matches owner URLs with optional trailing slash and query params/fragments
    // Examples: github.com/owner, github.com/owner/, github.com/owner?tab=repositories
    // But NOT: github.com/owner/repo (repository URLs)
    const ownerRegex = /^https:\/\/github\.com\/([^/?#]+)(?:\/)?(?:[?#].*)?$/;
    const match = value.match(ownerRegex);
    if (match && match[1]) {
      return new OwnerId(match[1]);
    }

    return null;
  }

  /**
   * Extracts GitHub repository information from a GitHub URL or shorthand.
   * @param input GitHub URL or shorthand
   * @param allowShorthand Whether to allow shorthand like "owner/repo"
   * @returns A RepositoryId object if successful, null otherwise.
   */
  static extractRepositoryId(input: string, allowShorthand: boolean = false): RepositoryId | null {
    const value = input.trim();

    // Helper function to strip .git suffix from repository name
    // Only strips if .git is at the end of the repo name (not followed by a path)
    // Examples:
    // - "repo.git" → "repo" (strips)
    // - "repo.git/pulls" → "repo.git" (doesn't strip, .git is part of the name)
    // - "repo.git?tab=readme" → "repo" (strips, followed by query param)
    // - "repo.git#readme" → "repo" (strips, followed by fragment)
    const stripGitSuffix = (repoName: string, fullUrl: string, matchIndex: number): string => {
      if (!repoName.endsWith(".git")) {
        return repoName;
      }

      // matchIndex is the index where the full regex match ends in the URL
      // Check the character immediately after the match
      // If it's '/', then .git is part of the repository name (e.g., repo.git/pulls)
      // If it's '?', '#', or end of string, then .git is a suffix to strip
      if (matchIndex < fullUrl.length && fullUrl[matchIndex] === "/") {
        // .git is followed by a path, so it's part of the repository name
        return repoName;
      }

      // .git is at the end or followed by ? or #, so strip it
      return repoName.slice(0, -4);
    };

    // Shorthand case: "owner/repo"
    if (allowShorthand && /^[^/]+\/[^/]+$/.test(value)) {
      const [owner, repo] = value.split("/");
      // For shorthand, .git at the end is always a suffix to strip
      const repoName = repo.endsWith(".git") ? repo.slice(0, -4) : repo;
      return new RepositoryId(new OwnerId(owner), repoName);
    }

    // Full GitHub URL - matches repository URLs with optional trailing paths, query params, or fragments
    // Examples: github.com/owner/repo, github.com/owner/repo/, github.com/owner/repo/blob/main/README.md, github.com/owner/repo?tab=readme
    // Also handles: github.com/owner/repo.git (strips .git suffix only if not followed by a path)
    const repoRegex = /^https:\/\/github\.com\/([^/]+)\/([^/?#]+)/;
    const match = value.match(repoRegex);
    if (match && match[1] && match[2]) {
      // match.index is the start of the match, match[0].length is the length of the full match
      // The match ends at match.index + match[0].length
      const matchEndIndex = (match.index || 0) + match[0].length;
      const repoName = stripGitSuffix(match[2], value, matchEndIndex);
      return new RepositoryId(new OwnerId(match[1]), repoName);
    }

    return null;
  }

  /**
   * Extracts either a RepositoryId or an OwnerId from input.
   * It prioritizes extracting a RepositoryId if possible.
   * @param input GitHub URL or shorthand
   * @param allowShorthand Whether to allow shorthand like "owner" or "owner/repo"
   * @returns A RepositoryId, OwnerId, or null if neither can be extracted.
   */
  static extractOwnerOrRepositoryId(input: string, allowShorthand: boolean = false): OwnerId | RepositoryId | null {
    const repo = GithubUrls.extractRepositoryId(input, allowShorthand);
    if (repo) return repo;

    const owner = GithubUrls.extractOwnerId(input, allowShorthand);
    if (owner) return owner;

    return null;
  }

  /**
   * Extracts GitHub issue information (owner, repository, and issue number).
   * @param input The GitHub issue URL (shorthand not supported here)
   * @returns An IssueId object if successful, null otherwise.
   */
  static extractGitHubIssueInfo(input: string): IssueId | null {
    const urlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/;
    const match = input.trim().match(urlRegex);
    if (match) {
      const [, owner, repo, n] = match;
      const number = parseInt(n, 10);
      if (!owner || !repo || isNaN(number)) return null;
      return new IssueId(new RepositoryId(new OwnerId(owner), repo), number);
    }
    return null;
  }

  /**
   * Generates a GitHub owner URL from an OwnerId.
   * @param ownerId The OwnerId object.
   * @returns The GitHub URL string.
   */
  static generateOwnerUrl(ownerId: OwnerId): string {
    return `https://github.com/${ownerId.login}`;
  }

  /**
   * Generates a GitHub repository URL from a RepositoryId.
   * @param repoId The RepositoryId object.
   * @returns The GitHub URL string.
   */
  static generateRepositoryUrl(repoId: RepositoryId): string {
    return `https://github.com/${repoId.ownerId.login}/${repoId.name}`;
  }
}
