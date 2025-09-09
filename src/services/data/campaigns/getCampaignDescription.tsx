import { ProjectId, RepositoryId } from "@open-source-economy/api-types";
import { CampaignDescription } from "src/model";
import { pekkoCampaignDescription } from "./pekkoCampaignDescription";
import { openSourceEconomyCampaignDescription } from "./openSourceEconomyCampaignDescription";
import { flockCampaignDescription } from "./flockCampaignDescription";
import { defaultCampaignDescription } from "./defaultCampaignDescription";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoCampaignDescription;
    } else if (projectId.ownerId.login === "join-the-flock" && projectId.name === "flock") {
      return flockCampaignDescription;
    }
    // else if (projectId.ownerId.login === "slick" && projectId.name === "slick") {
    //   return slickCampaignDescription;
    // }
  } else if (projectId.login === "open-source-economy") {
    return openSourceEconomyCampaignDescription;
  }

  return defaultCampaignDescription;
}
