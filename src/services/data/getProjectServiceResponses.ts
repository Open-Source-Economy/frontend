import { GetProjectServicesResponse } from "../../api/dto";
import { ServiceType } from "../../api/model";

export const pekkoGetProjectServicesResponse: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT],
  comingSoonServices: [ServiceType.SUPPORT],
};
