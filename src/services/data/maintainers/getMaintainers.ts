import { Maintainer } from "../../../dtos";
import { pekkoMaintainers } from "./pekkoMaintainers";
import { flockMaintainers } from "./flockMaintainers";
import { oseMaintainers } from "./oseMaintainers";
import { slickMaintainers } from "./slickMaintainers";

export function getMaintainers(owner: string, repo?: string): Maintainer[] | null {
  if (repo) {
    if (owner === "apache" && repo === "pekko") {
      return pekkoMaintainers;
    } else if (owner === "join-the-flock" && repo === "flock") {
      return flockMaintainers;
    } else if (owner === "slick" && repo === "slick") {
      return slickMaintainers;
    } else {
      return null;
    }
  } else if (owner === "open-source-economy") {
    return oseMaintainers;
  } else {
    return null;
  }
}
