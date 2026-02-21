import React from "react";
import { Link } from "@tanstack/react-router";
import { UserProfileSection } from "./UserProfileSection";
import { UserMenuNavigation } from "src/types/navigation";
import { AuthenticatedUser } from "@open-source-economy/api-types";

interface MobileUserMenuProps {
  authenticatedUser: AuthenticatedUser;
  menuConfig: UserMenuNavigation;
  onItemClick?: () => void;
}

export function MobileUserMenu(props: MobileUserMenuProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-2">
        <UserProfileSection user={props.authenticatedUser} variant="inline" />
      </div>

      <div className="space-y-4">
        {props.menuConfig.sections.map((section, index) => (
          <div key={index} className="space-y-1">
            {section.title && <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.title}</div>}
            {section.links.map(item => (
              <Link
                key={item.title}
                to={item.href as string}
                className="flex items-center gap-3 px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                onClick={props.onItemClick}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        ))}
        <Link
          to={props.menuConfig.logout.href as string}
          className="flex items-center gap-3 px-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors w-full text-left"
          onClick={props.onItemClick}
        >
          {props.menuConfig.logout.icon}
          {props.menuConfig.logout.title}
        </Link>
      </div>
    </div>
  );
}
