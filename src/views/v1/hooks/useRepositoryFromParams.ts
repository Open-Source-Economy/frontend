import * as dto from "@open-source-economy/api-types";
import { useParams } from "@tanstack/react-router";

export function useRepositoryFromParams(): dto.RepositoryId | null {
  const { ownerParam, repoParam } = useParams({ strict: false }) as { ownerParam?: string; repoParam?: string };

  if (ownerParam && repoParam) {
    const ownerId = { login: ownerParam } as dto.OwnerId;
    return { ownerId, name: repoParam } as dto.RepositoryId;
  } else {
    console.error("Invalid repository parameters:", { ownerParam, repoParam });
    return null;
  }
}
