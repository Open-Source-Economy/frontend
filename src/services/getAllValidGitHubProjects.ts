import { Connection } from "@solana/web3.js";
import { getRepository } from "./github";
import { getAllProject } from "./onchain";
import { Project, Repository, ValidRepository } from "../model";
import { data } from "../components";

export async function getAllValidGitHubProjects(connection: Connection): Promise<ValidRepository[]> {
  const projects = await getAllProject(connection);
  const tuples: { project: Project; repo: Repository | undefined }[] = await Promise.all(
    projects.map(project => {
      return getRepository(project.owner, project.repository)
        .catch(() => undefined)
        .then(repo => {
          return { project: project, repo: repo };
        });
    })
  );

  return tuples.filter(({ project, repo }) => repo !== undefined).map(({ project, repo }) => new ValidRepository(repo as Repository, project, data("TODO")));
}
