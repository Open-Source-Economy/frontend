import { Connection } from "@solana/web3.js";
import { getRepository } from "./github";
import { data, Project, Repository, ValidRepository } from "../model";
import { getProject } from "./onchain";

export async function getValidGitHubProject(connection: Connection, owner: string, repository: string): Promise<ValidRepository | undefined> {
  // @ts-ignore
  const project: Project = await getProject(connection, owner, repository);
  const repo: Repository | undefined = await getRepository(project.owner, project.repository).catch(() => undefined);

  if (repo) {
    return new ValidRepository(repo as Repository, project, data(repo?.full_name || ""));
  } else {
    return undefined;
  }
}
