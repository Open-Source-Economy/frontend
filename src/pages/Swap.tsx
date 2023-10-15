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

export const ProjectContext = createContext<ValidRepository | undefined>(undefined);

const Swap = () => {
  const { owner, repository } = useParams();
  const connection = useContext(ConnectionContext);

  const [project, setProject] = useState<ValidRepository>();
  const [projectNotFound, setProjectNotFound] = useState<boolean>();

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
      {project && (
        <ProjectContext.Provider value={project}>
          <BannerSwap project={project!} chartData={data(project.githubData.full_name)} quoteCurrency="$" logo={project!.githubData.organization.avatar_url} />
          <SwapChart />
        </ProjectContext.Provider>
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
