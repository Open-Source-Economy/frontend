// TODO: to implement

export interface GetMaintainersParams {
  owner: string;
  repo: string;
}

export interface Maintainer {
  name: string;
  title: string;
  quote: string;
  image: string;
  mascot: string;
  link: string;
}

export interface GetMaintainersResponse {
  maintainers: Maintainer[];
}

export interface GetMaintainersBody {}

export interface GetMaintainersQuery {}
