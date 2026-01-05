import React from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../ui/dropdown-menu";
import { UserProfileSection } from "./UserProfileSection";
import { TokenDisplay } from "../../../user/TokenDisplay";
import { AuthenticatedUser } from "@open-source-economy/api-types";
import { UserMenuNavigation } from "src/types/navigation";

import { UserAvatar } from "../../../../components/user/UserAvatar";

interface UserMenuDropdownProps {
  authenticatedUser: AuthenticatedUser;
  menuConfig: UserMenuNavigation;
}

export function UserMenuDropdown({ authenticatedUser, menuConfig }: UserMenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none cursor-pointer">
        <UserAvatar user={authenticatedUser} className="h-10 w-10 border-2 border-brand-accent" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <UserProfileSection user={authenticatedUser} variant="header" />

        <div className="px-2 pt-2 pb-3 border-t border-border/50">
          <TokenDisplay tokens={authenticatedUser.serviceTokens} variant="full" />
        </div>
        {menuConfig.sections.map((section, index) => (
          <React.Fragment key={index}>
            {index > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-2">
              {section.title && (
                <div className="px-2 py-1">
                  <p className="text-[10px] uppercase tracking-wider text-brand-neutral-500">{section.title}</p>
                </div>
              )}
              <DropdownMenuGroup>
                {section.links.map(item => (
                  <Link key={item.title} to={item.href} className="!no-underline">
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuGroup>
            </div>
          </React.Fragment>
        ))}

        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <Link to={menuConfig.logout.href} className="!no-underline">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-400 focus:text-red-400 focus:bg-red-400/10">
              {menuConfig.logout.icon}
              <span>{menuConfig.logout.title}</span>
            </DropdownMenuItem>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
