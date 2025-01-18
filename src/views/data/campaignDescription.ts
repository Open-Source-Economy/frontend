import { ProjectId, RepositoryId } from "../../model";
import { CampaignDescription, SummaryType } from "../../dtos";

export function getCampaignDescription(projectId: ProjectId): CampaignDescription | null {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoCampaign;
    } else {
      return null;
    }
  } else if (projectId.login === "open-source-economy") {
    return openSourceEconomyCampaign;
  } else {
    return null;
  }
}

const pekkoCampaign: CampaignDescription = {
  summary: {
    title: "Improve Cluster Reliability",
    subtitle: "Apache Pekko is an independent open source project powered by volunteers in their free time.",
    summaryType: SummaryType.ONE,
  },
};

const openSourceEconomyCampaign: CampaignDescription = {
  summary: {
    title: "Open Source Economy",
    subtitle: "Building the foundations of Open Source 3.0. Creating a sustainable future for everyone.",
    summaryType: SummaryType.ONE,
  },
};
