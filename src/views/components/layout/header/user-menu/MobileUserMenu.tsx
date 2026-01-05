import React from "react";
import { Link } from "react-router-dom";
import { UserProfileSection } from "./UserProfileSection";
import { UserMenuNavigation } from "src/types/navigation";
import { AuthenticatedUser } from "@open-source-economy/api-types";

interface MobileUserMenuProps {
  authenticatedUser: AuthenticatedUser;
  menuConfig: UserMenuNavigation;
  onItemClick?: () => void;
}

export function MobileUserMenu({ authenticatedUser, menuConfig, onItemClick }: MobileUserMenuProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-2">
        <UserProfileSection user={authenticatedUser} variant="inline" />
      </div>

      <div className="space-y-4">
        {menuConfig.sections.map((section, index) => (
          <div key={index} className="space-y-1">
            {section.title && <div className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.title}</div>}
            {section.links.map(item => (
              <Link
                key={item.title}
                to={item.href}
                className="flex items-center gap-3 px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                onClick={onItemClick}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        ))}
        <Link
          to={menuConfig.logout.href}
          className="flex items-center gap-3 px-2 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors w-full text-left"
          onClick={onItemClick}
        >
          {menuConfig.logout.icon}
          {menuConfig.logout.title}
        </Link>
      </div>
    </div>
  );
}
