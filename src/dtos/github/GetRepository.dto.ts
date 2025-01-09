import { Owner, Repository } from "src/model";

export interface GetRepositoryParams {
  owner: string;
  repo: string;
}

export interface GetRepositoryResponse {
  owner: Owner;
  repository: Repository;
}

export interface GetRepositoryBody {}

export interface GetRepositoryQuery {}
