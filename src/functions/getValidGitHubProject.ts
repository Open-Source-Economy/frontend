import { Connection } from "@solana/web3.js";
import { getRepository } from "./getRepository";
import { Project, Repo, ValidRepository } from "../model";
import { getAllProject } from "./getProject";

export async function getValidGitHubProject(connection: Connection, owner: string, repository: string): Promise<ValidRepository | undefined> {
  // @ts-ignore
  const project: Project = await getAllProject(connection, owner, repository);
  const repo: Repo | undefined = await getRepository(project.owner, project.repository).catch(() => undefined);

  if (repo) {
    return new ValidRepository(repo as Repo, project);
  } else {
    return undefined;
  }
}
