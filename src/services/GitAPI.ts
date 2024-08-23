import { Issue, Owner, Repository } from "../model";
import { GithubAPI } from "./github";

export interface GitAPI {
  getIssue(owner: string, repo: string, number: number): Promise<Issue>;
  getOwnerAndRepository(owner: string, repo: string): Promise<[Owner, Repository]>;
}

export function getGithubAPI(): GithubAPI {
  return new GithubAPI();
}
