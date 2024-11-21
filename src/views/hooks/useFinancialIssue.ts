import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetIssueParams, GetIssueQuery } from "src/dtos";
import * as model from "src/model";
import { ApiError } from "src/ultils/error/ApiError";

export function useFinancialIssue(issueId: model.IssueId | null) {
  const backendAPI = getBackendAPI();

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const getFinancialIssue = async () => {
    if (issueId) {
      try {
        const params: GetIssueParams = {
          owner: issueId.repositoryId.ownerId.login,
          repo: issueId.repositoryId.name,
          number: issueId.number,
        };
        const query: GetIssueQuery = {};
        const financialIssue = await backendAPI.getFinancialIssue(params, query);
        if (financialIssue instanceof ApiError) setError(financialIssue);
        else setFinancialIssue(financialIssue);
      } catch (error) {
        setError(ApiError.from(error));
      }
    }
  };

  return { financialIssue, error, reloadFinancialIssue: getFinancialIssue };
}
