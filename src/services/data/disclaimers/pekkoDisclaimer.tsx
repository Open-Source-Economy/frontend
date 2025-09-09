import React, { ReactNode } from "react";
import { ProjectId, RepositoryId } from "@open-source-economy/api-types";

interface Disclaimer {
  disclaimer?: ReactNode;
}

// TODO: refactor with pekkoCampaignDescription.disclaimer
const pekkoDisclaimer: Disclaimer = {
  disclaimer: (
    <>
      This collective is not officially affiliated with the Apache Pekko project (or the Apache Software Foundation) <br />
      but aims to support development and testing work related to that project. <br />
      Apache Pekko will continue to be Free and Open Source Software.
    </>
  ),
};

export function getDescription(projectId: ProjectId): Disclaimer | null {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoDisclaimer;
    }
  }

  return {};
}
