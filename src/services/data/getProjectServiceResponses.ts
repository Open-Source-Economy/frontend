import * as dto from "@open-source-economy/api-types";

export const pekkoGetProjectServicesResponse: dto.GetProjectServicesResponse = {
  services: [dto.ServiceType.DEVELOPMENT, dto.ServiceType.SUPPORT, dto.ServiceType.ADVISORY],
  comingSoonServices: [dto.ServiceType.SECURITY_AND_COMPLIANCE],
};
