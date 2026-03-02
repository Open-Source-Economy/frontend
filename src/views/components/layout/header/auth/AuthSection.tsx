import React from "react";

import { UserMenuDropdown } from "src/views/components/layout/header/user-menu/UserMenuDropdown";
import { AuthButtons } from "src/views/components/layout/header/auth/AuthButtons";
import { TokenDisplay } from "src/views/components/user/TokenDisplay";
import { MobileUserMenu } from "src/views/components/layout/header/user-menu/MobileUserMenu";

import * as dto from "@open-source-economy/api-types";
import { NavigationLink, UserMenuNavigation } from "src/types/navigation";
import { isVisible } from "src/utils/featureVisibility";

interface AuthSectionProps {
  isLoading: boolean;
  authenticatedUser: dto.AuthenticatedUser | null;
  login: NavigationLink;
  cta: NavigationLink;
  variant: "desktop" | "mobile";
  menuConfig: UserMenuNavigation;
}

export function AuthSection(props: AuthSectionProps) {
  if (props.isLoading) {
    // If skeleton is missing, we could just render nothing or a spinner.
    // Assuming we might need to fix import if skeleton is missing.
    return <div className="animate-pulse bg-gray-200 h-10 w-10 rounded-full" />;
  }

  if (props.authenticatedUser && isVisible("authenticatedUserMenu")) {
    if (props.variant === "mobile") {
      return <MobileUserMenu authenticatedUser={props.authenticatedUser} menuConfig={props.menuConfig} />;
    }

    return (
      <div className="flex items-center gap-3">
        <TokenDisplay tokens={props.authenticatedUser.serviceTokens} variant="badge" />
        <UserMenuDropdown authenticatedUser={props.authenticatedUser} menuConfig={props.menuConfig} />
      </div>
    );
  }

  return <AuthButtons login={props.login} cta={props.cta} variant={props.variant} />;
}
