import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { ValidRepository } from "../../../model";
import { getValidGitHubProject } from "../../../services/getValidGitHubProject";
import { useParams } from "react-router-dom";
import frame from "../../../assets/images/Frame.png";
import { PageWrapper } from "../PageWrapper";
import { ProjectBanner } from "./elements/ProjectBanner";
import { BannerSwap, SwapChart } from "./elements";

export const RepositoryContext = createContext<ValidRepository | undefined>(undefined);
export const ReloadAmountCollectedContext = createContext<number>(0);

export const Swap = () => {
  const { owner, repository } = useParams();

  const [project, setProject] = useState<ValidRepository>();
  const [projectNotFound, setProjectNotFound] = useState<boolean>();
  const [reloadAmountCollected, setReloadAmountCollected] = useState<number>(0);

  useEffect(() => {
    if (owner && repository) {
      // getValidGitHubProject(connection, owner, repository)
      //   .then(project => setProject(project))
      //   .catch(err => setProjectNotFound(true));
    }
  }, []);

  return (
    <PageWrapper>
      <div className="bg__pink py-2 rounded mt-4 d-flex gap-2 align-items-center px-2">
        <img src={frame} className=" img-fluid" alt="" />
        <div className="text__red helvetica fw-600 small">
          Please, get some devUSDC{" "}
          <a href={"https://everlastingsong.github.io/nebula/"} target="_blank">
            here
          </a>{" "}
          to be able to buy some tokens of the project {project?.githubData.full_name}.
        </div>
      </div>

      {project && (
        <ReloadAmountCollectedContext.Provider value={reloadAmountCollected}>
          <RepositoryContext.Provider value={project}>
            <div className="container">
              <ProjectBanner repository={project} />
              <BannerSwap repository={project} />
            </div>

            <SwapChart reloadAmountCollected={() => setReloadAmountCollected(reloadAmountCollected + 1)} />
          </RepositoryContext.Provider>
        </ReloadAmountCollectedContext.Provider>
      )}

      {projectNotFound && (
        <>
          <div style={{ height: "250px" }}></div>
          <h1 className="helvetica text-white mb-0 text-center">{` Project with owner "${owner}" and repository "${project}" not found `}</h1>
          <div style={{ height: "550px" }}></div>
        </>
      )}
    </PageWrapper>
  );
};
