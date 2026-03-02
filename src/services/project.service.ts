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
} from "src/utils/local-types";
import { api, handleError, projectPath } from "src/services/apiClient";
import { ApiError } from "src/utils/error/ApiError";
import { config } from "src/utils";
import { StatusCodes } from "http-status-codes";
import { getMaintainers } from "src/services/data";
import { pekkoGetProjectServicesResponse } from "src/services/data/getProjectServiceResponses";
import { getSponsors } from "src/services/data/sponsors";
import { SponsorDescription } from "src/model";
import { getProjectAccordion } from "src/services/data/accordions/getAccordions";

export interface ProjectService {
  getOwner(params: dto.GetOwnerParams, query: dto.GetOwnerQuery): Promise<dto.GetOwnerResponse>;

  getRepository(params: dto.GetRepositoryParams, query: dto.GetRepositoryQuery): Promise<dto.GetRepositoryResponse>;

  getProject(params: dto.GetProjectParams, query: dto.GetProjectQuery): Promise<dto.GetProjectResponse>;

  getProjects(params: dto.GetProjectsParams, query: dto.GetProjectsQuery): Promise<dto.GetProjectsResponse>;

  getProjectDetails(
    params: dto.GetProjectDetailsParams,
    query: dto.GetProjectDetailsQuery
  ): Promise<dto.GetProjectDetailsResponse>;

  getProjectItemsWithDetails(
    params: dto.GetProjectItemsWithDetailsParams,
    query: dto.GetProjectItemsWithDetailsQuery
  ): Promise<dto.GetProjectItemsWithDetailsResponse>;

  // TODO: probably remove this method, and query the data from the project
  getMaintainers(params: GetMaintainersParams, query: GetMaintainersQuery): Promise<GetMaintainersResponse>;

  // TODO: probably remove this method, and query the data from the project
  getProjectAccordion(
    params: GetProjectAccordionParams,
    query: GetProjectAccordionQuery
  ): Promise<GetProjectAccordionResponse>;

  // TODO: probably remove this method, and query the data from the project
  getSponsors(params: GetSponsorsParams, query: GetSponsorsQuery): Promise<SponsorDescription[]>;

  getProjectServices(
    params: dto.GetProjectServicesParams,
    query: dto.GetProjectServicesQuery
  ): Promise<dto.GetProjectServicesResponse>;

  getCampaign(params: dto.GetCampaignParams, query: dto.GetCampaignQuery): Promise<dto.GetCampaignResponse>;
}

export const projectServiceImpl: ProjectService = {
  async getOwner(params, _query) {
    return handleError(
      () => api.get(`${config.api.url}/github/owners/${params.owner}`, { withCredentials: true }),
      "getOwner"
    );
  },

  async getRepository(params, _query) {
    return handleError(
      () => api.get(`${config.api.url}/github/repos/${params.owner}/${params.repo}`, { withCredentials: true }),
      "getRepository"
    );
  },

  async getProject(params, _query) {
    return handleError(
      () => api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}`, { withCredentials: true }),
      "getProject"
    );
  },

  async getProjects(_params, _query) {
    return handleError(() => api.get(`${config.api.url}/projects`, { withCredentials: true }), "getProjects");
  },

  async getProjectDetails(params, _query) {
    return handleError(
      () =>
        api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}/details`, {
          withCredentials: true,
        }),
      "getProjectDetails"
    );
  },

  async getProjectItemsWithDetails(_params, _query) {
    return handleError(
      () => api.get(`${config.api.url}/projects/items/details`, { withCredentials: true }),
      "getProjectItemsWithDetails"
    );
  },

  async getMaintainers(params, _query) {
    const maintainers = getMaintainers(params.owner, params.repo);
    if (maintainers) {
      return { maintainers };
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
    }
  },

  async getProjectAccordion(params, _query) {
    return getProjectAccordion(params.owner, params.repo);
  },

  async getSponsors(params, _query) {
    return getSponsors(params.owner, params.repo);
  },

  async getProjectServices(params, _query) {
    if (params.owner === "apache" && params.repo === "pekko") {
      return pekkoGetProjectServicesResponse;
    }
    throw new ApiError(StatusCodes.NOT_IMPLEMENTED);
  },

  async getCampaign(params, _query) {
    return handleError(
      () =>
        api.get(`${config.api.url}/projects/${projectPath(params.owner, params.repo)}/campaigns`, {
          withCredentials: true,
        }),
      "getCampaign"
    );
  },
};
