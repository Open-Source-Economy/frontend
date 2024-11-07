import { useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetIssueParams, GetIssueQuery } from "src/dtos";
import * as model from "src/model";

export function useFinancialIssue(issueId: model.IssueId | null) {
  const backendAPI = getBackendAPI();

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setFinancialIssue(financialIssue);
      } catch (error) {
        console.error("Error fetching financial issue:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
  };

  return { financialIssue, error, reloadFinancialIssue: getFinancialIssue };
}
