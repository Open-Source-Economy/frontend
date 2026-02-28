import { NavigationLink, NavigationSection } from "src/types/navigation";
import { externalLinks } from "src/externalLinks";
import { isVisible } from "src/utils/featureVisibility";
import {
  BookOpen,
  CreditCard,
  FileText,
  Folder,
  FolderKanban,
  Heart,
  HelpCircle,
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  PlusSquare,
  Settings,
  User as UserIcon,
  Zap,
} from "lucide-react";
import React from "react";

/**
 * Single source of truth for all navigation links across the application
 */

// -----------------------------
// Navigation Links Registry
// -----------------------------
export const navigationLinks = {
  // Main pages
  projects: { title: "Projects", href: "/projects", icon: <FolderKanban className="w-4 h-4" /> } as NavigationLink,
  services: { title: "Services", href: "/services", icon: <Zap className="w-4 h-4" /> } as NavigationLink,
  sponsorship: { title: "Sponsorship", href: "/sponsorship", icon: <Heart className="w-4 h-4" /> } as NavigationLink,
  faq: { title: "FAQ", href: "/faq", icon: <HelpCircle className="w-4 h-4" /> } as NavigationLink,
  blog: {
    title: "Blog",
    href: externalLinks.BLOG,
    external: true,
    icon: <BookOpen className="w-4 h-4" />,
  } as NavigationLink,
  contact: { title: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> } as NavigationLink,
  support: { title: "Support", href: "/sponsorship", icon: <LifeBuoy className="w-4 h-4" /> } as NavigationLink,
  login: { title: "Log In", href: "/auth/identify", icon: <LogIn className="w-4 h-4" /> } as NavigationLink,

  // User Menu items
  profile: {
    title: "Profile",
    href: "/dashboard",
    icon: (
      <React.Fragment>
        <UserIcon className="w-4 h-4" />
      </React.Fragment>
    ),
  } as NavigationLink,
  billing: { title: "Billing", href: "/dashboard", icon: <CreditCard className="w-4 h-4" /> } as NavigationLink,
  settings: { title: "Settings", href: "/dashboard", icon: <Settings className="w-4 h-4" /> } as NavigationLink,
  logout: { title: "Log out", href: "/logout", icon: <LogOut className="w-4 h-4" /> } as NavigationLink,

  // Additional pages (can be added to footer but not header)
  // about: { title: "About Us", href: "/about", icon: <Info className="w-4 h-4" /> } as NavigationLink,
  // privacy: { title: "Privacy Policy", href: "/privacy", icon: <Shield className="w-4 h-4" /> } as NavigationLink,
} as const;

// -----------------------------
// Header Configuration
// -----------------------------
const headerItems: NavigationLink[] = [
  navigationLinks.projects,
  navigationLinks.services,
  ...(isVisible("faqPage") ? [navigationLinks.faq] : []),
  navigationLinks.blog,
  navigationLinks.contact,
];

export const headerNavigation = {
  items: headerItems,
  cta: navigationLinks.support,
  login: navigationLinks.login,
};

// -----------------------------
// User Menu Configuration
// -----------------------------
export const userMenuNavigation = {
  sections: [
    {
      title: "WORKSPACE",
      links: [
        { title: "My Projects", href: "/dashboard", icon: <Folder className="w-4 h-4" /> },
        { title: "Add Project", href: "/dashboard", icon: <PlusSquare className="w-4 h-4" /> },
      ],
    },
    {
      title: "ACCOUNT",
      links: [
        { title: "My Profile", href: "/user", icon: <UserIcon className="w-4 h-4" /> },
        { title: "Settings", href: "/dashboard", icon: <Settings className="w-4 h-4" /> },
        { title: "Billing & Plan", href: "/dashboard", icon: <CreditCard className="w-4 h-4" /> },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { title: "Help Center", href: "/faq", icon: <HelpCircle className="w-4 h-4" /> },
        { title: "Documentation", href: "/faq", icon: <FileText className="w-4 h-4" /> },
      ],
    },
  ] as NavigationSection[],
  logout: navigationLinks.logout,
};

// -----------------------------
// Footer Configuration
// -----------------------------
export const footerNavigation = {
  sections: [
    {
      title: "Platform",
      links: [
        navigationLinks.projects,
        navigationLinks.services,
        // { title: "Pricing", href: "fund-redistribution" },
        // { title: "How It Works", href: "#how-it-works" },
      ],
    },
    {
      title: "Resources",
      links: [
        navigationLinks.blog,
        ...(!isVisible("faqPage") ? [] : [navigationLinks.faq]),
        // { title: "Documentation", href: "#docs" },
        // { title: "Community", href: "#community" },
      ],
    },
    {
      title: "Company",
      links: [
        navigationLinks.contact,
        // navigationLinks.about,
        // navigationLinks.privacy,
      ],
    },
  ] as NavigationSection[],
};
