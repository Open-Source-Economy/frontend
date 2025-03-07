import { useState } from "react";
import * as dto from "src/api/dto";
import { OwnerId, ProjectId, RepositoryId } from "src/api/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getBackendAPI } from "../../services";
import { SponsorDescription } from "../../model";

export function useSponsors(projectId: ProjectId) {
  const backendAPI = getBackendAPI();

  const [sponsors, setSponsors] = useState<SponsorDescription[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSponsors = async () => {
    setIsLoading(true);

    try {
      const params: dto.GetSponsorsParams = {
        owner: projectId instanceof OwnerId ? projectId.login : projectId.ownerId.login,
        repo: projectId instanceof RepositoryId ? projectId.name : undefined,
      };
      const query: dto.GetSponsorsQuery = {};

      const response = await backendAPI.getSponsors(params, query);

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
