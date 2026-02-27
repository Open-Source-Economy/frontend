import { CommunicationService } from "src/services/communication.service";

export const communicationServiceMock: CommunicationService = {
  async subscribeToNewsletter(_params, _body, _query) {
    return Promise.resolve({ success: {} });
  },

  async submitContactForm(_params, _body, _query) {
    return Promise.resolve({});
  },
};
