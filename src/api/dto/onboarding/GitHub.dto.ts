export interface GitHubOrganization {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  description: string | null;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GetGitHubOrganizationsResponse {
  success: boolean;
  data: GitHubOrganization[];
}

export interface GetGitHubRepositoriesResponse {
  success: boolean;
  data: GitHubRepository[];
}

export interface GetUserGitHubRepositoriesResponse {
  success: boolean;
  data: GitHubRepository[];
}