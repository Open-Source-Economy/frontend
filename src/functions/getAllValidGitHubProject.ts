import { Connection } from "@solana/web3.js";
import { Project } from "../App";
import { getRepository, Repo } from "./getRepository";
import { getAllProject } from "./getAllProject";

export async function getAllValidGitHubProject(connection: Connection): Promise<(Project & Repo)[]> {
  const projects = await getAllProject(connection);
  const tuples: { project: Project; repo: Repo | undefined }[] = await Promise.all(
    projects.map(project => {
      return getRepository(project.owner, project.repository)
        .catch(() => undefined)
        .then(repo => {
          console.log("project");
          return { project: project, repo: repo };
        });
    })
  );

  return tuples.filter(({ project, repo }) => repo !== undefined).map(({ project, repo }) => ({ ...project, ...repo } as Project & Repo));
}
