import { ContactReason } from "@open-source-economy/api-types";

// Contact reason groups for field requirements
export const PROFESSIONAL_REASONS = [ContactReason.ENTERPRISE, ContactReason.REQUEST_PROJECT, ContactReason.PARTNERSHIP, ContactReason.PRESS] as const;

export const CASUAL_REASONS = [ContactReason.SUPPORT, ContactReason.GENERAL, ContactReason.VOLUNTEER] as const;

export const LINKEDIN_REQUIRED_REASONS = [ContactReason.ENTERPRISE, ContactReason.REQUEST_PROJECT, ContactReason.PARTNERSHIP] as const;

export const GITHUB_PROFILE_REASONS = [ContactReason.MAINTAINER, ContactReason.SUPPORT, ContactReason.GENERAL, ContactReason.VOLUNTEER] as const;

export const MEETING_REQUEST_REASONS = [ContactReason.ENTERPRISE, ContactReason.PARTNERSHIP, ContactReason.PRESS] as const;

// Helper functions
export const isCompanyRequired = (contactReason: string): boolean => PROFESSIONAL_REASONS.includes(contactReason as any);

export const isLinkedInRequired = (contactReason: string): boolean => LINKEDIN_REQUIRED_REASONS.includes(contactReason as any);

export const shouldShowGitHubProfile = (contactReason: string): boolean => GITHUB_PROFILE_REASONS.includes(contactReason as any);

export const isGitHubRequired = (contactReason: string): boolean => contactReason === ContactReason.MAINTAINER;

export const shouldShowMeetingRequest = (contactReason: string): boolean => MEETING_REQUEST_REASONS.includes(contactReason as any);

export const shouldShowProjects = (contactReason: string): boolean =>
  contactReason === ContactReason.MAINTAINER || contactReason === ContactReason.REQUEST_PROJECT;

export const areProjectsRequired = (contactReason: string): boolean =>
  contactReason === ContactReason.ENTERPRISE || contactReason === ContactReason.REQUEST_PROJECT;
