import { useParams } from "react-router-dom";
import { IssueId, OwnerId, RepositoryId } from "src/model";

export function useIssueIdFromParams(): IssueId | null {
  const { ownerParam, repoParam, numberParam } = useParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  if (ownerParam && repoParam && number !== undefined) {
    const ownerId = new OwnerId(ownerParam);
    const repositoryId = new RepositoryId(ownerId, repoParam);
    return new IssueId(repositoryId, number);
  } else {
    console.error("Invalid issue parameters:", { ownerParam, repoParam, numberParam });
    return null;
  }
}
