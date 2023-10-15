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
import data from "../components/Elements/ChartData";

export const ProjectContext = createContext<ValidRepository[]>([]);

const Swap = () => {
  const { owner, repository } = useParams();
  const connection = useContext(ConnectionContext);

  const [project, setProject] = useState<ValidRepository>();

  useEffect(() => {
    if (connection && owner && repository) {
      getValidGitHubProject(connection, owner, repository).then(project => setProject(project));
    }
  }, []);

  return (
    <>
      <Header />
      <div style={{ height: "50px" }}></div>
      {project && <BannerSwap project={project!} chartData={new ChartData(data)} quoteCurrency="$" logo={project!.githubData.organization.avatar_url} />}
      <SwapChart />
      <div className="mt-5 pt-lg-5"></div>
      <div style={{ height: "250px" }}></div>
      <Footer />
    </>
  );
};

export default Swap;
