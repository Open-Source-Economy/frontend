import React, { ReactNode } from "react";
import { ProjectId, RepositoryId } from "../../../api/model";

interface Description {
  disclaimer?: ReactNode;
}

// TODO: refactor with pekkoCampaignDescription.disclaimer
const pekkoDescription: Description = {
  disclaimer: (
    <>
      This collective is not officially affiliated with the Apache Pekko project (or the Apache Software Foundation) <br />
      but aims to support development and testing work related to that project. <br />
      Apache Pekko will continue to be Free and Open Source Software.
    </>
  )
};

export function getDescription(projectId: ProjectId): Description | null {
  if (projectId instanceof RepositoryId) {
    if (projectId.ownerId.login === "apache" && projectId.name === "pekko") {
      return pekkoDescription;
    }
  }

  return {};
}