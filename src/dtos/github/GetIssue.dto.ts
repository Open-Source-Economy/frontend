import { FinancialIssue } from "../../model";

// TODO: have this model for all the DTOs: https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
export interface GetIssueParams {
  owner: string;
  repo: string;
  number: number;
}

export interface GetIssueResponse {
  issue: FinancialIssue;
}

export interface GetIssueBody {}

export interface GetIssueQuery {}
