import { OwnerId, RepositoryId } from "../../model";

export const repositoryIds: RepositoryId[] = [
  ["apache", "pekko"],
  ["join-the-flock", "flock"],
  ["kubesphere", "kubesphere"],
  ["slick", "slick"],
  ["scala-native", "scala-native"],
].map(([owner, repository]) => new RepositoryId(new OwnerId(owner), repository));
