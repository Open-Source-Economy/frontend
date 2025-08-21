import { IssueId, OwnerId, RepositoryId } from "@open-source-economy/api-types";

export class GithubUrls {
  /**
   * Extracts GitHub owner information from a GitHub URL.
   * @param url The GitHub URL to extract from.
   * @returns An OwnerId object if successful, null otherwise.
   */
  static extractOwnerId(url: string): OwnerId | null {
    const ownerRepoRegex = /^https:\/\/github\.com\/([^/]+)/;
    const match = url.match(ownerRepoRegex);
    if (match && match[1]) {
      return new OwnerId(match[1]);
    }
    return null;
  }

  /**
   * Extracts GitHub repository information from a GitHub URL.
   * @param url The GitHub URL to extract from.
   * @returns A RepositoryId object if successful, null otherwise.
   */
  static extractRepositoryId(url: string): RepositoryId | null {
    const repoRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(repoRegex);
    if (match && match[1] && match[2]) {
      return new RepositoryId(new OwnerId(match[1]), match[2]);
    }
    return null;
  }

  /**
   * Extracts either a RepositoryId or an OwnerId from a GitHub URL.
   * It prioritizes extracting a RepositoryId if possible.
   * @param url The GitHub URL to extract from.
   * @returns A RepositoryId, OwnerId, or null if neither can be extracted.
   */
  static extractOwnerOrRepositoryId(url: string): OwnerId | RepositoryId | null {
    const repository = GithubUrls.extractRepositoryId(url);
    if (repository) {
      return repository;
    }
    const owner = GithubUrls.extractOwnerId(url);
    if (owner) {
      return owner;
    }
    return null;
  }

  /**
   * Extracts GitHub issue information (owner, repository, and issue number) from a GitHub issue URL.
   * @param url The GitHub issue URL to extract from.
   * @returns An IssueId object if successful, null otherwise.
   */
  static extractGitHubIssueInfo(url: string): IssueId | null {
    const urlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/;
    const match = url.match(urlRegex);
    if (match) {
      const [, owner, repo, n] = match;
      const number = parseInt(n);
      if (!owner || !repo || isNaN(number)) {
        return null;
      } else {
        return new IssueId(new RepositoryId(new OwnerId(owner), repo), number);
      }
    } else {
      return null;
    }
  }


}