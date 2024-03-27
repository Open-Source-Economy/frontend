import { ValidRepository } from "../../../../model";
import { Project } from "./Project";

export interface ProjectsProps {
  projects: ValidRepository[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="container mt-5 pt-lg-5" id="projects">
      <h1 className="text-center text-white mb-5 pb-lg-4 pt-3 ">Projects</h1>
      <div className="row mx-0" style={{ gap: "30px 0px" }}>
        <></>
        {projects.map((project: ValidRepository) => {
          return (
            <div className="col-lg-6">
              <Project repository={project} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
