import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Banner from "../components/Home/Banner";
import Projects from "../components/Home/Projects";
import Footer from "../components/Layout/Footer";
import { ConnectionContext } from "../App";
import { getAllValidGitHubProjects } from "../functions";
import { ValidRepository } from "../model";

export const ProjectsContext = createContext<ValidRepository[]>([]);

const Home = () => {
  const connection = useContext(ConnectionContext);

  const [loadProject, setLoadProject] = useState<number>(0);
  const [projects, setProjects] = useState<ValidRepository[]>();

  useEffect(() => {
    if (connection) {
      const waitBeforeReload = loadProject > 0 ? 1000 : 0; // Blockchain is slow, wait 1 second before reload projects
      new Promise(resolve => setTimeout(resolve, waitBeforeReload)).then(() => getAllValidGitHubProjects(connection)).then(projects => setProjects(projects)); // TODO: handle error
    }
  }, [loadProject]);

  return (
    <>
      <Header />
      <Banner onRegisteringNewProject={() => setLoadProject(loadProject + 1)} />
      <ProjectsContext.Provider value={projects ?? []}>
        <Projects />
      </ProjectsContext.Provider>

      <div style={{ height: "150px" }}></div>
      <Footer />
    </>
  );
};

export default Home;
