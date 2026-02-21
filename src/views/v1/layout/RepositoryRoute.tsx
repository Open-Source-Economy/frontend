import React, { createContext, useContext } from "react";
import { Outlet } from "@tanstack/react-router";
import { PageNotFound } from "../pages/PageNotFound";

import { useRepositoryFromParams } from "../hooks";
import { RepositoryId } from "@open-source-economy/api-types";

type RepositoryContext = {
  repositoryId: RepositoryId;
};

const RepositoryContextReact = createContext<RepositoryContext | null>(null);

export function useRepositoryContext(): RepositoryContext {
  const context = useContext(RepositoryContextReact);
  if (!context) {
    throw new Error("useRepositoryContext must be used within a RepositoryRoute");
  }
  return context;
}

export function RepositoryRoute() {
  const repositoryId = useRepositoryFromParams();

  if (repositoryId) {
    return (
      <RepositoryContextReact.Provider value={{ repositoryId }}>
        <Outlet />
      </RepositoryContextReact.Provider>
    );
  }

  return <PageNotFound />;
}
