import { Project, ProjectEcosystem } from "../../model";

export interface CreateProjectParams {
  owner: string;
  repo?: string;
}

export interface CreateProjectResponse {
  project: Project;
}

export interface CreateProjectBody {
  projectEcosystem?: ProjectEcosystem;
}

export interface CreateProjectQuery {}
