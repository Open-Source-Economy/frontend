import { FinancialIssue } from "../../model";

export interface GetIssueBodyParams {}

export interface GetIssueQueryParams {
  owner: string;
  repo: string;
  number: number;
}

export interface GetIssueResponse {
  issue: FinancialIssue;
}
