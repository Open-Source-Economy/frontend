import * as dto from "@open-source-economy/api-types";
import { FinancialIssue } from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fundingService } from "src/services";
import { GetIssuesParams } from "src/utils/local-types";

const FUNDING_QUERY_KEY = ["funding"] as const;

export const fundingHooks = {
  useFinancialIssueQuery(params: dto.GetIssueParams, query: dto.GetIssueQuery) {
    return useQuery<FinancialIssue>({
      queryKey: [...FUNDING_QUERY_KEY, "financialIssue", params, query],
      queryFn: () => fundingService.getFinancialIssue(params, query),
      enabled: !!params.owner && !!params.repo && !!params.number,
    });
  },

  useAllFinancialIssuesQuery(params: GetIssuesParams, query: dto.GetIssueQuery) {
    return useQuery<FinancialIssue[]>({
      queryKey: [...FUNDING_QUERY_KEY, "allFinancialIssues", params, query],
      queryFn: () => fundingService.getAllFinancialIssues(params, query),
    });
  },

  useAvailableCreditsQuery(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery) {
    return useQuery<dto.GetAvailableCreditsResponse>({
      queryKey: [...FUNDING_QUERY_KEY, "availableCredits", params, query],
      queryFn: () => fundingService.getAvailableCredits(params, query),
    });
  },

  useFundIssueMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      void,
      Error,
      { params: dto.FundIssueParams; body: dto.FundIssueBody; query: dto.FundIssueQuery }
    >({
      mutationFn: ({ params, body, query }) => fundingService.fundIssue(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FUNDING_QUERY_KEY });
      },
    });
  },

  useRequestFundingMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      void,
      Error,
      { params: dto.RequestIssueFundingParams; body: dto.RequestIssueFundingBody; query: dto.RequestIssueFundingQuery }
    >({
      mutationFn: ({ params, body, query }) => fundingService.requestFunding(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FUNDING_QUERY_KEY });
      },
    });
  },
};
