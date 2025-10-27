/**
 * Common navigation link type used across Header, Footer, and other navigation components
 */
export interface NavigationLink {
  title: string;
  href: string;
  external?: boolean; // true if opens in a new window/tab
}

/**
 * Section of navigation links with a title (used in Footer)
 */
export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

/**
 * @deprecated Use NavigationLink instead
 */
export type NavItem = NavigationLink;

/**
 * @deprecated Use NavigationLink instead
 */
export type FooterLink = NavigationLink;

/**
 * @deprecated Use NavigationSection instead
 */
export type FooterSection = NavigationSection;
