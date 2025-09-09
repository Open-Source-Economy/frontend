import { Outlet, useOutletContext, useParams } from "react-router-dom";

import { useRepositoryFromParams } from "../hooks";
import { IssueId } from "@open-source-economy/api-types";
import React from "react";
import { PageNotFound } from "../pages/PageNotFound";

type IssueContextType = {
  issueId: IssueId;
};

export function useIssueContext() {
  return useOutletContext<IssueContextType>();
}

export function IssueRoutes() {
  const { numberParam } = useParams();
  const repositoryId = useRepositoryFromParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (repositoryId && number !== undefined) {
    const issueId = new IssueId(repositoryId, number);
    return <Outlet context={{ issueId }} />;
  }

  return <PageNotFound />;
}
