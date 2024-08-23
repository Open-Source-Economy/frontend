import * as model from "../model";
import { getGithubAPI } from "./GitAPI";
import { IssueFindName } from "../model";

export async function getIssueFindName(ownerParam: string, repoParam: string, number: number): Promise<model.IssueFindName> {
  const github = getGithubAPI();

  const [owner, repository] = await github.getOwnerAndRepository(ownerParam, repoParam);
  const issue = await github.getIssue(ownerParam, repoParam, number);

  // TODO: error handling
  const amountCollected = 30; //await sdk.getIssueFundingAmount({ issueFindName, repository: repo, number: number });

  const issueStatus = issue.closedAt ? new model.Closed(amountCollected) : new model.CollectToBeApproved(amountCollected);

  return new IssueFindName(owner, repository, issue, issueStatus);
}
