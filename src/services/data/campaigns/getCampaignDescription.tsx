import { CampaignDescription } from "src/model";
import { type ProjectId, isRepositoryId, isOwnerId } from "src/utils/local-types";
import { pekkoCampaignDescription } from "src/services/data/campaigns/pekkoCampaignDescription";
import { openSourceEconomyCampaignDescription } from "src/services/data/campaigns/openSourceEconomyCampaignDescription";
import { flockCampaignDescription } from "src/services/data/campaigns/flockCampaignDescription";
import { defaultCampaignDescription } from "src/services/data/campaigns/defaultCampaignDescription";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription {
  if (isRepositoryId(projectId)) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoCampaignDescription;
    } else if (projectId.ownerId.login === "join-the-flock" && projectId.name === "flock") {
      return flockCampaignDescription;
    }
    // else if (projectId.ownerId.login === "slick" && projectId.name === "slick") {
    //   return slickCampaignDescription;
    // }
  } else if (isOwnerId(projectId) && projectId.login === "open-source-economy") {
    return openSourceEconomyCampaignDescription;
  }

  return defaultCampaignDescription;
}
