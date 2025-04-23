import { GetProjectAccordionResponse } from "../../../api/dto";
import { pekkoAccordion } from "./pekkoAccordion";
import { defaultAccordion } from "./defaultAccordion";

export function getProjectAccordion(owner: string, repo?: string): GetProjectAccordionResponse {
  if (repo) {
    if (owner === "apache" && repo === "pekko") {
      return pekkoAccordion;
    }
  }
  return defaultAccordion;
}
