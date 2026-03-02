import { useState } from "react";
import { fundingService } from "src/services";
import * as model from "@open-source-economy/api-types";
import { ApiError } from "src/utils/error/ApiError";

export function useFinancialIssue(issueId: model.IssueId) {
  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const getFinancialIssue = async () => {
    try {
      const params: model.GetIssueParams = {
        owner: issueId.repositoryId.ownerId.login,
        repo: issueId.repositoryId.name,
        number: issueId.number,
      };
      const query: model.GetIssueQuery = {};
      const financialIssue = await fundingService.getFinancialIssue(params, query);
      if (financialIssue instanceof ApiError) setError(financialIssue);
      else setFinancialIssue(financialIssue);
    } catch (_error) {
      // silently ignore
    }
  };

  return { financialIssue, loadFinancialIssueError: error, reloadFinancialIssue: getFinancialIssue };
}
