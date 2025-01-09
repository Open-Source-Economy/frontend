import { OwnerId, RepositoryId } from "src/model";

export const repositoryIds: RepositoryId[] = [
  ["apache", "pekko"],
  ["join-the-flock", "flock"],
  ["kubesphere", "kubesphere"],
  ["slick", "slick"],
].map(([owner, repository]) => new RepositoryId(new OwnerId(owner), repository));
