import * as React from "react";
import { useEffect, useState } from "react";
import { getAllValidGitHubProjects } from "../../../services";
import { ValidRepository } from "../../../model";
import frame from "../../../assets/images/Frame.png";
import { PageWrapper } from "../PageWrapper";
import { Banner, Projects } from "./elements";

export const Invest = () => {
  const [loadProject, setLoadProject] = useState<number>(0);
  const [projects, setProjects] = useState<ValidRepository[]>([]);

  useEffect(() => {
    if (true) {
      // TODO: lolo
      const waitBeforeReload = loadProject > 0 ? 1000 : 0; // Blockchain is slow, wait 1 second before reload projects
      new Promise(resolve => setTimeout(resolve, waitBeforeReload)).then(() => getAllValidGitHubProjects()).then(projects => setProjects(projects)); // TODO: handle error
    }
  }, [loadProject]);

  return (
    <PageWrapper>
      <div className="bg__pink py-2 rounded mt-4 d-flex gap-2 align-items-center px-2">
        <img src={frame} className=" img-fluid" alt="" />
        <div className="text__red helvetica fw-600 small">Please, be sure to be connected to the Solana Devnet.</div>
      </div>

      <Banner onRegisteringNewProject={() => setLoadProject(loadProject + 1)} />

      <Projects projects={projects} />
    </PageWrapper>
  );
};
