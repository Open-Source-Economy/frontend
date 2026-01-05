import React from "react";

/**
 * Common navigation link type used across Header, Footer, and other navigation components
 */
export interface NavigationLink {
  title: string;
  href: string;
  external?: boolean; // true if opens in a new window/tab
  items?: NavigationLink[]; // Nested items for dropdowns
  icon: React.ReactNode;
}

/**
 * Section of navigation links with a title (used in Footer)
 */
export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

/**
 * Configuration for the user menu (desktop and mobile)
 */
export interface UserMenuNavigation {
  sections: NavigationSection[];
  logout: NavigationLink;
}
