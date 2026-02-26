import * as dto from "@open-source-economy/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBackendAPI, CreatePortalSessionBody, CreatePortalSessionResponse } from "src/services";

const STRIPE_QUERY_KEY = ["stripe"] as const;

const backendAPI = getBackendAPI();

export const stripeHooks = {
  useCheckoutMutation() {
    return useMutation<
      dto.CheckoutResponse,
      Error,
      { params: dto.CheckoutParams; body: dto.CheckoutBody; query: dto.CheckoutQuery }
    >({
      mutationFn: ({ params, body, query }) => backendAPI.checkout(params, body, query),
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
      mutationFn: ({ params, body, query }) => backendAPI.setUserPreferredCurrency(params, body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: STRIPE_QUERY_KEY });
      },
    });
  },

  useSubscribeToNewsletterMutation() {
    return useMutation<
      dto.SubscribeNewsletterResponse,
      Error,
      {
        params: dto.SubscribeNewsletterParams;
        body: dto.SubscribeNewsletterBody;
        query: dto.SubscribeNewsletterQuery;
      }
    >({
      mutationFn: ({ params, body, query }) => backendAPI.subscribeToNewsletter(params, body, query),
    });
  },

  useSubmitContactFormMutation() {
    return useMutation<
      dto.SubmitContactFormResponse,
      Error,
      { params: dto.SubmitContactFormParams; body: dto.SubmitContactFormBody; query: dto.SubmitContactFormQuery }
    >({
      mutationFn: ({ params, body, query }) => backendAPI.submitContactForm(params, body, query),
    });
  },

  useCreatePortalSessionMutation() {
    return useMutation<CreatePortalSessionResponse, Error, { body: CreatePortalSessionBody }>({
      mutationFn: ({ body }) => backendAPI.createPortalSession(body),
    });
  },
};
