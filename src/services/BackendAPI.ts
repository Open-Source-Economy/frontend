import * as dto from "@open-source-economy/api-types";
import { FinancialIssue } from "@open-source-economy/api-types";
import { BackendAPIMock } from "src/__mocks__";
import { api, handleError, projectPath } from "./index"; // Import the 'api' instance
import { ApiError } from "src/ultils/error/ApiError";
import { config } from "src/ultils";
import { StatusCodes } from "http-status-codes";
import { getMaintainers } from "./data";
import { pekkoGetProjectServicesResponse } from "./data/getProjectServiceResponses";
import { getSponsors } from "./data/sponsors";
import { SponsorDescription } from "../model";
import { getProjectAccordion } from "./data/accordions/getAccordions";
import { AxiosInstance } from "axios"; // Import AxiosInstance type

export function getBackendAPI(): BackendAPI {
  if (config.api.useMock) {
    return new BackendAPIMock();
  } else {
    return new BackendAPIImpl(api);
  }
}

export interface BackendAPI {
  /* Getters */

  getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue | ApiError>;

  getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[] | ApiError>;

  getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse | ApiError>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void | ApiError>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(params: dto.RequestIssueFundingParams, body: dto.RequestIssueFundingBody, query: dto.RequestIssueFundingQuery): Promise<void | ApiError>;

  getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse | ApiError>;

  getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse | ApiError>;

  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse | ApiError>;

  getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse | ApiError>;

  // TODO: probably remove this method, and query the data from the project
  getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse | ApiError>;

  // TODO: probably remove this method, and query the data from the project
  getProjectAccordion(params: dto.GetProjectAccordionParams, query: dto.GetProjectAccordionQuery): Promise<dto.GetProjectAccordionResponse | ApiError>;

  // TODO: probably remove this method, and query the data from the project
  getSponsors(params: dto.GetSponsorsParams, query: dto.GetSponsorsQuery): Promise<SponsorDescription[] | ApiError>;

  getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse | ApiError>;

  getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse | ApiError>;

  // TODO: probably remove this method, and query the data from the project
  getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError>;

  checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<dto.CheckoutResponse | ApiError>;

  setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse | ApiError>;

  getProjectServices(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery): Promise<dto.GetProjectServicesResponse | ApiError>;

  subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse | ApiError>;

  submitContactForm(params: dto.ContactFormParams, body: dto.ContactFormBody, query: dto.ContactFormQuery): Promise<dto.ContactFormResponse | ApiError>;

  getProjectItemsWithDetails(
    params: dto.GetProjectItemsWithDetailsParams,
    query: dto.GetProjectItemsWithDetailsQuery,
  ): Promise<dto.GetProjectItemsWithDetailsResponse | ApiError>;
}

class BackendAPIImpl implements BackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const response = await handleError<dto.GetIssueResponse>(
      () => this.api.get(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );

    if (response instanceof ApiError) return response;
    else return response.issue;
  }

  async getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const response = await handleError<dto.GetIssuesResponse>(
      () => this.api.get(`${config.api.url}/projects/all-financial-issues`, { withCredentials: true }),
      "getAllFinancialIssues",
    );
    if (response instanceof ApiError) return response;
    else return response.issues;
  }

  async getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse | ApiError> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError<dto.GetAvailableCreditsResponse>(
      () => this.api.get(`${config.api.url}/user/available-credit?${queryParams}`, { withCredentials: true }),
      "getAvailableCredits",
    );
  }

  async fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void | ApiError> {
    return handleError(
      () => this.api.post(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async requestFunding(
    params: dto.RequestIssueFundingParams,
    body: dto.RequestIssueFundingBody,
    query: dto.RequestIssueFundingQuery,
  ): Promise<void | ApiError> {
    return handleError(
      () =>
        this.api.post(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`, body, {
          withCredentials: true,
        }),
      "requestFunding",
    );
  }

  async getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/github/owners/${params.owner}`, { withCredentials: true }), "getOwner");
  }

  async getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}`, { withCredentials: true }), "getRepository");
  }

  async getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}`, { withCredentials: true }), "getProjects");
  }

  async getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/projects`, { withCredentials: true }), "getProjects");
  }

  async getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse | ApiError> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      return new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getProjectAccordion(params: dto.GetProjectAccordionParams, query: dto.GetProjectAccordionQuery): Promise<dto.GetProjectAccordionResponse | ApiError> {
    return getProjectAccordion(params.owner, params.repo);
  }

  async getSponsors(params: dto.GetSponsorsParams, query: dto.GetSponsorsQuery): Promise<SponsorDescription[] | ApiError> {
    return getSponsors(params.owner, params.repo);
  }

  async getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/plans`, { withCredentials: true }), "getPlans");
  }

  async getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse | ApiError> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError(() => this.api.get(`${config.api.url}/user/plan?${queryParams}`, { withCredentials: true }), "getUserPlan");
  }

  async getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError> {
    return handleError(
      () => this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}/campaigns`, { withCredentials: true }),
      "getCampaign",
    );
  }

  async checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<ApiError | dto.CheckoutResponse> {
    return handleError(() => this.api.post(`${config.api.url}/stripe/checkout`, body, { withCredentials: true }), "checkout");
  }

  async setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse | ApiError> {
    return handleError(
      () => this.api.post(`${config.api.url}/user/preferred-currency/${params.currency}`, body, { withCredentials: true }),
      "setUserPreferredCurrency",
    );
  }

  async getProjectServices(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery): Promise<ApiError | dto.GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse | ApiError> {
    return handleError(() => this.api.post(`${config.api.url}/newsletter`, body, { withCredentials: true }), "subscribeToNewsletter");
  }

  async submitContactForm(params: dto.ContactFormParams, body: dto.ContactFormBody, query: dto.ContactFormQuery): Promise<dto.ContactFormResponse | ApiError> {
    return handleError(() => this.api.post(`${config.api.url}/contact`, body, { withCredentials: true }), "submitContactForm");
  }

  async getProjectItemsWithDetails(
    params: dto.GetProjectItemsWithDetailsParams,
    query: dto.GetProjectItemsWithDetailsQuery,
  ): Promise<dto.GetProjectItemsWithDetailsResponse | ApiError> {
    return handleError(() => this.api.get(`${config.api.url}/projects/items/details`, { withCredentials: true }), "getProjectItemsWithDetails");
  }
}
