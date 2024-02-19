import Card from "../Elements/Card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectsContext } from "../../routes/pages/home/Home";
import { ValidRepository } from "../../model";

const Projects = () => {
  const projects = useContext(ProjectsContext);

  return (
    <>
      <section className="container mt-5 pt-lg-5" id="projects">
        <h1 className="text-center text-white mb-5 pb-lg-4 pt-3 ">Projects</h1>

        <div className="row mx-0" style={{ gap: "30px 0px" }}>
          <></>
          {projects.map((project: ValidRepository) => {
            return (
              <div className="col-lg-6">
                <Link to={`/swap/${project.onChainData.owner}/${project.onChainData.repository}`} className="text-decoration-none" state={{ project: project }}>
                  <Card
                    logo={project.githubData.organization.avatar_url}
                    name={project.githubData.full_name}
                    tokenCode={project.tokenCode}
                    tagline={project.githubData.description}
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
