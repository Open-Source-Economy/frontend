import React from "react";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/views/components/ui/dropdown-menu";
import { UserProfileSection } from "src/views/components/layout/header/user-menu/UserProfileSection";
import { TokenDisplay } from "src/views/components/user/TokenDisplay";
import * as dto from "@open-source-economy/api-types";
import { UserMenuNavigation } from "src/types/navigation";

import { UserAvatar } from "src/views/components/user/UserAvatar";

interface UserMenuDropdownProps {
  authenticatedUser: dto.AuthenticatedUser;
  menuConfig: UserMenuNavigation;
}

export function UserMenuDropdown(props: UserMenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none cursor-pointer">
        <UserAvatar user={props.authenticatedUser} className="h-10 w-10 border-2 border-brand-accent" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <UserProfileSection user={props.authenticatedUser} variant="header" />

        <div className="px-2 pt-2 pb-3 border-t border-border/50">
          <TokenDisplay tokens={props.authenticatedUser.serviceTokens} variant="full" />
        </div>
        {props.menuConfig.sections.map((section, index) => (
          <React.Fragment key={index}>
            {index > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-2">
              {section.title && (
                <div className="px-2 py-1">
                  <p className="text-[10px] uppercase tracking-wider text-brand-neutral-500">{section.title}</p>
                </div>
              )}
              <DropdownMenuGroup>
                {section.links.map((item) => (
                  <Link key={item.title} to={item.href as string} className="!no-underline">
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
          <Link to={props.menuConfig.logout.href as string} className="!no-underline">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-400 focus:text-red-400 focus:bg-red-400/10">
              {props.menuConfig.logout.icon}
              <span>{props.menuConfig.logout.title}</span>
            </DropdownMenuItem>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
