import { FinancialIssue } from "../../model";

export interface GetIssueQuery {
  owner: string;
  repo: string;
  number: number;
}

export interface GetIssueResponse {
  issue: FinancialIssue;
}
