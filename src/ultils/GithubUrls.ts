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

    // Full GitHub URL
    const ownerRegex = /^https:\/\/github\.com\/([^/]+)(?:\/)?$/;
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

    // Shorthand case: "owner/repo"
    if (allowShorthand && /^[^/]+\/[^/]+$/.test(value)) {
      const [owner, repo] = value.split("/");
      return new RepositoryId(new OwnerId(owner), repo);
    }

    // Full GitHub URL
    const repoRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/)?$/;
    const match = value.match(repoRegex);
    if (match && match[1] && match[2]) {
      return new RepositoryId(new OwnerId(match[1]), match[2]);
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
