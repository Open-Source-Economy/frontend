import { ProjectId, RepositoryId } from "../../../model";
import { CampaignDescription } from "../../../dtos";
import { pekkoCampaignDescription } from "./pekkoCampaignDescription";
import { openSourceEconomyCampaignDescription } from "./openSourceEconomyCampaignDescription";
import { flockCampaignDescription } from "./flockCampaignDescription";
import { defaultCampaignDescription } from "./defaultCampaignDescription";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription | null {
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
