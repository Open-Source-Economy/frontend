import { Owner, Repository } from "../../model";

export interface GetOwnerParams {
  owner: string;
}

export interface GetOwnerResponse {
  owner: Owner;
}

export interface GetOwnerBody {}

export interface GetOwnerQuery {}
