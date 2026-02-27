import * as dto from "@open-source-economy/api-types";
import { useMutation } from "@tanstack/react-query";
import { communicationService } from "src/services";

export const communicationHooks = {
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
      mutationFn: ({ params, body, query }) => communicationService.subscribeToNewsletter(params, body, query),
    });
  },

  useSubmitContactFormMutation() {
    return useMutation<
      dto.SubmitContactFormResponse,
      Error,
      { params: dto.SubmitContactFormParams; body: dto.SubmitContactFormBody; query: dto.SubmitContactFormQuery }
    >({
      mutationFn: ({ params, body, query }) => communicationService.submitContactForm(params, body, query),
    });
  },
};
