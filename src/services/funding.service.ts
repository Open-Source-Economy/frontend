import * as dto from "@open-source-economy/api-types";
import { FinancialIssue } from "@open-source-economy/api-types";
import { GetIssuesParams } from "src/ultils/local-types";
import { api, handleError } from "./apiClient";
import { config } from "src/ultils";

export interface FundingService {
  getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue>;

  getAllFinancialIssues(params: GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[]>;

  getAvailableCredits(
    params: dto.GetAvailableCreditsParams,
    query: dto.GetAvailableCreditsQuery
  ): Promise<dto.GetAvailableCreditsResponse>;

  /**
   * Funds a specific issue.
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(
    params: dto.RequestIssueFundingParams,
    body: dto.RequestIssueFundingBody,
    query: dto.RequestIssueFundingQuery
  ): Promise<void>;
}

export const fundingServiceImpl: FundingService = {
  async getFinancialIssue(params, _query) {
    const response = await handleError<dto.GetIssueResponse>(
      () =>
        api.get(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}`, {
          withCredentials: true,
        }),
      "getFinancialIssue"
    );
    return response.issue;
  },

  async getAllFinancialIssues(_params, _query) {
    const response = await handleError<dto.GetAllFinancialIssuesResponse>(
      () => api.get(`${config.api.url}/projects/all-financial-issues`, { withCredentials: true }),
      "getAllFinancialIssues"
    );
    return response.issues;
  },

  async getAvailableCredits(_params, query) {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError<dto.GetAvailableCreditsResponse>(
      () => api.get(`${config.api.url}/user/available-credit?${queryParams}`, { withCredentials: true }),
      "getAvailableCredits"
    );
  },

  async fundIssue(params, body, _query) {
    return handleError(
      () =>
        api.post(
          `${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding`,
          body,
          { withCredentials: true }
        ),
      "fundIssue"
    );
  },

  async requestFunding(params, body, _query) {
    return handleError(
      () =>
        api.post(
          `${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`,
          body,
          {
            withCredentials: true,
          }
        ),
      "requestFunding"
    );
  },
};
