import * as dto from "@open-source-economy/api-types";

// Contact reason groups for field requirements
export const PROFESSIONAL_REASONS = [
  dto.ContactReason.ENTERPRISE,
  dto.ContactReason.REQUEST_PROJECT,
  dto.ContactReason.PARTNERSHIP,
  dto.ContactReason.PRESS,
] as const;

export const CASUAL_REASONS = [
  dto.ContactReason.SUPPORT,
  dto.ContactReason.GENERAL,
  dto.ContactReason.VOLUNTEER,
] as const;

export const LINKEDIN_REQUIRED_REASONS = [
  dto.ContactReason.ENTERPRISE,
  dto.ContactReason.REQUEST_PROJECT,
  dto.ContactReason.PARTNERSHIP,
] as const;

export const GITHUB_PROFILE_REASONS = [
  dto.ContactReason.MAINTAINER,
  dto.ContactReason.SUPPORT,
  dto.ContactReason.GENERAL,
  dto.ContactReason.VOLUNTEER,
] as const;

export const MEETING_REQUEST_REASONS = [
  dto.ContactReason.ENTERPRISE,
  dto.ContactReason.PARTNERSHIP,
  dto.ContactReason.PRESS,
] as const;

// Helper functions
export const isCompanyRequired = (contactReason: string): boolean =>
  PROFESSIONAL_REASONS.some((r) => r === contactReason);

export const isLinkedInRequired = (contactReason: string): boolean =>
  LINKEDIN_REQUIRED_REASONS.some((r) => r === contactReason);

export const shouldShowGitHubProfile = (contactReason: string): boolean =>
  GITHUB_PROFILE_REASONS.some((r) => r === contactReason);

export const isGitHubRequired = (contactReason: string): boolean => contactReason === dto.ContactReason.MAINTAINER;

export const shouldShowMeetingRequest = (contactReason: string): boolean =>
  MEETING_REQUEST_REASONS.some((r) => r === contactReason);

export const shouldShowProjects = (contactReason: string): boolean =>
  contactReason === dto.ContactReason.MAINTAINER || contactReason === dto.ContactReason.REQUEST_PROJECT;

export const areProjectsRequired = (contactReason: string): boolean =>
  contactReason === dto.ContactReason.ENTERPRISE || contactReason === dto.ContactReason.REQUEST_PROJECT;
