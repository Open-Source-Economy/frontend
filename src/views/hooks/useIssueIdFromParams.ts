import { useParams } from "react-router-dom";
import { IssueId, OwnerId, RepositoryId } from "src/model";
import { useRepositoryFromParams } from "./useRepositoryFromParams";

export function useIssueIdFromParams(): IssueId | null {
  const { ownerParam, repoParam, numberParam } = useParams();
  const repositoryId = useRepositoryFromParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (repositoryId && number !== undefined) {
    return new IssueId(repositoryId, number);
  } else {
    console.error("Invalid issue parameters:", { ownerParam, repoParam, numberParam });
    return null;
  }
}
