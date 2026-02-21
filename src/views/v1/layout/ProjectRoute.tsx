import React, { createContext, useContext } from "react";
import { Outlet, useParams } from "@tanstack/react-router";
import { PageNotFound } from "../pages/PageNotFound";

import { OwnerId, ProjectId, RepositoryId } from "@open-source-economy/api-types";

type ProjectContext = {
  projectId: ProjectId;
};

const ProjectContextReact = createContext<ProjectContext | null>(null);

export function useProjectContext(): ProjectContext {
  const context = useContext(ProjectContextReact);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectRoute");
  }
  return context;
}

function useProjectFromParams() {
  const params = useParams({ strict: false }) as {
    ownerParam?: string;
    repoParam?: string;
  };

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
    return (
      <ProjectContextReact.Provider value={{ projectId }}>
        <Outlet />
      </ProjectContextReact.Provider>
    );
  }

  return <PageNotFound />;
}
