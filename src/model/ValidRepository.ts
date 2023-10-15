import { Repo } from "./github";
import { Project } from "./onchain";

export class ValidRepository {
  githubData: Repo;
  onChainData: Project;
  tokenCode: string;

  constructor(githubData: Repo, onChainData: Project) {
    this.githubData = githubData;
    this.onChainData = onChainData;
    this.tokenCode = this.githubData.name.slice(0, 3).toUpperCase();
  }
}
