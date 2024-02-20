import { Repository } from "./github";
import { Project } from "./onchain";
import { ChartData } from "./server";

export class ValidRepository {
  githubData: Repository;
  onChainData: Project;
  serverData: ChartData;
  tokenCode: string;

  constructor(githubData: Repository, onChainData: Project, serverData: ChartData) {
    this.githubData = githubData;
    this.onChainData = onChainData;
    this.serverData = serverData;
    this.tokenCode = this.githubData.name.slice(0, 3).toUpperCase();
  }
}
