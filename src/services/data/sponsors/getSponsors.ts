import { pekkoSponsors } from "src/services/data/sponsors/pekkoSponsors";
import { SponsorDescription } from "src/model";

export function getSponsors(owner: string, repo?: string): SponsorDescription[] {
  if (repo) {
    if (owner === "apache" && repo === "pekko") {
      return pekkoSponsors;
    }
  } else if (owner === "open-source-economy") {
    return [];
  }
  return [];
}
