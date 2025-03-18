import { OwnerId, RepositoryId } from "src/api/model";

export const projectsIds: RepositoryId[] = [
  ["apache", "pekko"],
  ["join-the-flock", "flock"],
  ["kubesphere", "kubesphere"],
  ["slick", "slick"],
].map(([owner, repository]) => new RepositoryId(new OwnerId(owner), repository));

export const openSourceEconomyId: OwnerId = new OwnerId("Open-Source-Economy");
