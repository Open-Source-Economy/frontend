import { Maintainer } from "src/utils/local-types";
import { pekkoMaintainers } from "src/services/data/maintainers/pekkoMaintainers";
import { flockMaintainers } from "src/services/data/maintainers/flockMaintainers";
import { oseMaintainers } from "src/services/data/maintainers/oseMaintainers";
import { slickMaintainers } from "src/services/data/maintainers/slickMaintainers";

export function getMaintainers(owner: string, repo?: string): Maintainer[] | null {
  if (repo) {
    if (owner === "apache" && repo === "pekko") {
      return pekkoMaintainers;
    } else if (owner === "join-the-flock" && repo === "flock") {
      return flockMaintainers;
    } else if (owner === "slick" && repo === "slick") {
      return slickMaintainers;
    }
  } else if (owner === "open-source-economy") {
    return oseMaintainers;
  }

  return null;
}
