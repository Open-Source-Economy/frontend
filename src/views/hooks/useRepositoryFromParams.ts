import { OwnerId, RepositoryId } from "../../model";
import { useParams } from "react-router-dom";

export function useRepositoryFromParams(): RepositoryId | null {
  const { ownerParam, repoParam } = useParams();

  if (ownerParam && repoParam) {
    const ownerId = new OwnerId(ownerParam);
    return new RepositoryId(ownerId, repoParam);
  } else {
    console.error("Invalid repository parameters:", { ownerParam, repoParam });
    return null;
  }
}
