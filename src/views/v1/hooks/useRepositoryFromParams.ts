import { OwnerId, RepositoryId } from "@open-source-economy/api-types";
import { useParams } from "@tanstack/react-router";

export function useRepositoryFromParams(): RepositoryId | null {
  const { ownerParam, repoParam } = useParams({ strict: false }) as { ownerParam?: string; repoParam?: string };

  if (ownerParam && repoParam) {
    const ownerId = new OwnerId(ownerParam);
    return new RepositoryId(ownerId, repoParam);
  } else {
    console.error("Invalid repository parameters:", { ownerParam, repoParam });
    return null;
  }
}
