import { GetProjectServicesResponse, ServiceType } from "@open-source-economy/api-types";

export const pekkoGetProjectServicesResponse: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT, ServiceType.SUPPORT, ServiceType.ADVISORY],
  comingSoonServices: [ServiceType.OPERATION],
};
