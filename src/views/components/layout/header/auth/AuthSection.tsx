import React from "react";

import { UserMenuDropdown } from "../user-menu/UserMenuDropdown";
import { AuthButtons } from "./AuthButtons";
import { TokenDisplay } from "../../../user/TokenDisplay";
import { MobileUserMenu } from "../user-menu/MobileUserMenu";

import { AuthenticatedUser } from "@open-source-economy/api-types";
import { NavigationLink, UserMenuNavigation } from "src/types/navigation";

interface AuthSectionProps {
  isLoading: boolean;
  authenticatedUser: AuthenticatedUser | null;
  login: NavigationLink;
  cta: NavigationLink;
  variant: "desktop" | "mobile";
  menuConfig: UserMenuNavigation;
}

export function AuthSection({ isLoading, authenticatedUser, login, cta, variant, menuConfig }: AuthSectionProps) {
  if (isLoading) {
    // If skeleton is missing, we could just render nothing or a spinner.
    // Assuming we might need to fix import if skeleton is missing.
    return <div className="animate-pulse bg-gray-200 h-10 w-10 rounded-full" />;
  }

  if (authenticatedUser) {
    if (variant === "mobile") {
      return <MobileUserMenu authenticatedUser={authenticatedUser} menuConfig={menuConfig} />;
    }

    return (
      <div className="flex items-center gap-3">
        <TokenDisplay tokens={authenticatedUser.serviceTokens} variant="badge" />
        <UserMenuDropdown authenticatedUser={authenticatedUser} menuConfig={menuConfig} />
      </div>
    );
  }

  return <AuthButtons login={login} cta={cta} variant={variant} />;
}
