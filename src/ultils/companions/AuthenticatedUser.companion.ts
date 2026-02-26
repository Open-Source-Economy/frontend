import { AuthenticatedUser } from "@open-source-economy/api-types";

export const AuthenticatedUserCompanion = {
  getAvatar(user: AuthenticatedUser): string | undefined {
    // AuthenticatedUser no longer carries provider data directly.
    // Fallback: Generate from name if available.
    const name = AuthenticatedUserCompanion.getName(user);

    if (name) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    }

    return undefined;
  },

  getName(user: AuthenticatedUser): string | undefined {
    // User.name is string | null on the new User model
    return user.user.name ?? undefined;
  },

  /**
   * Returns the user name if available.
   * Note: with the new AuthenticatedUser model, provider-specific data
   * (e.g. GitHub login) is no longer embedded in the user object.
   */
  getEmailOrGithubLogin(user: AuthenticatedUser): string | undefined {
    return user.user.name ?? undefined;
  },
};
