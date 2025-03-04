import {
  CampaignPriceType,
  CampaignProductType,
  ContributorVisibility,
  Currency,
  FinancialIssue,
  IssueFunding,
  IssueFundingId,
  ManagedIssue,
  ManagedIssueId,
  ManagedIssueState,
  PlanPriceType,
  PlanProductType,
  PriceType,
  ProductType,
  Project,
  StripePrice,
  StripePriceId,
  StripeProductId,
} from "src/api/model";
import { BackendAPI } from "src/services";
import * as dto from "src/api/dto";
import { Price } from "src/api/dto";
import { issue, issueId, owner, repository, user, userId } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { getMaintainers } from "../services/data";
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

  async getAvailableCredits(params: dto.GetAvailableCreditsParams, query: dto.GetAvailableCreditsQuery): Promise<dto.GetAvailableCreditsResponse | ApiError> {
    return Promise.resolve({ creditAmount: 20 });
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

  async getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse | ApiError> {
    return {
      prices: getPrices(),
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
    };
  }

  async getPlans(params: dto.GetPlansParams, query: dto.GetPlansQuery): Promise<dto.GetPlansResponse | ApiError> {
    // Extract enum values properly, avoiding TypeScript enum peculiarities
    const planTypes = Object.keys(PlanProductType)
      .filter(key => isNaN(Number(key)))
      .map(key => PlanProductType[key as keyof typeof PlanProductType]);

    const currencies = Object.values(Currency).filter((value): value is Currency => typeof value === "string");

    const priceTypes = Object.values(PlanPriceType).filter((value): value is PlanPriceType => typeof value === "string");

    // Define price generation strategy with more realistic values
    const getPriceAmount = (planType: PlanProductType, priceType: PlanPriceType): number => {
      // Apply discount for annual pricing
      const multiplier = priceType === PlanPriceType.ANNUALLY ? 0.8 : 1; // 20% discount for annual
      return Math.round(69 * multiplier);
    };

    // Create a type-safe StripePrice factory function
    const createPrice = (planType: PlanProductType, priceType: PlanPriceType, currency: Currency): StripePrice => {
      const amount = getPriceAmount(planType, priceType);
      const id = `price_${planType}_${priceType}_${currency.toLowerCase()}`;

      return new StripePrice(new StripePriceId(id), new StripeProductId(planType.toString()), amount, currency, true, priceTypes as unknown as PriceType);
    };

    // Build the plans object with proper typing
    const plans: Record<PlanProductType, Record<Currency, Record<PlanPriceType, StripePrice>>> = {} as Record<
      PlanProductType,
      Record<Currency, Record<PlanPriceType, StripePrice>>
    >;

    // Generate each plan
    for (const planType of planTypes) {
      // Build price mappings for this product
      const priceMappings = {} as Record<Currency, Record<PlanPriceType, StripePrice>>;

      for (const currency of currencies) {
        priceMappings[currency] = {} as Record<PlanPriceType, StripePrice>;

        for (const priceType of priceTypes) {
          priceMappings[currency][priceType] = createPrice(planType, priceType, currency);
        }
      }

      plans[planType] = priceMappings;
    }

    return { plans };
  }

  async getUserPlan(params: dto.GetUserPlanParams, query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse | ApiError> {
    return { productType: PlanProductType.SCALE_UP_PLAN, priceType: PlanPriceType.ANNUALLY };
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

// Helper function to create a Price object
function createPrice(stripePrice: StripePrice): dto.Price {
  return {
    totalAmount: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
    quantity: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
    label: "Random label", // Add meaningful labels if needed
    price: stripePrice,
  };
}

function getPrices(): Record<CampaignPriceType, Record<Currency, Record<CampaignProductType, Price[]>>> {
  const stripePrice: StripePrice = {
    stripeId: new StripePriceId("StripePriceId"),
    productId: new StripeProductId("StripeProductId"),
    active: false,
    currency: Currency.CHF,
    unitAmount: 20,
    type: PriceType.ONE_TIME,
  };

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

  return prices;
}
