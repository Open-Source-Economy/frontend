import { useParams } from "@tanstack/react-router";
import { IssueId } from "@open-source-economy/api-types";
import { useRepositoryFromParams } from "./useRepositoryFromParams";

export function useIssueIdFromParams(): IssueId | null {
  const { ownerParam, repoParam, numberParam } = useParams({ strict: false }) as { ownerParam?: string; repoParam?: string; numberParam?: string };
  const repositoryId = useRepositoryFromParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (repositoryId && number !== undefined) {
    return new IssueId(repositoryId, number);
  } else {
    console.error("Invalid issue parameters:", { ownerParam, repoParam, numberParam });
    return null;
  }
}
