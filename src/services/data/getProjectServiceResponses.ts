import { GetProjectServicesResponse } from "../../dtos";
import { ServiceType } from "../../model";

export const pekkoGetProjectServicesResponse: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT],
  comingSoonServices: [ServiceType.SUPPORT],
};
