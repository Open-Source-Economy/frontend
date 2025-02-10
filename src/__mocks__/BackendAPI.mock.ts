import {
  ContributorVisibility,
  Currency,
  FinancialIssue,
  IssueFunding,
  IssueFundingId,
  ManagedIssue,
  ManagedIssueId,
  ManagedIssueState,
  PriceType,
  ProductType,
  Project,
  StripePrice,
  StripePriceId,
  StripeProductId,
} from "src/model";
import { BackendAPI } from "src/services";
import Decimal from "decimal.js";
import {
  CheckoutBody,
  CheckoutParams,
  CheckoutQuery,
  CheckoutResponse,
  FundIssueBody,
  FundIssueParams,
  FundIssueQuery,
  GetAvailableDowParams,
  GetAvailableDowQuery,
  GetCampaignParams,
  GetCampaignQuery,
  GetCampaignResponse,
  GetIssueParams,
  GetIssueQuery,
  GetIssuesParams,
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
  GetOwnerParams,
  GetOwnerQuery,
  GetOwnerResponse,
  GetPricesParams,
  GetPricesQuery,
  GetPricesResponse,
  GetProjectParams,
  GetProjectQuery,
  GetProjectResponse,
  GetProjectServicesParams,
  GetProjectServicesQuery,
  GetProjectServicesResponse,
  GetRepositoryParams,
  GetRepositoryQuery,
  GetRepositoryResponse,
  Price,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
  SetUserPreferredCurrencyBody,
  SetUserPreferredCurrencyParams,
  SetUserPreferredCurrencyQuery,
  SetUserPreferredCurrencyResponse,
} from "src/dtos";
import { issue, issueId, owner, repository, user, userId } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { getCampaignDescription, getMaintainers } from "../services/data";
import { StatusCodes } from "http-status-codes";
import { pekkoGetProjectServicesResponse } from "../services/data/getProjectServiceResponses";
import {
  NewsletterSubscriptionBody,
  NewsletterSubscriptionParams,
  NewsletterSubscriptionQuery,
  NewsletterSubscriptionResponse,
} from "../dtos/NewsletterSubscription.dto";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const financialIssues = await this.getAllFinancialIssues({}, {});
    if (financialIssues instanceof ApiError) return financialIssues;
    else return financialIssues[0];
  }

  async getAllFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const financialIssues: FinancialIssue[] = [];

    const requestedMilliDowAmount = 12;

    for (const managedIssue of allManagedIssues(requestedMilliDowAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: FinancialIssue;
        if (i === 0) {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, []);
        } else {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, [issueFunding((requestedMilliDowAmount / 2) * i)]);
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  }

  async getAvailableDow(params: GetAvailableDowParams, query: GetAvailableDowQuery): Promise<Decimal | ApiError> {
    return Promise.resolve(new Decimal(2));
  }

  async fundIssue(params: FundIssueParams, body: FundIssueBody, query: FundIssueQuery): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async login(): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError> {
    return {
      owner: owner,
    };
  }

  async getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<ApiError | GetRepositoryResponse> {
    return {
      owner: owner,
      repository: repository(),
    };
  }

  async getProject(params: GetProjectParams, query: GetProjectQuery): Promise<GetProjectResponse | ApiError> {
    return {
      project: {
        id: Project.getId(params.owner, params.repo),
        owner: owner,
        repository: repository(),
      },
    };
  }

  async getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      return new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getPrices(params: GetPricesParams, query: GetPricesQuery): Promise<ApiError | GetPricesResponse> {
    const stripePrice: StripePrice = {
      stripeId: new StripePriceId("StripePriceId"),
      productId: new StripeProductId("StripeProductId"),
      active: false,
      currency: Currency.CHF,
      unitAmount: 20,
      type: PriceType.ONE_TIME,
    };

    // Helper function to create a Price object
    function createPrice(stripePrice: StripePrice): Price {
      return {
        totalAmount: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
        quantity: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
        label: "Random label", // Add meaningful labels if needed
        price: stripePrice,
      };
    }

    const prices: Record<PriceType, Record<Currency, Record<ProductType, Price[]>>> = {} as any;

    for (const priceType of Object.values(PriceType)) {
      if (!prices[priceType]) {
        prices[priceType] = {} as any;
      }

      for (const currency of Object.values(Currency)) {
        if (!prices[priceType][currency]) {
          prices[priceType][currency] = {} as any;
        }

        for (const productType of Object.values(ProductType)) {
          const priceArray: Price[] = [];
          for (let i = 0; i < 5; i++) {
            priceArray.push(createPrice(stripePrice));
          }
          prices[priceType][currency][productType] = priceArray;
        }
      }
    }

    return {
      prices: prices,
    };
  }

  async getCampaign(params: GetCampaignParams, query: GetCampaignQuery): Promise<GetCampaignResponse | ApiError> {
    const response = await this.getPrices({ owner: params.owner, repo: params.repo }, {});
    if (response instanceof ApiError) return response;

    return {
      prices: response.prices,
      raisedAmount: {
        [Currency.CHF]: 400,
        [Currency.EUR]: 400,
        [Currency.USD]: 400,
        [Currency.GBP]: 400,
      },
      targetAmount: {
        [Currency.CHF]: 10000,
        [Currency.EUR]: 10000,
        [Currency.USD]: 10000,
        [Currency.GBP]: 10000,
      },
      numberOfBackers: 300,
      numberOfDaysLeft: 333,
      description: getCampaignDescription(Project.getId(params.owner, params.repo)),
    };
  }

  async checkout(params: CheckoutParams, body: CheckoutBody, query: CheckoutQuery): Promise<ApiError | CheckoutResponse> {
    return {} as CheckoutResponse;
  }

  async setUserPreferredCurrency(
    params: SetUserPreferredCurrencyParams,
    body: SetUserPreferredCurrencyBody,
    query: SetUserPreferredCurrencyQuery,
  ): Promise<SetUserPreferredCurrencyResponse | ApiError> {
    return {};
  }

  async getProjectServices(params: GetProjectServicesParams, query: GetProjectServicesQuery): Promise<ApiError | GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    return new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async subscribeToNewsletter(
    params: NewsletterSubscriptionParams,
    body: NewsletterSubscriptionBody,
    query: NewsletterSubscriptionQuery,
  ): Promise<NewsletterSubscriptionResponse | ApiError> {
    return Promise.resolve({ success: {} });
  }
}

function issueFunding(amount: number): IssueFunding {
  return new IssueFunding(new IssueFundingId(Math.random().toString()), issueId, userId, amount);
}

function allManagedIssues(requestedMilliDowAmount: number): ManagedIssue[] {
  const allManagedIssues: ManagedIssue[] = [];

  for (const visibility of Object.values(ContributorVisibility)) {
    for (const state of Object.values(ManagedIssueState)) {
      const managedIssue: ManagedIssue = {
        id: new ManagedIssueId(Math.random().toString()),
        githubIssueId: issueId,
        requestedMilliDowAmount: requestedMilliDowAmount,
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
