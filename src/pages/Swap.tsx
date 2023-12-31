import * as React from "react";
import Header from "../components/Layout/Header";
import BannerSwap from "../components/Swap/BannerSwap";
import SwapChart from "../components/Swap/SwapChart";
import Footer from "../components/Layout/Footer";
import { createContext, useContext, useEffect, useState } from "react";
import { ChartData, ValidRepository } from "../model";
import { ConnectionContext } from "../App";
import { getAllValidGitHubProjects } from "../functions";
import { getValidGitHubProject } from "../functions/getValidGitHubProject";
import { useParams } from "react-router-dom";
import { data } from "../components/Elements/ChartData";
import Solana from "../assets/images/solana.png";
import frame from "../assets/images/Frame.png";

export const ProjectContext = createContext<ValidRepository | undefined>(undefined);
export const ReloadContext = createContext<number>(0);

const Swap = () => {
  const { owner, repository } = useParams();
  const connection = useContext(ConnectionContext);

  const [project, setProject] = useState<ValidRepository>();
  const [projectNotFound, setProjectNotFound] = useState<boolean>();
  const [reloadBalance, setReloadBalance] = useState<number>(0);

  useEffect(() => {
    if (connection && owner && repository) {
      getValidGitHubProject(connection, owner, repository)
        .then(project => setProject(project))
        .catch(err => setProjectNotFound(true));
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ height: "50px" }}></div>

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
        <ReloadContext.Provider value={reloadBalance}>
          <ProjectContext.Provider value={project}>
            <BannerSwap
              project={project!}
              chartData={data(project.githubData.full_name)}
              quoteCurrency="$"
              logo={project!.githubData.organization.avatar_url}
            />
            <SwapChart setReloadBalance={() => setReloadBalance(reloadBalance + 1)} />
          </ProjectContext.Provider>
        </ReloadContext.Provider>
      )}

      {projectNotFound && (
        <>
          <div style={{ height: "250px" }}></div>
          <h1 className="helvetica text-white mb-0 text-center">
            {" "}
            Project with owner "{owner}" and repository "{repository}" not found{" "}
          </h1>
          <div style={{ height: "550px" }}></div>
        </>
      )}
      <div className="mt-5 pt-lg-5"></div>
      <div style={{ height: "250px" }}></div>
      <Footer />
    </>
  );
};

export default Swap;
