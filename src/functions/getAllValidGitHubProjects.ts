import { Connection } from "@solana/web3.js";
import { getRepository } from "./getRepository";
import { getAllProject } from "./getAllProject";
import { Project, Repo, ValidRepository } from "../model";

export async function getAllValidGitHubProjects(connection: Connection): Promise<ValidRepository[]> {
  const projects = await getAllProject(connection);
  const tuples: { project: Project; repo: Repo | undefined }[] = await Promise.all(
    projects.map(project => {
      return getRepository(project.owner, project.repository)
        .catch(() => undefined)
        .then(repo => {
          return { project: project, repo: repo };
        });
    })
  );

  return tuples.filter(({ project, repo }) => repo !== undefined).map(({ project, repo }) => new ValidRepository(repo as Repo, project));
}
