import { useEffect, useState } from "react";
import { getBackendAPI } from "src/services/BackendAPI";
import { GetIssueParams, GetIssueQuery } from "src/dtos";
import { useParams } from "react-router-dom";
import * as model from "src/model";

export function useFinancialIssue() {
  const backendAPI = getBackendAPI();

  const { ownerParam, repoParam, numberParam } = useParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFinancialIssue = async () => {
    if (ownerParam && repoParam && number) {
      try {
        const params: GetIssueParams = {
          owner: ownerParam,
          repo: repoParam,
          number: number,
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

  useEffect(() => {
    getFinancialIssue();
  }, [ownerParam, repoParam, number]);

  return { financialIssue, error, reloadFinancialIssue: getFinancialIssue };
}
