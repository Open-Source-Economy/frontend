import * as dto from "@open-source-economy/api-types";
import { api, handleError } from "src/services/apiClient";
import { config } from "src/utils";

export interface CommunicationService {
  subscribeToNewsletter(
    params: dto.SubscribeNewsletterParams,
    body: dto.SubscribeNewsletterBody,
    query: dto.SubscribeNewsletterQuery
  ): Promise<dto.SubscribeNewsletterResponse>;

  submitContactForm(
    params: dto.SubmitContactFormParams,
    body: dto.SubmitContactFormBody,
    query: dto.SubmitContactFormQuery
  ): Promise<dto.SubmitContactFormResponse>;
}

export const communicationServiceImpl: CommunicationService = {
  async subscribeToNewsletter(_params, body, _query) {
    return handleError(
      () => api.post(`${config.api.url}/newsletter`, body, { withCredentials: true }),
      "subscribeToNewsletter"
    );
  },

  async submitContactForm(_params, body, _query) {
    return handleError(
      () => api.post(`${config.api.url}/contact`, body, { withCredentials: true }),
      "submitContactForm"
    );
  },
};
