import * as dto from "@open-source-economy/api-types";
import { FinancialIssue } from "@open-source-economy/api-types";
import { BackendAPIMock } from "src/__mocks__";
import { api, handleError, projectPath } from "./index"; // Import the 'api' instance
import { ApiError } from "src/ultils/error/ApiError";
import { useAuth as _useAuth } from "../views/auth";

// Temporary local definitions until api-types package is updated/linked
export interface CreatePortalSessionBody {
  returnUrl: string;
}
export interface CreatePortalSessionResponse {
  url: string;
}

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

  getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue>;

  getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[]>;

  getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse>;

  /**
   * Funds a specific issue.
   * @returns
   *
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   * @throws {Error} If there are insufficient funds.
   */
  fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void>;

  /**
   * Request or approve funding for an issue.
   *
   * @throws {Error} If the issue is already got requested funding.
   * @throws {Error} If the issue is closed.
   * @throws {Error} If the userId or issueId is invalid or not found.
   * @throws {Error} If the amount is not a positive number.
   */
  requestFunding(params: dto.RequestIssueFundingParams, body: dto.RequestIssueFundingBody, query: dto.RequestIssueFundingQuery): Promise<void>;

  getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse>;

  getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse>;

  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse>;

  getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse>;

  getProjectDetails(params: dto.GetProjectDetailsParams, query: dto.GetProjectDetailsQuery): Promise<dto.GetProjectDetailsResponse>;

  // TODO: probably remove this method, and query the data from the project
  getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse>;

  // TODO: probably remove this method, and query the data from the project
  getProjectAccordion(params: dto.GetProjectAccordionParams, query: dto.GetProjectAccordionQuery): Promise<dto.GetProjectAccordionResponse>;

  // TODO: probably remove this method, and query the data from the project
  getSponsors(params: dto.GetSponsorsParams, query: dto.GetSponsorsQuery): Promise<SponsorDescription[]>;

  getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse>;

  getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse>;

  // TODO: probably remove this method, and query the data from the project
  getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse>;

  checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<dto.CheckoutResponse>;

  setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse>;

  getProjectServices(params: dto.GetProjectServicesParams, query: dto.GetProjectServicesQuery): Promise<dto.GetProjectServicesResponse>;

  subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse>;

  submitContactForm(params: dto.ContactFormParams, body: dto.ContactFormBody, query: dto.ContactFormQuery): Promise<dto.ContactFormResponse>;

  getProjectItemsWithDetails(
    params: dto.GetProjectItemsWithDetailsParams,
    query: dto.GetProjectItemsWithDetailsQuery,
  ): Promise<dto.GetProjectItemsWithDetailsResponse>;

  createPortalSession(body: CreatePortalSessionBody): Promise<CreatePortalSessionResponse>;
}

class BackendAPIImpl implements BackendAPI {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getFinancialIssue(params: dto.GetIssueParams, _query: dto.GetIssueQuery): Promise<FinancialIssue> {
    const response = await handleError<dto.GetIssueResponse>(
      () => this.api.get(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}`, { withCredentials: true }),
      "getFinancialIssue",
    );
    return response.issue;
  }

  async getAllFinancialIssues(_params: dto.GetIssuesParams, _query: dto.GetIssueQuery): Promise<FinancialIssue[]> {
    const response = await handleError<dto.GetIssuesResponse>(
      () => this.api.get(`${config.api.url}/projects/all-financial-issues`, { withCredentials: true }),
      "getAllFinancialIssues",
    );
    return response.issues;
  }

  async getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError<dto.GetAvailableCreditsResponse>(
      () => this.api.get(`${config.api.url}/user/available-credit?${queryParams}`, { withCredentials: true }),
      "getAvailableCredits",
    );
  }

  async fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, _query: dto.FundIssueQuery): Promise<void> {
    return handleError(
      () => this.api.post(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding`, body, { withCredentials: true }),
      "fundIssue",
    );
  }

  async requestFunding(params: dto.RequestIssueFundingParams, body: dto.RequestIssueFundingBody, _query: dto.RequestIssueFundingQuery): Promise<void> {
    return handleError(
      () =>
        this.api.post(`${config.api.url}/projects/repos/${params.owner}/${params.repo}/issues/${params.number}/funding/requests`, body, {
          withCredentials: true,
        }),
      "requestFunding",
    );
  }

  async getOwner(params: dto.GetOwnerParams, _query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse> {
    return handleError(() => this.api.get(`${config.api.url}/github/owners/${params.owner}`, { withCredentials: true }), "getOwner");
  }

  async getRepository(params: dto.GetRepositoryParams, _query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse> {
    return handleError(() => this.api.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}`, { withCredentials: true }), "getRepository");
  }

  async getProject(params: dto.GetProjectParams, _query: dto.GetProjectQuery): Promise<dto.GetProjectResponse> {
    return handleError(() => this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}`, { withCredentials: true }), "getProject");
  }

  async getProjects(_params: dto.GetProjectsParams, _query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse> {
    return handleError(() => this.api.get(`${config.api.url}/projects`, { withCredentials: true }), "getProjects");
  }

  async getProjectDetails(params: dto.GetProjectDetailsParams, _query: dto.GetProjectDetailsQuery): Promise<dto.GetProjectDetailsResponse> {
    return handleError(
      () => this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}/details`, { withCredentials: true }),
      "getProjectDetails",
    );
  }

  async getMaintainers(params: dto.GetMaintainersParams, _query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getProjectAccordion(params: dto.GetProjectAccordionParams, _query: dto.GetProjectAccordionQuery): Promise<dto.GetProjectAccordionResponse> {
    return getProjectAccordion(params.owner, params.repo);
  }

  async getSponsors(params: dto.GetSponsorsParams, _query: dto.GetSponsorsQuery): Promise<SponsorDescription[]> {
    return getSponsors(params.owner, params.repo);
  }

  async getPlans(_params: dto.GetPlansParams, _query: dto.GetPlansQuery): Promise<dto.GetPlansResponse> {
    return handleError(() => this.api.get(`${config.api.url}/plans`, { withCredentials: true }), "getPlans");
  }

  async getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse> {
    let queryParams = "";
    if (query.companyId) queryParams += `companyId=${encodeURIComponent(query.companyId)}`;

    return await handleError(() => this.api.get(`${config.api.url}/user/plan?${queryParams}`, { withCredentials: true }), "getUserPlan");
  }

  async getCampaign(params: dto.GetCampaignParams, _query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse> {
    return handleError(
      () => this.api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}/campaigns`, { withCredentials: true }),
      "getCampaign",
    );
  }

  async checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, _query: dto.CheckoutQuery): Promise<dto.CheckoutResponse> {
    return handleError(() => this.api.post(`${config.api.url}/stripe/checkout`, body, { withCredentials: true }), "checkout");
  }

  async setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    _query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse> {
    return handleError(
      () => this.api.post(`${config.api.url}/user/preferred-currency/${params.currency}`, body, { withCredentials: true }),
      "setUserPreferredCurrency",
    );
  }

  async getProjectServices(params: dto.GetProjectServicesParams, _query: dto.GetProjectServicesQuery): Promise<dto.GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async subscribeToNewsletter(
    params: dto.NewsletterSubscriptionParams,
    body: dto.NewsletterSubscriptionBody,
    _query: dto.NewsletterSubscriptionQuery,
  ): Promise<dto.NewsletterSubscriptionResponse> {
    return handleError(() => this.api.post(`${config.api.url}/newsletter`, body, { withCredentials: true }), "subscribeToNewsletter");
  }

  async submitContactForm(params: dto.ContactFormParams, body: dto.ContactFormBody, _query: dto.ContactFormQuery): Promise<dto.ContactFormResponse> {
    return handleError(() => this.api.post(`${config.api.url}/contact`, body, { withCredentials: true }), "submitContactForm");
  }

  async getProjectItemsWithDetails(
    _params: dto.GetProjectItemsWithDetailsParams,
    _query: dto.GetProjectItemsWithDetailsQuery,
  ): Promise<dto.GetProjectItemsWithDetailsResponse> {
    return handleError(() => this.api.get(`${config.api.url}/projects/items/details`, { withCredentials: true }), "getProjectItemsWithDetails");
  }

  async createPortalSession(body: CreatePortalSessionBody): Promise<CreatePortalSessionResponse> {
    return handleError(() => this.api.post(`${config.api.url}/stripe/portal`, body, { withCredentials: true }), "createPortalSession");
  }
}
