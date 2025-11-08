import { NavigationLink, NavigationSection } from "src/types/navigation";
import { paths } from "src/paths";
import { isVisible } from "src/ultils/featureVisibility";

/**
 * Single source of truth for all navigation links across the application
 */

// -----------------------------
// Navigation Links Registry
// -----------------------------
export const navigationLinks = {
  // Main pages
  projects: { title: "Projects", href: paths.PROJECTS } as NavigationLink,
  services: { title: "Services", href: paths.SERVICES } as NavigationLink,
  faq: { title: "FAQ", href: paths.FAQ } as NavigationLink,
  blog: { title: "Blog", href: paths.BLOG, external: true } as NavigationLink,
  contact: { title: "Contact", href: paths.CONTACT } as NavigationLink,

  // Additional pages (can be added to footer but not header)
  // about: { title: "About Us", href: paths.ABOUT } as NavigationLink,
  // privacy: { title: "Privacy Policy", href: paths.PRIVACY } as NavigationLink,
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
  cta: undefined as NavigationLink | undefined, // { title: "Get Started", href: paths.PROJECTS } as NavigationLink,
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
