import { GetProjectAccordionResponse } from "src/utils/local-types";
import { pekkoAccordion } from "src/services/data/accordions/pekkoAccordion";
import { defaultAccordion } from "src/services/data/accordions/defaultAccordion";

export function getProjectAccordion(owner: string, repo?: string): GetProjectAccordionResponse {
  if (repo) {
    if (owner === "apache" && repo === "pekko") {
      return pekkoAccordion;
    }
  }
  return defaultAccordion;
}
