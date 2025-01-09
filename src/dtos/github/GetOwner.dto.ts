import { Owner } from "src/model";

export interface GetOwnerParams {
  owner: string;
}

export interface GetOwnerResponse {
  owner: Owner;
}

export interface GetOwnerBody {}

export interface GetOwnerQuery {}
