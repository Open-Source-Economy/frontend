import Card from "../Elements/Card";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ConnectionContext, Project } from "../../App";
import { getAllValidGitHubProject, Repo } from "../../functions";

const Projects = () => {
  const connection = useContext(ConnectionContext);

  const [projects, setProjects] = useState<(Project & Repo)[]>();

  useEffect(() => {
    if (connection) {
      getAllValidGitHubProject(connection).then(projects => setProjects(projects)); // TODO: handle error
    }
  }, []);

  return (
    <>
      <section className="container mt-5 pt-lg-5">
        <h1 className="text-center text-white mb-5 pb-lg-4 pt-3 ">Projects</h1>

        <div className="row mx-0" style={{ gap: "30px 0px" }}>
          <></>
          {(projects || []).map((project: Project & Repo) => {
            return (
              <div className="col-lg-6">
                <Link to={`/swap/${project.owner}/${project.repository}`} className="text-decoration-none">
                  <Card
                    logo={project.organization.avatar_url}
                    name={project.full_name}
                    tokenCode={project.name.slice(0, 3).toUpperCase()}
                    tagline={project.description}
                    price={0.05227}
                    quoteCurrency="$"
                    changeValue={-4.17}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Projects;
