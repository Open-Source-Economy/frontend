import React, { ReactNode } from "react";
import { type ProjectId, isRepositoryId } from "src/utils/local-types";

interface Disclaimer {
  disclaimer?: ReactNode;
}

// TODO: refactor with pekkoCampaignDescription.disclaimer
const pekkoDisclaimer: Disclaimer = {
  disclaimer: (
    <>
      This collective aims to support development and testing work related to Apache Pekko, but does not directly
      represent the project: the governance of the Apache Pekko project lies with the Apache Software Foundation and the
      Apache Pekko Project Management Committee (PMC). Apache®, Apache Pekko, and Pekko® are either registered
      trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries.
    </>
  ),
};

export function getDescription(projectId: ProjectId): Disclaimer | null {
  if (isRepositoryId(projectId)) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoDisclaimer;
    }
  }

  return {};
}
