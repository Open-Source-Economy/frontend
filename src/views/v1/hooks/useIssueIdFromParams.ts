import { useParams } from "@tanstack/react-router";
import * as dto from "@open-source-economy/api-types";
import { useRepositoryFromParams } from "./useRepositoryFromParams";

export function useIssueIdFromParams(): dto.IssueId | null {
  const { ownerParam, repoParam, numberParam } = useParams({ strict: false }) as {
    ownerParam?: string;
    repoParam?: string;
    numberParam?: string;
  };
  const repositoryId = useRepositoryFromParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (repositoryId && number !== undefined) {
    return { repositoryId, number } as dto.IssueId;
  } else {
    console.error("Invalid issue parameters:", { ownerParam, repoParam, numberParam });
    return null;
  }
}
