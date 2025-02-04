import { ProjectId, RepositoryId } from "../../../model";
import { CampaignDescription } from "../../../dtos";
import { pekkoCampaignDescription } from "./pekkoCampaignDescription";
import { openSourceEconomyCampaignDescription } from "./openSourceEconomyCampaignDescription";
import { flockCampaignDescription } from "./flockCampaignDescription";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription | null {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoCampaignDescription;
    } else if (projectId.ownerId.login === "join-the-flock" && projectId.name === "flock") {
      return flockCampaignDescription;
    } else {
      return null;
    }
  } else if (projectId.login === "open-source-economy") {
    return openSourceEconomyCampaignDescription;
  } else {
    return null;
  }
}
