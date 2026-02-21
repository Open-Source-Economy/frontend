import { Outlet, useParams } from "@tanstack/react-router";

import { useRepositoryFromParams } from "../hooks";
import { IssueId } from "@open-source-economy/api-types";
import React, { createContext, useContext } from "react";
import { PageNotFound } from "../pages/PageNotFound";

type IssueContextType = {
  issueId: IssueId;
};

const IssueContextReact = createContext<IssueContextType | null>(null);

export function useIssueContext(): IssueContextType {
  const context = useContext(IssueContextReact);
  if (!context) {
    throw new Error("useIssueContext must be used within an IssueRoutes");
  }
  return context;
}

export function IssueRoutes() {
  const { numberParam } = useParams({ strict: false }) as { numberParam?: string };
  const repositoryId = useRepositoryFromParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (repositoryId && number !== undefined) {
    const issueId = new IssueId(repositoryId, number);
    return (
      <IssueContextReact.Provider value={{ issueId }}>
        <Outlet />
      </IssueContextReact.Provider>
    );
  }

  return <PageNotFound />;
}
