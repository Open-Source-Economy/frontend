export interface GetProjectAccordionParams {
  owner: string;
  repo?: string;
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface GetProjectAccordionResponse {
  title: string;
  items: AccordionItem[];
  donationButton: boolean;
  buyServicesButton: boolean;
}

export interface GetProjectAccordionBody {}

export interface GetProjectAccordionQuery {}
