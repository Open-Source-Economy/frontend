import { ServiceType } from "../../model";

export interface GetProjectServicesParams {
  owner: string;
  repo?: string;
}

export interface GetProjectServicesResponse {
  services: ServiceType[];
  comingSoonServices: ServiceType[];
}

export interface GetProjectServicesBody {}

export interface GetProjectServicesQuery {}
