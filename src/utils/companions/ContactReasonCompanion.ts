import * as dto from "@open-source-economy/api-types";

export const CONTACT_REASON_LABELS: Record<dto.ContactReason, string> = {
  [dto.ContactReason.MAINTAINER]: "I'm an Open Source Maintainer",
  [dto.ContactReason.REQUEST_PROJECT]: "Request a Project",
  [dto.ContactReason.ENTERPRISE]: "Enterprise Inquiry",
  [dto.ContactReason.PARTNERSHIP]: "Partnership Opportunity",
  [dto.ContactReason.VOLUNTEER]: "Join Our Community",
  [dto.ContactReason.PRESS]: "Press & Media",
  [dto.ContactReason.SUPPORT]: "Get Help",
  [dto.ContactReason.GENERAL]: "General Inquiry",
};
