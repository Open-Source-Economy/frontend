import React from "react";
import { AtSign, Github, type LucideIcon, Twitter, Youtube, Linkedin, Heart } from "lucide-react";
import { externalLinks } from "src/externalLinks";
import { footerNavigation } from "src/views/components/layout/navigation";
import { Logo } from "src/views/components/brand/Logo";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { Link } from "@tanstack/react-router";
import { CurrencySelector } from "src/views/components/ui/forms/select/currency-selector";
import { NewsletterSection } from "src/views/components/layout/NewsletterSection";

// -----------------------------
// Types
// -----------------------------

interface SocialLink {
  icon: LucideIcon; // keep as component type for consistency
  href: string;
  label: string;
  external?: boolean; // default true
}

interface FooterProps {}

// -----------------------------
// Content (single source of truth)
// -----------------------------
export const footerContent = {
  sections: footerNavigation.sections,
  social: [
    { icon: Github, href: externalLinks.GITHUB, label: "GitHub", external: true },
    { icon: Twitter, href: externalLinks.TWITTER, label: "Twitter", external: true },
    { icon: AtSign, href: externalLinks.MASTODON, label: "Mastodon", external: true },
    { icon: Youtube, href: externalLinks.YOUTUBE, label: "YouTube", external: true },
    { icon: Linkedin, href: externalLinks.LINKEDIN, label: "LinkedIn", external: true },
    // { icon: Mail, href: externalLinks.GITHUB, label: "Email", external: true },
  ] as SocialLink[],
};

// -----------------------------
// Small components
// -----------------------------
function FooterAnchor(props: { href: string; external?: boolean; children: React.ReactNode; className?: string }) {
  return props.external ? (
    <ExternalLink href={props.href} underline={false} className={props.className}>
      {props.children}
    </ExternalLink>
  ) : (
    <Link to={props.href as string} className={props.className}>
      {props.children}
    </Link>
  );
}

// -----------------------------
// Main component
// -----------------------------
export function Footer(_props: FooterProps) {
  const sections = footerContent.sections;
  const socialLinks = footerContent.social;

  return (
    <footer className={`bg-brand-secondary border-t border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Building a sustainable open source economy through collaboration, innovation, and community-driven
              development.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <FooterAnchor
                    key={social.label}
                    href={social.href}
                    external={social.external}
                    className="text-muted-foreground hover:text-brand-primary transition-colors duration-200 cursor-pointer"
                  >
                    <Icon size={20} aria-label={social.label} />
                  </FooterAnchor>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="text-left">
                <h3 className="font-medium mb-4 text-left">{section.title}</h3>
                <ul className="space-y-2 text-left pl-0">
                  {section.links.map((link) => (
                    <li key={link.title} className="text-left list-none">
                      <FooterAnchor
                        href={link.href}
                        external={link.external}
                        className="text-muted-foreground hover:text-brand-primary transition-colors duration-200 text-left cursor-pointer"
                      >
                        {link.title}
                      </FooterAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Regional Settings */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <CurrencySelector label={"Currency"} variant="compact" className="w-[190px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-muted-foreground text-sm flex items-center">
            © Open Source Economy - Non profit organisation - <span className="mx-1" />
            <ExternalLink href={externalLinks.ZEFIX} className="hover:text-brand-primary transition-colors">
              CHE-440.058.692
            </ExternalLink>
            <span className="mx-1" />- Switzerland
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-brand-highlight" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
