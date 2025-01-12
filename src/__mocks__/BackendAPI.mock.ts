import {
  ContributorVisibility,
  Currency,
  FinancialIssue,
  IssueFunding,
  IssueFundingId,
  IssueId,
  ManagedIssue,
  ManagedIssueId,
  ManagedIssueState,
  PriceType,
  ProductType,
  StripePrice,
  StripePriceId,
  StripeProductId,
  UserId,
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
  GetRepositoryParams,
  GetRepositoryQuery,
  GetRepositoryResponse,
  Price,
  RequestIssueFundingBody,
  RequestIssueFundingParams,
  RequestIssueFundingQuery,
} from "src/dtos";
import { issue, issueId, owner, repository, user, userId } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { pekkoMaintainers } from "../services/data";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(params: GetIssueParams, query: GetIssueQuery): Promise<FinancialIssue | ApiError> {
    const financialIssues = await this.getAllFinancialIssues({}, {});
    if (financialIssues instanceof ApiError) return financialIssues;
    else return financialIssues[0];
  }

  async getAllFinancialIssues(params: GetIssuesParams, query: GetIssueQuery): Promise<FinancialIssue[] | ApiError> {
    const financialIssues: FinancialIssue[] = [];

    const requestedDowAmount = 12;

    for (const managedIssue of allManagedIssues(requestedDowAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: FinancialIssue;
        if (i === 0) {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, []);
        } else {
          financialIssue = new FinancialIssue(owner, repository(), issue, user, managedIssue, [issueFunding((requestedDowAmount / 2) * i)]);
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

  async rejectFunding(userId: UserId, issueId: IssueId): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async requestFunding(params: RequestIssueFundingParams, body: RequestIssueFundingBody, query: RequestIssueFundingQuery): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async splitFunding(userId: UserId, issueId: IssueId, funders: [UserId, Decimal][]): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async updateIssueGitHubStatus(issueId: IssueId, status: string): Promise<void | ApiError> {
    return Promise.resolve(undefined);
  }

  async getOwner(params: GetOwnerParams, query: GetOwnerQuery): Promise<GetOwnerResponse | ApiError> {
    return {
      owner: owner,
    };
  }
  async getRepository(params: GetRepositoryParams, query: GetRepositoryQuery): Promise<GetRepositoryResponse | ApiError> {
    return {
      owner: owner,
      repository: repository(),
    };
  }

  async getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse | ApiError> {
    return {
      maintainers: pekkoMaintainers,
    };
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
        [Currency.AUD]: 400,
        [Currency.CAD]: 400,
        [Currency.ILS]: 400,
        [Currency.JPY]: 400,
        [Currency.CNY]: 400,
        [Currency.INR]: 400,
        [Currency.BRL]: 400,
        [Currency.ZAR]: 400,
        [Currency.MXN]: 400,
        [Currency.SGD]: 400,
        [Currency.NZD]: 400,
      },
      targetAmount: {
        [Currency.CHF]: 10000,
        [Currency.EUR]: 10000,
        [Currency.USD]: 10000,
        [Currency.GBP]: 10000,
        [Currency.AUD]: 10000,
        [Currency.CAD]: 10000,
        [Currency.ILS]: 10000,
        [Currency.JPY]: 10000,
        [Currency.CNY]: 10000,
        [Currency.INR]: 10000,
        [Currency.BRL]: 10000,
        [Currency.ZAR]: 10000,
        [Currency.MXN]: 10000,
        [Currency.SGD]: 10000,
        [Currency.NZD]: 10000,
      },
      numberOfBackers: 300,
      numberOfDaysLeft: 333,
    };
  }

  async checkout(params: CheckoutParams, body: CheckoutBody, query: CheckoutQuery): Promise<ApiError | CheckoutResponse> {
    return {} as CheckoutResponse;
  }
}

function issueFunding(amount: number): IssueFunding {
  return new IssueFunding(new IssueFundingId(Math.random().toString()), issueId, userId, new Decimal(amount));
}

function allManagedIssues(requestedDowAmount: number): ManagedIssue[] {
  const allManagedIssues: ManagedIssue[] = [];

  for (const visibility of Object.values(ContributorVisibility)) {
    for (const state of Object.values(ManagedIssueState)) {
      const managedIssue: ManagedIssue = {
        id: new ManagedIssueId(Math.random().toString()),
        githubIssueId: issueId,
        requestedDowAmount: new Decimal(requestedDowAmount),
        managerId: userId,
        contributorVisibility: visibility,
        state: state,
      };
      allManagedIssues.push(managedIssue);
    }
  }

  return allManagedIssues;
}
