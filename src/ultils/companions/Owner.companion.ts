import type { Owner } from "@open-source-economy/api-types";

export namespace OwnerCompanion {
  export function getTwitterUrl(owner?: Owner | null): string | null {
    const username = owner?.twitterUsername;
    if (!username) {
      return null;
    }

    const sanitized = username.startsWith("@") ? username.slice(1) : username;
    if (!sanitized.trim()) {
      return null;
    }

    return `https://twitter.com/${sanitized}`;
  }
}
