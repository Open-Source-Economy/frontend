import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { OnboardingBackendAPI } from "src/services/OnboardingBackendAPI";
import {
  userId,
  serviceHierarchy,
  developerBugFixingService,
} from "./index";

export class OnboardingBackendAPIMock implements OnboardingBackendAPI {
  async createDeveloperProfile(
    params: dto.CreateDeveloperProfileParams,
    body: dto.CreateDeveloperProfileBody,
    query: dto.CreateDeveloperProfileQuery
  ): Promise<dto.CreateDeveloperProfileResponse | ApiError> {
    console.log("createDeveloperProfile", { params, body, query });
    const response: dto.CreateDeveloperProfileResponse = {
      id: userId,
      createdAt: new Date(),
    };
    return Promise.resolve(response);
  }

  async updateDeveloperProfile(
    params: dto.UpdateDeveloperContactInfosParams,
    body: dto.UpdateDeveloperContactInfosBody,
    query: dto.UpdateDeveloperContactInfosQuery
  ): Promise<dto.UpdateDeveloperContactInfosResponse | ApiError> {
    console.log("updateDeveloperProfile", { params, body, query });
    const response: dto.UpdateDeveloperContactInfosResponse = {
      id: userId,
      updatedAt: new Date(),
    };
    return Promise.resolve(response);
  }

  async getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse | ApiError> {
    console.log("getDeveloperProfile", { params, query });

    const projectItemId = new dto.ProjectItemId(Math.random().toString());
    const developerProjectItemId = new dto.DeveloperProjectItemId(Math.random().toString());
    const developerProfileId = new dto.DeveloperProfileId(Math.random().toString());

    const response: dto.GetDeveloperProfileResponse = {
      profile: {
        name: "Mock Developer",
        email: "mock.dev@example.com",
        agreedToTerms: true,
        profile: null,
        settings: {
          id: new dto.DeveloperSettingsId(Math.random().toString()),
          developerProfileId: developerProfileId,
          incomeStreams: [dto.IncomeStreamType.SERVICES],
          hourlyWeeklyCommitment: 20,
          openToOtherOpportunity: dto.OpenToOtherOpportunityType.YES,
          hourlyRate: 75,
          currency: dto.Currency.USD,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        projects: [
          [
            {
              id: projectItemId,
              projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
              sourceIdentifier: "https://github.com/open-source-economy/ose-website",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: developerProjectItemId,
              developerProfileId: developerProfileId,
              projectItemId: projectItemId,
              roles: [dto.DeveloperRoleType.MAINTAINER],
              mergeRights: [dto.MergeRightsType.FULL_RIGHTS],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        ],
        services: [developerBugFixingService],
      },
    };
    return Promise.resolve(response);
  }

  async setDeveloperIncomeStreams(
    params: dto.SetDeveloperIncomeStreamsParams,
    body: dto.SetDeveloperIncomeStreamsBody,
    query: dto.SetDeveloperIncomeStreamsQuery
  ): Promise<dto.SetDeveloperIncomeStreamsResponse | ApiError> {
    console.log("setDeveloperIncomeStreams", { params, body, query });
    return Promise.resolve({} as dto.SetDeveloperIncomeStreamsResponse);
  }

  async setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery
  ): Promise<dto.SetDeveloperServiceSettingsResponse | ApiError> {
    console.log("setDeveloperServiceSettings", { params, body, query });
    return Promise.resolve({} as dto.SetDeveloperServiceSettingsResponse);
  }

  async upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse | ApiError> {
    console.log("upsertProjectItem", { params, body, query });

    const projectItemId = new dto.ProjectItemId(Math.random().toString());
    const developerProjectItemId = new dto.DeveloperProjectItemId(Math.random().toString());
    const developerProfileId = new dto.DeveloperProfileId(Math.random().toString());

    const response: dto.UpsertDeveloperProjectItemResponse = {
      projectItem: {
        id: projectItemId,
        projectItemType: body.projectItemType,
        sourceIdentifier: body.sourceIdentifier,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      developerProjectItem: {
        id: developerProjectItemId,
        developerProfileId: developerProfileId,
        projectItemId: projectItemId,
        roles: body.roles,
        mergeRights: body.mergeRights,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    return Promise.resolve(response);
  }

  async removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    body: dto.RemoveDeveloperProjectItemBody,
    query: dto.RemoveDeveloperProjectItemQuery
  ): Promise<dto.RemoveDeveloperProjectItemResponse | ApiError> {
    console.log("removeProjectItem", { params, body, query });
    return Promise.resolve({} as dto.RemoveDeveloperProjectItemResponse);
  }

  async getPotentialProjectItems(
    params: dto.GetPotentialDeveloperProjectItemsParams,
    query: dto.GetPotentialDeveloperProjectItemsQuery
  ): Promise<dto.GetPotentialDeveloperProjectItemsResponse | ApiError> {
    console.log("getPotentialProjectItems", { params, query });
    const response: dto.GetPotentialDeveloperProjectItemsResponse = {};
    return Promise.resolve(response);
  }

  async getServiceHierarchy(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<dto.GetServiceHierarchyResponse> {
    console.log("getServiceHierarchy", { params, query });
    const response: dto.GetServiceHierarchyResponse = {
      items: serviceHierarchy,
    };
    return Promise.resolve(response);
  }

  async upsertDeveloperService(
    params: dto.UpsertDeveloperServiceParams,
    body: dto.UpsertDeveloperServiceBody,
    query: dto.UpsertDeveloperServiceQuery
  ): Promise<dto.UpsertDeveloperServiceResponse | ApiError> {
    console.log("upsertDeveloperService", { params, body, query });

    // Assuming the response contains the updated developerService
    const response: dto.UpsertDeveloperServiceResponse = {
      developerService: body.developerService,
    };

    return Promise.resolve(response);
  }

  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    body: dto.DeleteDeveloperServiceBody,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<dto.DeleteDeveloperServiceResponse | ApiError> {
    console.log("deleteDeveloperService", { params, body, query });
    return Promise.resolve({} as dto.DeleteDeveloperServiceResponse);
  }

  async createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse | ApiError> {
    console.log("createCustomService", { params, body, query });
    return Promise.resolve({} as dto.CreateCustomServiceResponse);
  }

  async completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse | ApiError> {
    console.log("completeOnboarding", { params, body, query });
    return Promise.resolve({} as dto.CompleteOnboardingResponse);
  }
}
