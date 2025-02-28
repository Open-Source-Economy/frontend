import {
  ContributorVisibility,
  Credit,
  CreditUnit,
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
  StripeProductId
} from "src/model";
import { BackendAPI } from "src/services";
import Decimal from "decimal.js";
import * as dto from "src/dtos";
import { issue, issueId, owner, repository, user, userId } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { getCampaignDescription, getMaintainers } from "../services/data";
import { StatusCodes } from "http-status-codes";
import { pekkoGetProjectServicesResponse } from "../services/data/getProjectServiceResponses";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(params: dto.GetIssueParams, query: dto.GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const financialIssues = await this.getAllFinancialIssues({}, {});
    if (financialIssues instanceof ApiError) return financialIssues;
    else return financialIssues[0];
  }

  async getAllFinancialIssues(params: dto.GetIssuesParams, query: dto.GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const financialIssues: FinancialIssue[] = [];

    const requestedCreditAmount = 12;

    for (const managedIssue of allManagedIssues(requestedCreditAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: FinancialIssue;
        if (i === 0) {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, []);
        } else {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, [issueFunding((requestedCreditAmount / 2) * i)]);
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  }

  async getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<Credit | ApiError> {
    return Promise.resolve({
      unit: CreditUnit.MINUTE,
      amount: new Decimal(20),
    });
  }

  async fundIssue(params: dto.FundIssueParams, body: dto.FundIssueBody, query: dto.FundIssueQuery): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async login(): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async requestFunding(
    params: dto.RequestIssueFundingParams,
    body: dto.RequestIssueFundingBody,
    query: dto.RequestIssueFundingQuery,
  ): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse | ApiError> {
    return {
      owner: owner,
    };
  }

  async getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<ApiError | dto.GetRepositoryResponse> {
    return {
      owner: owner,
      repository: repository(),
    };
  }

  async getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse | ApiError> {
    return {
      project: {
        id: Project.getId(params.owner, params.repo),
        owner: owner,
        repository: repository(),
      },
    };
  }

  async getMaintainers(params: dto.GetMaintainersParams, query: dto.GetMaintainersQuery): Promise<dto.GetMaintainersResponse | ApiError> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      return new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getPrices(params: dto.GetPricesParams, query: dto.GetPricesQuery): Promise<ApiError | dto.GetPricesResponse> {
    const stripePrice: StripePrice = {
      stripeId: new StripePriceId("StripePriceId"),
      productId: new StripeProductId("StripeProductId"),
      active: false,
      currency: Currency.CHF,
      unitAmount: 20,
      type: PriceType.ONE_TIME,
    };

    // Helper function to create a Price object
    function createPrice(stripePrice: StripePrice): dto.Price {
      return {
        totalAmount: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
        quantity: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
        label: "Random label", // Add meaningful labels if needed
        price: stripePrice,
      };
    }

    const prices: Record<PriceType, Record<Currency, Record<ProductType, dto.Price[]>>> = {} as any;

    for (const priceType of Object.values(PriceType)) {
      if (!prices[priceType]) {
        prices[priceType] = {} as any;
      }

      for (const currency of Object.values(Currency)) {
        if (!prices[priceType][currency]) {
          prices[priceType][currency] = {} as any;
        }

        for (const productType of Object.values(ProductType)) {
          const priceArray: dto.Price[] = [];
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

  async getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError> {
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

  async checkout(params: dto.CheckoutParams, body: dto.CheckoutBody, query: dto.CheckoutQuery): Promise<ApiError | dto.CheckoutResponse> {
    return {} as dto.CheckoutResponse;
  }

  async setUserPreferredCurrency(
    params: dto.SetUserPreferredCurrencyParams,
    body: dto.SetUserPreferredCurrencyBody,
    query: dto.SetUserPreferredCurrencyQuery,
  ): Promise<dto.SetUserPreferredCurrencyResponse | ApiError> {
    return {};
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
    return Promise.resolve({ success: {} });
  }
}

function issueFunding(amount: number): IssueFunding {
  return new IssueFunding(new IssueFundingId(Math.random().toString()), issueId, userId, amount);
}

function allManagedIssues(requestedCreditAmount: number): ManagedIssue[] {
  const allManagedIssues: ManagedIssue[] = [];

  for (const visibility of Object.values(ContributorVisibility)) {
    for (const state of Object.values(ManagedIssueState)) {
      const managedIssue: ManagedIssue = {
        id: new ManagedIssueId(Math.random().toString()),
        githubIssueId: issueId,
        requestedCreditAmount: requestedCreditAmount,
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
