import Card from "../Elements/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Project } from "../../App";
import { Repo } from "../../functions";
import { ProjectContext } from "../../pages/Home";

const Projects = () => {
  const projects = useContext(ProjectContext);

  return (
    <>
      <section className="container mt-5 pt-lg-5" id="projects">
        <h1 className="text-center text-white mb-5 pb-lg-4 pt-3 ">Projects</h1>

        <div className="row mx-0" style={{ gap: "30px 0px" }}>
          <></>
          {projects.map((project: Project & Repo) => {
            return (
              <div className="col-lg-6">
                <Link to={`/swap/${project.owner}/${project.repository}`} className="text-decoration-none" state={{ project: project }}>
                  <Card
                    logo={project.organization.avatar_url}
                    name={project.full_name}
                    tokenCode={project.name.slice(0, 3).toUpperCase()}
                    tagline={project.description}
                    quoteCurrency="$"
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
