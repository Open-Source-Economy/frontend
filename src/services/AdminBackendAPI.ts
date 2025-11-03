import axios, { AxiosInstance } from "axios";
import { config } from "../ultils";
import * as dto from "@open-source-economy/api-types";
import { handleError } from "./index";

export function getAdminBackendAPI(): AdminBackendAPI {
  return new AdminBackendAPI(axios.create());
}

export class AdminBackendAPI {
  private api: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.api = axiosInstance;
  }

  async getAllDeveloperProfiles(
    params: dto.GetAllDeveloperProfilesParams,
    query: dto.GetAllDeveloperProfilesQuery,
  ): Promise<dto.GetAllDeveloperProfilesResponse | dto.ApiError> {
    return await handleError(async () => this.api.get(`${config.api.url}/admin/profiles`, { withCredentials: true, params: query }), "getAllDeveloperProfiles");
  }

  async getDeveloperProfile(params: { githubUsername: string }, query: dto.GetDeveloperProfileQuery): Promise<dto.GetDeveloperProfileResponse | dto.ApiError> {
    return await handleError(
      async () => this.api.get(`${config.api.url}/admin/developer-profile/${params.githubUsername}`, { withCredentials: true, params: query }),
      "getDeveloperProfile",
    );
  }

  async createVerificationRecord(
    params: dto.CreateVerificationRecordParams,
    body: dto.CreateVerificationRecordBody,
    query: dto.CreateVerificationRecordQuery,
  ): Promise<dto.CreateVerificationRecordResponse | dto.ApiError> {
    return await handleError(
      async () => this.api.post(`${config.api.url}/admin/verification-record`, body, { withCredentials: true, params: query }),
      "createVerificationRecord",
    );
  }
}
