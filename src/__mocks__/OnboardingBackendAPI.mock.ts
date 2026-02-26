import * as dto from "@open-source-economy/api-types";

import { OnboardingBackendAPI } from "src/services/OnboardingBackendAPI";
import { developerBugFixingService, serviceHierarchy } from "./index"; // Assuming these mocks are correctly imported

export class OnboardingBackendAPIMock implements OnboardingBackendAPI {
  async createDeveloperProfile(
    params: dto.CreateProfileParams,
    body: dto.CreateProfileBody,
    query: dto.CreateProfileQuery
  ): Promise<dto.CreateProfileResponse> {
    console.log("createDeveloperProfile", { params, body, query });
    const response: dto.CreateProfileResponse = {};
    return Promise.resolve(response);
  }

  // Renamed to match the specific action and backend interface
  async updateDeveloperContactInfos(
    params: dto.UpdateContactInfosParams,
    body: dto.UpdateContactInfosBody,
    query: dto.UpdateContactInfosQuery
  ): Promise<dto.UpdateContactInfosResponse> {
    console.log("updateDeveloperContactInfos", { params, body, query });
    const response: dto.UpdateContactInfosResponse = {
      // Assuming the response for this DTO is an empty object based on your backend DTO
    };
    return Promise.resolve(response);
  }

  async getDeveloperProfile(
    params: dto.GetDeveloperProfileParams,
    query: dto.GetDeveloperProfileQuery
  ): Promise<dto.GetDeveloperProfileResponse> {
    console.log("getDeveloperProfile", { params, query });

    const projectItemId1 = Math.random().toString() as dto.ProjectItemId;
    const projectItemId2 = Math.random().toString() as dto.ProjectItemId;
    const developerProjectItemId1 = Math.random().toString() as dto.DeveloperProjectItemId;
    const developerProjectItemId2 = Math.random().toString() as dto.DeveloperProjectItemId;
    const developerProfileId1 = Math.random().toString() as dto.DeveloperProfileId;
    const developerProfileId2 = Math.random().toString() as dto.DeveloperProfileId;

    const response: dto.GetDeveloperProfileResponse = {
      profile: {
        profileEntry: null,
        settings: {
          id: Math.random().toString() as dto.DeveloperSettingsId,
          developerProfileId: developerProfileId1,
          royaltiesPreference: undefined,
          servicesPreference: dto.PreferenceType.YES,
          communitySupporterPreference: undefined,
          hourlyWeeklyCommitment: undefined,
          hourlyWeeklyCommitmentComment: undefined,
          openToOtherOpportunity: undefined,
          openToOtherOpportunityComment: undefined,
          hourlyRate: undefined,
          hourlyRateComment: undefined,
          currency: undefined,
          createdAt: new Date().toISOString() as dto.ISODateTimeString,
          updatedAt: new Date().toISOString() as dto.ISODateTimeString,
        },
        projects: [
          {
            projectItem: {
              id: projectItemId1,
              projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
              sourceIdentifier: "open-source-economy/ose-website",
              createdAt: new Date().toISOString() as dto.ISODateTimeString,
              updatedAt: new Date().toISOString() as dto.ISODateTimeString,
            },
            developerProjectItem: {
              id: developerProjectItemId1,
              developerProfileId: developerProfileId1,
              projectItemId: projectItemId1,
              roles: [dto.DeveloperRoleType.MAINTAINER],
              mergeRights: [dto.MergeRightsType.NONE],
              createdAt: new Date().toISOString() as dto.ISODateTimeString,
              updatedAt: new Date().toISOString() as dto.ISODateTimeString,
            },
          },
          {
            projectItem: {
              id: projectItemId2,
              projectItemType: dto.ProjectItemType.GITHUB_OWNER,
              sourceIdentifier: "open-source-economy",
              createdAt: new Date().toISOString() as dto.ISODateTimeString,
              updatedAt: new Date().toISOString() as dto.ISODateTimeString,
            },
            developerProjectItem: {
              id: developerProjectItemId2,
              developerProfileId: developerProfileId2,
              projectItemId: projectItemId2,
              roles: [dto.DeveloperRoleType.MAINTAINER],
              mergeRights: [dto.MergeRightsType.LIMITED],
              createdAt: new Date().toISOString() as dto.ISODateTimeString,
              updatedAt: new Date().toISOString() as dto.ISODateTimeString,
            },
          },
        ],
        services: [developerBugFixingService],
      },
    };
    return Promise.resolve(response);
  }

  async setDeveloperPreferences(
    params: dto.SetDeveloperPreferencesParams,
    body: dto.SetDeveloperPreferencesBody,
    query: dto.SetDeveloperPreferencesQuery
  ): Promise<dto.SetDeveloperPreferencesResponse> {
    console.log("setDeveloperPreferences", { params, body, query });
    return Promise.resolve({} as dto.SetDeveloperPreferencesResponse);
  }

  async setDeveloperServiceSettings(
    params: dto.SetDeveloperServiceSettingsParams,
    body: dto.SetDeveloperServiceSettingsBody,
    query: dto.SetDeveloperServiceSettingsQuery
  ): Promise<dto.SetDeveloperServiceSettingsResponse> {
    console.log("setDeveloperServiceSettings", { params, body, query });
    return Promise.resolve({} as dto.SetDeveloperServiceSettingsResponse);
  }

  async upsertProjectItem(
    params: dto.UpsertDeveloperProjectItemParams,
    body: dto.UpsertDeveloperProjectItemBody,
    query: dto.UpsertDeveloperProjectItemQuery
  ): Promise<dto.UpsertDeveloperProjectItemResponse> {
    console.log("upsertProjectItem", { params, body, query });

    const developerProfileId = Math.random().toString() as dto.DeveloperProfileId;

    // Process each project item in the array
    const results: dto.ProjectItemUpsertResult[] = body.projectItems.map((projectItemData) => {
      const projectItemId = Math.random().toString() as dto.ProjectItemId;
      const developerProjectItemId = Math.random().toString() as dto.DeveloperProjectItemId;

      return {
        projectItem: {
          id: projectItemId,
          projectItemType: projectItemData.projectItemType,
          sourceIdentifier: projectItemData.sourceIdentifier,
          createdAt: new Date().toISOString() as dto.ISODateTimeString,
          updatedAt: new Date().toISOString() as dto.ISODateTimeString,
        },
        developerProjectItem: {
          id: developerProjectItemId,
          developerProfileId: developerProfileId,
          projectItemId: projectItemId,
          roles: projectItemData.roles,
          mergeRights: projectItemData.mergeRights,
          comment: projectItemData.comments,
          customCategories: projectItemData.customCategories,
          predefinedCategories: projectItemData.predefinedCategories,
          createdAt: new Date().toISOString() as dto.ISODateTimeString,
          updatedAt: new Date().toISOString() as dto.ISODateTimeString,
        },
      };
    });

    const response: dto.UpsertDeveloperProjectItemResponse = {
      results,
    };

    return Promise.resolve(response);
  }

  async removeProjectItem(
    params: dto.RemoveDeveloperProjectItemParams,
    query: dto.RemoveDeveloperProjectItemQuery
  ): Promise<void> {
    console.log("removeProjectItem", { params, query });
  }

  async getPotentialProjectItems(
    params: dto.GetPotentialProjectItemsParams,
    query: dto.GetPotentialProjectItemsQuery
  ): Promise<dto.GetPotentialProjectItemsResponse> {
    console.log("getPotentialProjectItems", { params, query });
    const response: dto.GetPotentialProjectItemsResponse = {};
    return Promise.resolve(response);
  }

  async getServiceHierarchy(
    params: dto.GetServiceHierarchyParams,
    query: dto.GetServiceHierarchyQuery
  ): Promise<dto.GetServiceHierarchyResponse> {
    // Updated return type
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
  ): Promise<dto.UpsertDeveloperServiceResponse> {
    console.log("upsertDeveloperService", { params, body, query });

    // Assuming the response contains the upserted developerService, including a generated ID
    const mockDeveloperServiceId = Math.random().toString() as dto.DeveloperServiceId;
    const developerProfileId = Math.random().toString() as dto.DeveloperProfileId;

    const response: dto.UpsertDeveloperServiceResponse = {
      developerService: {
        id: mockDeveloperServiceId,
        developerProfileId: developerProfileId,
        serviceId: body.serviceId,
        developerProjectItemIds: body.developerProjectItemIds,
        hourlyRate: body.hourlyRate,
        responseTimeHours: body.responseTimeHours,
        comment: body.comment, // DTO uses 'comments', model uses 'comment'
        createdAt: new Date().toISOString() as dto.ISODateTimeString,
        updatedAt: new Date().toISOString() as dto.ISODateTimeString,
      },
    };

    return Promise.resolve(response);
  }

  async upsertDeveloperServices(
    params: dto.UpsertDeveloperServicesParams,
    body: dto.UpsertDeveloperServicesBody,
    query: dto.UpsertDeveloperServicesQuery
  ): Promise<dto.UpsertDeveloperServicesResponse> {
    console.log("upsertDeveloperServices", { params, body, query });

    const developerServices: dto.DeveloperService[] = body.upsertDeveloperServices.map((service) => {
      const developerService: dto.DeveloperService = {
        id: Math.random().toString() as dto.DeveloperServiceId,
        developerProfileId: Math.random().toString() as dto.DeveloperProfileId,
        serviceId: service.serviceId,
        developerProjectItemIds: service.developerProjectItemIds,
        hourlyRate: service.hourlyRate,
        responseTimeHours: service.responseTimeHours,
        comment: service.comment,
        createdAt: new Date().toISOString() as dto.ISODateTimeString,
        updatedAt: new Date().toISOString() as dto.ISODateTimeString,
      };
      return developerService;
    });
    const response: dto.UpsertDeveloperServicesResponse = {
      developerServices,
    };

    return Promise.resolve(response);
  }

  async deleteDeveloperService(
    params: dto.DeleteDeveloperServiceParams,
    query: dto.DeleteDeveloperServiceQuery
  ): Promise<void> {
    console.log("deleteDeveloperService", { params, query });
  }

  async createCustomService(
    params: dto.CreateCustomServiceParams,
    body: dto.CreateCustomServiceBody,
    query: dto.CreateCustomServiceQuery
  ): Promise<dto.CreateCustomServiceResponse> {
    console.log("createCustomService", { params, body, query });
    return Promise.resolve({} as dto.CreateCustomServiceResponse);
  }

  async completeOnboarding(
    params: dto.CompleteOnboardingParams,
    body: dto.CompleteOnboardingBody,
    query: dto.CompleteOnboardingQuery
  ): Promise<dto.CompleteOnboardingResponse> {
    console.log("completeOnboarding", { params, body, query });
    return Promise.resolve({} as dto.CompleteOnboardingResponse);
  }
}
