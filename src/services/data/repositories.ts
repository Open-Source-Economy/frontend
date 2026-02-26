import * as dto from "@open-source-economy/api-types";

// TODO: lolo to delete
export const repositoryIds: dto.RepositoryId[] = [
  ["apache", "pekko"],
  ["join-the-flock", "flock"],
  ["kubesphere", "kubesphere"],
  ["slick", "slick"],
].map(([owner, repository]) => ({ ownerId: { login: owner } as dto.OwnerId, name: repository }) as dto.RepositoryId);
