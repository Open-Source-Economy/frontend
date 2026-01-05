import React from "react";
import { UserAvatar } from "src/views/components/user/UserAvatar";
import { AuthenticatedUser } from "@open-source-economy/api-types";
import { AuthenticatedUserCompanion } from "src/ultils/companions";

export interface UserProfileSectionProps {
  user: AuthenticatedUser;
  variant?: "header" | "inline";
}

export function UserProfileSection({ user, variant = "inline" }: UserProfileSectionProps) {
  const name = AuthenticatedUserCompanion.getName(user) || "";
  const email = AuthenticatedUserCompanion.getEmailOrGithubLogin(user) || "";

  if (variant === "header") {
    return (
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary/90 px-3 py-3 mb-[4px] rounded-t-md mt-[-4px] mr-[-4px] ml-[-4px]">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} className="h-10 w-10 border-2 border-white/20" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{name}</p>
            <p className="text-xs text-white/70 truncate">{email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 py-2 border-b border-brand-neutral-300">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} className="h-10 w-10 border-2 border-brand-accent" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-brand-neutral-950 truncate">{name}</p>
          <p className="text-xs text-brand-neutral-600 truncate">{email}</p>
        </div>
      </div>
    </div>
  );
}
