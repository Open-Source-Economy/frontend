import { useState } from "react";
import { ApiError } from "src/utils/error/ApiError";
import { projectService } from "src/services";
import { SponsorDescription } from "../../../model";
import {
  type ProjectId,
  getOwnerFromProjectId,
  getRepoFromProjectId,
  GetSponsorsParams,
  GetSponsorsQuery,
} from "src/utils/local-types";

export function useSponsors(projectId: ProjectId) {
  const [sponsors, setSponsors] = useState<SponsorDescription[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSponsors = async () => {
    setIsLoading(true);

    try {
      const params: GetSponsorsParams = {
        owner: getOwnerFromProjectId(projectId),
        repo: getRepoFromProjectId(projectId),
      };
      const query: GetSponsorsQuery = {};

      const response = await projectService.getSponsors(params, query);

      if (response instanceof ApiError) {
        setError(response);
      } else {
        setSponsors(response);
      }
    } catch (err) {
      console.error("Error fetching sponsor:", err);
      setError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sponsors,
    isLoading,
    error,
    reloadSponsors: fetchSponsors,
  };
}
