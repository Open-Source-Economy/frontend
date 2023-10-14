import * as React from "react";
import Header from "../components/Layout/Header";
import Banner from "../components/Home/Banner";
import Projects from "../components/Home/Projects";
import Footer from "../components/Layout/Footer";
import {createContext, useContext, useEffect, useState} from "react";
import {ConnectionContext, Project} from "../App";
import {getAllValidGitHubProject, Repo} from "../functions";
import {Connection} from "@solana/web3.js";

export const ProjectContext = createContext<(Project & Repo)[]>([]);

const Home = () => {
    const connection = useContext(ConnectionContext);

    const [loadProject, setLoadProject] = useState<number>(0);
    const [projects, setProjects] = useState<(Project & Repo)[]>();


    useEffect(() => {
        if (connection) {
            console.log("useEffect")
            const waitBeforeReload = loadProject > 0 ? 1000 : 0; // Blockchain is slow, wait 1 second before reload projects
            new Promise(resolve => setTimeout(resolve, waitBeforeReload))
                .then(() => getAllValidGitHubProject(connection))
            .then(projects => setProjects(projects)); // TODO: handle error
        }
    }, [loadProject]);

  return (
    <>
      <Header />
      <Banner onRegisteringNewProject={() => setLoadProject(loadProject + 1)}/>
        <ProjectContext.Provider value={projects ?? []}>
            <Projects />
        </ProjectContext.Provider>

      <div style={{ height: "150px" }}></div>
      <Footer />
    </>
  );
};

export default Home;
