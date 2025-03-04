// TODO: to implement

export interface GetMaintainersParams {
  owner: string;
  repo?: string;
}

export interface Maintainer {
  displayName: string;
  githubUsername: string;
  githubAvatar: string;
  githubPage: string;
  title: string;
  quote?: string;
  mascot: string;
  mascotAlt: string;
}

export interface GetMaintainersResponse {
  maintainers: Maintainer[];
}

export interface GetMaintainersBody {}

export interface GetMaintainersQuery {}
