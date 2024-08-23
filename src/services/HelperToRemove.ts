import * as model from "../model";
import { getGithubAPI } from "./GitAPI";
import { FinancialIssue } from "../model";

export async function getFinancialIssue(ownerParam: string, repoParam: string, number: number): Promise<model.FinancialIssue> {
  const github = getGithubAPI();

  const [owner, repository] = await github.getOwnerAndRepository(ownerParam, repoParam);
  const issue = await github.getIssue(ownerParam, repoParam, number);

  // TODO: error handling
  const amountCollected = 30; //await sdk.getIssueFundingAmount({ financialIssue, repository: repo, number: number });

  const issueStatus = issue.closedAt ? new model.Closed(amountCollected) : new model.CollectToBeApproved(amountCollected);

  return new FinancialIssue(owner, repository, issue, issueStatus);
}
