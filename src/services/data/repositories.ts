import { OwnerId, RepositoryId } from "@open-source-economy/api-types";

// TODO: lolo to delete
export const repositoryIds: RepositoryId[] = [
  ["apache", "pekko"],
  ["join-the-flock", "flock"],
  ["kubesphere", "kubesphere"],
  ["slick", "slick"],
].map(([owner, repository]) => new RepositoryId(new OwnerId(owner), repository));
