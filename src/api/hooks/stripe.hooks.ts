import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stripeService, CreatePortalSessionBody, CreatePortalSessionResponse } from "src/services";

const STRIPE_QUERY_KEY = ["stripe"] as const;

export const stripeHooks = {
  useCheckoutMutation() {
    return useMutation<
      dto.CheckoutResponse,
      Error,
      { params: dto.CheckoutParams; body: dto.CheckoutBody; query: dto.CheckoutQuery }
    >({
      mutationFn: ({ params, body, query }) => stripeService.checkout(params, body, query),
    });
  },

  useSetUserPreferredCurrencyMutation() {
    const queryClient = useQueryClient();
    return useMutation<
      dto.SetPreferredCurrencyResponse,
      Error,
      {
        params: dto.SetPreferredCurrencyParams;
        body: dto.SetPreferredCurrencyBody;
        query: dto.SetPreferredCurrencyQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => stripeService.setUserPreferredCurrency(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STRIPE_QUERY_KEY });
      },
    });
  },

  useCreatePortalSessionMutation() {
    return useMutation<CreatePortalSessionResponse, Error, { body: CreatePortalSessionBody }>({
      mutationFn: ({ body }) => stripeService.createPortalSession(body),
    });
  },

  usePlansQuery(params: dto.GetPlansParams, query: dto.GetPlansQuery) {
    return useQuery<dto.GetPlansResponse>({
      queryKey: [...STRIPE_QUERY_KEY, "plans", params, query],
      queryFn: () => stripeService.getPlans(params, query),
    });
  },

  useUserPlanQuery(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery) {
    return useQuery<dto.GetUserPlanResponse>({
      queryKey: [...STRIPE_QUERY_KEY, "userPlan", params, query],
      queryFn: () => stripeService.getUserPlan(params, query),
    });
  },
};
