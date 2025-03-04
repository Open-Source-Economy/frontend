import { Owner, Repository } from "../../model";

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
