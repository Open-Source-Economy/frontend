import * as dto from "@open-source-economy/api-types";
import {
  GetIssuesParams,
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
  GetProjectAccordionParams,
  GetProjectAccordionQuery,
  GetProjectAccordionResponse,
  GetSponsorsParams,
  GetSponsorsQuery,
} from "src/ultils/local-types";
import { BackendAPI, CreatePortalSessionBody, CreatePortalSessionResponse } from "src/services/BackendAPI";
import { issue, issueId, owner, repository, userId } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { getMaintainers } from "../services/data";
import { StatusCodes } from "http-status-codes";
import { pekkoGetProjectServicesResponse } from "../services/data/getProjectServiceResponses";
import { getSponsors } from "../services/data/sponsors";
import { SponsorDescription } from "../model";
import { getProjectAccordion } from "../services/data/accordions/getAccordions";
import { projectItemsDatabase } from "./projectItemsData";

export class BackendAPIMock implements BackendAPI {
  async getFinancialIssue(_params: dto.GetIssueParams, _query: dto.GetIssueQuery): Promise<dto.FinancialIssue> {
    const financialIssues = await this.getAllFinancialIssues({}, {});
    return financialIssues[0];
  }

  async getAllFinancialIssues(_params: GetIssuesParams, _query: dto.GetIssueQuery): Promise<dto.FinancialIssue[]> {
    const financialIssues: dto.FinancialIssue[] = [];

    const requestedCreditAmount = 12;

    for (const managedIssue of allManagedIssues(requestedCreditAmount)) {
      for (let i = 0; i < 4; i++) {
        let financialIssue: dto.FinancialIssue;
        if (i === 0) {
          financialIssue = {
            owner: owner,
            repository: repository(),
            issue: issue,
            managedIssue: managedIssue,
            issueFundings: [],
          };
        } else {
          financialIssue = {
            owner: owner,
            repository: repository(),
            issue: issue,
            managedIssue: managedIssue,
            issueFundings: [issueFunding((requestedCreditAmount / 2) * i)],
          };
        }
        financialIssues.push(financialIssue);
      }
    }
    return financialIssues;
  }

  async getAvailableCredits(
    _params: dto.GetAvailableCreditsParams,
    _query: dto.GetAvailableCreditsQuery
  ): Promise<dto.GetAvailableCreditsResponse> {
    return Promise.resolve({ creditAmount: 60 });
  }

  async fundIssue(_params: dto.FundIssueParams, _body: dto.FundIssueBody, _query: dto.FundIssueQuery): Promise<void> {
    return Promise.resolve(undefined);
  }

  async login(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async requestFunding(
    _params: dto.RequestIssueFundingParams,
    _body: dto.RequestIssueFundingBody,
    _query: dto.RequestIssueFundingQuery
  ): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getOwner(_params: dto.GetOwnerParams, _query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse> {
    return {
      owner: owner,
    };
  }

  async getRepository(
    _params: dto.GetRepositoryParams,
    _query: dto.GetRepositoryQuery
  ): Promise<dto.GetRepositoryResponse> {
    return {
      owner: owner,
      repository: repository(),
    };
  }

  async getProject(_params: dto.GetProjectParams, _query: dto.GetProjectQuery): Promise<dto.GetProjectResponse> {
    return {
      project: {
        owner: owner,
        repository: repository(),
      },
    };
  }

  async getProjects(_params: dto.GetProjectsParams, _query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse> {
    const repo = repository();
    return {
      projects: [
        {
          owner: owner,
        },
        {
          owner: owner,
          repository: repo,
        },
      ],
    };
  }

  async getProjectDetails(
    params: dto.GetProjectDetailsParams,
    _query: dto.GetProjectDetailsQuery
  ): Promise<dto.GetProjectDetailsResponse> {
    const projectItem =
      projectItemsDatabase.find((item) => {
        const source = item.projectItem.sourceIdentifier;
        if (typeof source === "string") {
          return source.includes(params.owner) && (!params.repo || source.includes(params.repo));
        }
        return false;
      }) ?? projectItemsDatabase[0];

    const developers: Record<string, dto.ProjectDeveloperProfile> = {};
    for (const developer of projectItem.developers) {
      const mockUser = {
        id: `mock-user-${developer.developerProfile.id}` as dto.UserId,
        name: developer.developerOwner.name ?? developer.developerOwner.id,
        role: dto.UserRole.USER,
      } as unknown as dto.User;

      developers[developer.developerProfile.id] = {
        profileEntry: {
          profile: developer.developerProfile,
          owner: developer.developerOwner,
          user: mockUser,
          verificationRecords: [],
        },
        settings: null,
        project: {
          projectItem: projectItem.projectItem,
          developerProjectItem: developer.developerProjectItem,
          verificationRecords: [],
        },
        services: {},
      };
    }

    return {
      project: {
        projectItem: projectItem.projectItem,
        owner: projectItem.owner,
        repository: projectItem.repository,
      },
      developers,
      service: [],
      serviceOfferings: {},
    };
  }

  async getMaintainers(params: GetMaintainersParams, _query: GetMaintainersQuery): Promise<GetMaintainersResponse> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  }

  async getProjectAccordion(
    params: GetProjectAccordionParams,
    _query: GetProjectAccordionQuery
  ): Promise<GetProjectAccordionResponse> {
    return getProjectAccordion(params.owner, params.repo);
  }

  async getSponsors(params: GetSponsorsParams, _query: GetSponsorsQuery): Promise<SponsorDescription[]> {
    return getSponsors(params.owner, params.repo);
  }

  async getCampaign(_params: dto.GetCampaignParams, _query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse> {
    return {
      prices: getPrices(),
      raisedAmount: {
        [dto.Currency.CHF]: 400,
        [dto.Currency.EUR]: 400,
        [dto.Currency.USD]: 400,
        [dto.Currency.GBP]: 400,
      },
      targetAmount: {
        [dto.Currency.CHF]: 10000,
        [dto.Currency.EUR]: 10000,
        [dto.Currency.USD]: 10000,
        [dto.Currency.GBP]: 10000,
      },
      numberOfBackers: 300,
      numberOfDaysLeft: 333,
    };
  }

  async getPlans(_params: dto.GetPlansParams, _query: dto.GetPlansQuery): Promise<dto.GetPlansResponse> {
    // Extract enum values properly, avoiding TypeScript enum peculiarities
    const planTypes = Object.keys(dto.PlanProductType)
      .filter((key) => isNaN(Number(key)))
      .map((key) => dto.PlanProductType[key as keyof typeof dto.PlanProductType]);

    const currencies = Object.values(dto.Currency).filter((value): value is dto.Currency => typeof value === "string");

    const priceTypes = Object.values(dto.PlanPriceType).filter(
      (value): value is dto.PlanPriceType => typeof value === "string"
    );

    // Define price generation strategy with more realistic values
    const getPriceAmount = (_planType: dto.PlanProductType, priceType: dto.PlanPriceType): number => {
      // Apply discount for annual pricing
      const multiplier = priceType === dto.PlanPriceType.ANNUALLY ? 0.8 * 12 : 1; // 20% discount for annual
      return Math.round(69_00 * multiplier);
    };

    // Create a type-safe StripePrice factory function
    const createPrice = (
      planType: dto.PlanProductType,
      priceType: dto.PlanPriceType,
      currency: dto.Currency
    ): dto.StripePrice => {
      const amount = getPriceAmount(planType, priceType);
      const id = `price_${planType}_${priceType}_${currency.toLowerCase()}`;

      return {
        stripeId: id as dto.StripePriceId,
        productId: planType.toString() as dto.StripeProductId,
        unitAmount: amount,
        currency: currency,
        active: true,
        type: priceType as unknown as dto.PriceType,
      };
    };

    // Build the plans object with proper typing
    const plans: Record<
      dto.PlanProductType,
      Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>
    > = {} as Record<dto.PlanProductType, Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>>;

    // Generate each plan
    for (const planType of planTypes) {
      // Build price mappings for this product
      const priceMappings = {} as Record<dto.Currency, Record<dto.PlanPriceType, dto.StripePrice>>;

      for (const currency of currencies) {
        priceMappings[currency] = {} as Record<dto.PlanPriceType, dto.StripePrice>;

        for (const priceType of priceTypes) {
          priceMappings[currency][priceType] = createPrice(planType, priceType, currency);
        }
      }

      plans[planType] = priceMappings;
    }

    return { plans };
  }

  async getUserPlan(_params: dto.GetUserPlanParams, _query: dto.GetUserPlanQuery): Promise<dto.GetUserPlanResponse> {
    return { productType: dto.PlanProductType.SCALE_UP_PLAN, priceType: dto.PlanPriceType.ANNUALLY };
  }

  async checkout(
    _params: dto.CheckoutParams,
    _body: dto.CheckoutBody,
    _query: dto.CheckoutQuery
  ): Promise<dto.CheckoutResponse> {
    return { redirectUrl: "https://checkout.stripe.com/c/pay/cs_test_a1WpXh4fW6XG9J5vYyZ2M3Q4R5T6U7V8W9X0" };
  }

  async setUserPreferredCurrency(
    _params: dto.SetPreferredCurrencyParams,
    _body: dto.SetPreferredCurrencyBody,
    _query: dto.SetPreferredCurrencyQuery
  ): Promise<dto.SetPreferredCurrencyResponse> {
    return {};
  }

  async getProjectServices(
    params: dto.GetProjectServicesParams,
    _query: dto.GetProjectServicesQuery
  ): Promise<dto.GetProjectServicesResponse> {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
  }

  async subscribeToNewsletter(
    _params: dto.SubscribeNewsletterParams,
    _body: dto.SubscribeNewsletterBody,
    _query: dto.SubscribeNewsletterQuery
  ): Promise<dto.SubscribeNewsletterResponse> {
    return Promise.resolve({ success: {} });
  }

  async getProjectItemsWithDetails(
    _params: dto.GetProjectItemsWithDetailsParams,
    _query: dto.GetProjectItemsWithDetailsQuery
  ): Promise<dto.GetProjectItemsWithDetailsResponse> {
    // Group project items by type
    const repositories = projectItemsDatabase.filter(
      (item) => item.projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY
    );
    const owners = projectItemsDatabase.filter(
      (item) => item.projectItem.projectItemType === dto.ProjectItemType.GITHUB_OWNER
    );
    const urls = projectItemsDatabase.filter((item) => item.projectItem.projectItemType === dto.ProjectItemType.URL);

    // Calculate stats
    const totalStars = repositories.reduce((sum, item) => sum + (item.repository?.stargazersCount || 0), 0);
    const totalForks = repositories.reduce((sum, item) => sum + (item.repository?.forksCount || 0), 0);
    const totalFollowers = owners.reduce((sum, item) => sum + (item.owner?.followers || 0), 0);
    const uniqueMaintainers = new Set(
      projectItemsDatabase.flatMap((item) => item.developers.map((dev) => dev.developerProfile.id))
    );

    return Promise.resolve({
      repositories,
      owners,
      urls,
      stats: {
        totalProjects: projectItemsDatabase.length,
        totalMaintainers: uniqueMaintainers.size,
        totalStars,
        totalForks,
        totalFollowers,
      },
    });
  }

  async submitContactForm(
    _params: dto.SubmitContactFormParams,
    _body: dto.SubmitContactFormBody,
    _query: dto.SubmitContactFormQuery
  ): Promise<dto.SubmitContactFormResponse> {
    return Promise.resolve({});
  }

  async createPortalSession(_body: CreatePortalSessionBody): Promise<CreatePortalSessionResponse> {
    return Promise.resolve({ url: "https://billing.stripe.com/p/session/test_123" });
  }
}

function issueFunding(amount: number): dto.IssueFunding {
  return {
    id: Math.random().toString() as dto.IssueFundingId,
    githubIssueId: issueId,
    userId: userId,
    credit: amount,
  };
}

function allManagedIssues(requestedCreditAmount: number): dto.ManagedIssue[] {
  const allManagedIssues: dto.ManagedIssue[] = [];

  for (const visibility of Object.values(dto.ContributorVisibility)) {
    for (const state of Object.values(dto.ManagedIssueState)) {
      const managedIssue: dto.ManagedIssue = {
        id: Math.random().toString() as dto.ManagedIssueId,
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
function createPrice(stripePrice: dto.StripePrice): dto.Price {
  return {
    totalAmount: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
    quantity: Math.floor(Math.random() * 90000) + 10000, // Random 5-digit integer
    label: "Random label", // Add meaningful labels if needed
    price: stripePrice,
  };
}

function getPrices(): Record<
  dto.CampaignPriceType,
  Record<dto.Currency, Record<dto.CampaignProductType, dto.Price[]>>
> {
  const stripePrice: dto.StripePrice = {
    stripeId: "StripePriceId" as dto.StripePriceId,
    productId: "StripeProductId" as dto.StripeProductId,
    active: false,
    currency: dto.Currency.CHF,
    unitAmount: 20,
    type: dto.PriceType.ONE_TIME,
  };

  const prices: Record<dto.PriceType, Record<dto.Currency, Record<dto.ProductType, dto.Price[]>>> = {} as any;

  for (const priceType of Object.values(dto.PriceType)) {
    if (!prices[priceType]) {
      prices[priceType] = {} as any;
    }

    for (const currency of Object.values(dto.Currency)) {
      if (!prices[priceType][currency]) {
        prices[priceType][currency] = {} as any;
      }

      for (const productType of Object.values(dto.ProductType)) {
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
