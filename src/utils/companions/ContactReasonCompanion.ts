import { ContactReason } from "@open-source-economy/api-types";

export const CONTACT_REASON_LABELS: Record<ContactReason, string> = {
  [ContactReason.MAINTAINER]: "I'm an Open Source Maintainer",
  [ContactReason.REQUEST_PROJECT]: "Request a Project",
  [ContactReason.ENTERPRISE]: "Enterprise Inquiry",
  [ContactReason.PARTNERSHIP]: "Partnership Opportunity",
  [ContactReason.VOLUNTEER]: "Join Our Community",
  [ContactReason.PRESS]: "Press & Media",
  [ContactReason.SUPPORT]: "Get Help",
  [ContactReason.GENERAL]: "General Inquiry",
};
