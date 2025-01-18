import { Project } from "../../model";

export interface GetProjectParams {
  owner: string;
  repo?: string;
}

export interface GetProjectResponse {
  project: Project;
}

export interface GetProjectBody {}

export interface GetProjectQuery {}
