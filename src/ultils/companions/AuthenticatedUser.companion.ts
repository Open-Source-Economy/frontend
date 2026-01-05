import { AuthenticatedUser, LocalUser, ThirdPartyUser } from "@open-source-economy/api-types";

export const AuthenticatedUserCompanion = {
  getAvatar(user: AuthenticatedUser): string | undefined {
    const userData = user.user.data as any;

    // 1. Try ThirdPartyUser (GitHub)
    if (userData.provider === "github" || userData.providerData) {
      const owner = userData.providerData?.owner;
      if (owner?.displayAvatarUrl) return owner.displayAvatarUrl;
      if (owner?.avatarUrl) return owner.avatarUrl;
    }

    // 2. Fallback: Generate from name if available
    const name = AuthenticatedUserCompanion.getName(user);

    if (name) {
      // clean name for url
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    }

    return undefined;
  },

  getName(user: AuthenticatedUser): string | undefined {
    const userData = user.user.data as any;
    let name: string | undefined;

    // TODO: OSS maintainers set a display name in their profile settings, display that here
    if (userData.provider === "github" || userData.providerData) {
      const owner = userData.providerData?.owner;
      name = owner?.name;
    } else {
      // Local User
    }

    return name;
  },

  /**
   * Returns the email for LocalUser, or the GitHub login (handle) for ThirdPartyUser.
   */
  getEmailOrGithubLogin(user: AuthenticatedUser): string | undefined {
    const userData = user.user.data as any;
    if (userData.provider === "github" || userData.providerData) {
      return userData.providerData?.owner?.id?.login;
    } else {
      return userData.email;
    }
  },
};
