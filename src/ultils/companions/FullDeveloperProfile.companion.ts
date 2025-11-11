/**
 * Companion utilities for FullDeveloperProfile
 * Centralizes search and filtering logic for developer profiles
 */

import * as dto from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "./SourceIdentifier.companion";

export namespace FullDeveloperProfileCompanion {
  /**
   * Check if a profile matches the given search term
   * Searches across: name, email, GitHub username, and project names
   */
  export function matchesSearchTerm(profile: dto.FullDeveloperProfile, searchTerm: string): boolean {
    if (!searchTerm.trim()) return true;

    const search = searchTerm.toLowerCase().trim();

    // Search in name
    const userName = profile.profileEntry?.user?.name;
    if (userName?.toLowerCase().includes(search)) return true;

    // Search in contact email
    const contactEmail = profile.profileEntry?.profile.contactEmail;
    if (contactEmail?.toLowerCase().includes(search)) return true;

    // Search in GitHub username
    const githubUsername = profile.profileEntry?.owner?.id.login;
    if (githubUsername?.toLowerCase().includes(search)) return true;

    // Search in project names
    const hasMatchingProject = profile.projects.some(project => {
      const projectName = SourceIdentifierCompanion.displayName(project.projectItem.sourceIdentifier);
      return projectName.toLowerCase().includes(search);
    });
    if (hasMatchingProject) return true;

    return false;
  }

  /**
   * Get GitHub username from profile
   */
  export function getGithubUsername(profile: dto.FullDeveloperProfile): string | null {
    return profile.profileEntry?.owner?.id.login || null;
  }
}
