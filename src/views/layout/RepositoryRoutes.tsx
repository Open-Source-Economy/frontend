import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { PageNotFound } from "../pages/PageNotFound";
import { BaseURL } from "../../App";
import { useRepositoryFromParams } from "../hooks";
import { RepositoryId } from "src/model";

export function useRepositoryContext() {
  return useOutletContext<RepositoryContext>();
}

type RepositoryContext = {
  repositoryId: RepositoryId;
};

export function RepositoryRoutes() {
  const repositoryId = useRepositoryFromParams();

  if (repositoryId) {
    return <Outlet context={{ repositoryId }} />;
  }

  return <PageNotFound home={BaseURL.APP} />;
}
