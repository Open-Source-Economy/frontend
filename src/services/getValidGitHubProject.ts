import { Connection } from "@solana/web3.js";
import { getRepository } from "./github";
import { Project, Repository, ValidRepository } from "../model";
import { getProject } from "./onchain";
import { data } from "../components";

export async function getValidGitHubProject(connection: Connection, owner: string, repository: string): Promise<ValidRepository | undefined> {
  // @ts-ignore
  const project: Project = await getProject(connection, owner, repository);
  const repo: Repository | undefined = await getRepository(project.owner, project.repository).catch(() => undefined);

  if (repo) {
    return new ValidRepository(repo as Repository, project, data("TODO"));
  } else {
    return undefined;
  }
}
