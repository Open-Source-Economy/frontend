import React from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { PageNotFound } from "../pages/PageNotFound";

import { OwnerId, ProjectId, RepositoryId } from "@open-source-economy/api-types";

type ProjectContext = {
  projectId: ProjectId;
};

export function useProjectContext() {
  return useOutletContext<ProjectContext>();
}

function useProjectFromParams() {
  const params = useParams<{
    ownerParam: string;
    repoParam?: string;
  }>();

  if (!params.ownerParam) {
    return null;
  }

  const ownerId = new OwnerId(params.ownerParam);

  if (params.repoParam) {
    return new RepositoryId(ownerId, params.repoParam);
  } else {
    return ownerId;
  }
}

export function ProjectRoute() {
  const projectId = useProjectFromParams();

  if (projectId) {
    return <Outlet context={{ projectId }} />;
  }

  return <PageNotFound />;
}
