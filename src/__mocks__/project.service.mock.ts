import * as dto from "@open-source-economy/api-types";
import {
  GetMaintainersParams,
  GetMaintainersQuery,
  GetMaintainersResponse,
  GetProjectAccordionParams,
  GetProjectAccordionQuery,
  GetProjectAccordionResponse,
  GetSponsorsParams,
  GetSponsorsQuery,
} from "src/ultils/local-types";
import { ProjectService } from "src/services/project.service";
import { owner, repository } from "./index";
import { ApiError } from "src/ultils/error/ApiError";
import { getMaintainers } from "../services/data";
import { StatusCodes } from "http-status-codes";
import { pekkoGetProjectServicesResponse } from "../services/data/getProjectServiceResponses";
import { getSponsors } from "../services/data/sponsors";
import { SponsorDescription } from "../model";
import { getProjectAccordion } from "../services/data/accordions/getAccordions";
import { projectItemsDatabase } from "./projectItemsData";

export const projectServiceMock: ProjectService = {
  async getOwner(_params, _query) {
    return {
      owner: owner,
    };
  },

  async getRepository(_params, _query) {
    return {
      owner: owner,
      repository: repository(),
    };
  },

  async getProject(_params, _query) {
    return {
      project: {
        owner: owner,
        repository: repository(),
      },
    };
  },

  async getProjects(_params, _query) {
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
  },

  async getProjectDetails(params, _query) {
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
      const mockUser: dto.User = {
        id: `mock-user-${developer.developerProfile.id}` as dto.UserId,
        name: developer.developerOwner.name ?? String(developer.developerOwner.id),
        role: dto.UserRole.USER,
      };

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
  },

  async getProjectItemsWithDetails(_params, _query) {
    const repositories = projectItemsDatabase.filter(
      (item) => item.projectItem.projectItemType === dto.ProjectItemType.GITHUB_REPOSITORY
    );
    const owners = projectItemsDatabase.filter(
      (item) => item.projectItem.projectItemType === dto.ProjectItemType.GITHUB_OWNER
    );
    const urls = projectItemsDatabase.filter((item) => item.projectItem.projectItemType === dto.ProjectItemType.URL);

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
  },

  async getMaintainers(params: GetMaintainersParams, _query: GetMaintainersQuery): Promise<GetMaintainersResponse> {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  },

  async getProjectAccordion(
    params: GetProjectAccordionParams,
    _query: GetProjectAccordionQuery
  ): Promise<GetProjectAccordionResponse> {
    return getProjectAccordion(params.owner, params.repo);
  },

  async getSponsors(params: GetSponsorsParams, _query: GetSponsorsQuery): Promise<SponsorDescription[]> {
    return getSponsors(params.owner, params.repo);
  },

  async getProjectServices(params, _query) {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
  },

  async getCampaign(_params, _query) {
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
  },
};

// Helper function to create a Price object
function createPrice(stripePrice: dto.StripePrice): dto.Price {
  return {
    totalAmount: Math.floor(Math.random() * 90000) + 10000,
    quantity: Math.floor(Math.random() * 90000) + 10000,
    label: "Random label",
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
