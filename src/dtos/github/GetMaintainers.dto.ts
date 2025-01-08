// TODO: to implement

import { ReactNode } from "react";

export interface GetMaintainersParams {
  owner: string;
  repo: string;
}

export interface Maintainer {
  displayName: string;
  githubUsername: string;
  githubAvatar: string;
  githubPage: string;
  title: ReactNode | string;
  quote?: string;
  mascot: string;
  mascotAlt: ReactNode;
}

export interface GetMaintainersResponse {
  maintainers: Maintainer[];
}

export interface GetMaintainersBody {}

export interface GetMaintainersQuery {}
