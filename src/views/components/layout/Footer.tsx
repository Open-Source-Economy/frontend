import React from "react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/forms/button";
import { Input } from "../ui/forms/input";
import { Alert, AlertDescription } from "../ui/state/alert";
import { AlertCircle, AtSign, CheckCircle2, Github, Heart, Linkedin, Loader2, type LucideIcon, Twitter, Youtube } from "lucide-react";
import { paths } from "src/paths";
import { ExternalLink } from "../ui/forms/ExternalLink";
import { Link } from "react-router-dom";
import { footerNavigation } from "./navigation";
import { isVisible } from "src/ultils/featureVisibility";
import NewsletterSubscriptionForm from "../ui/forms/NewsletterSubscriptionForm";

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
    { icon: Github, href: paths.SOCIALS.GITHUB, label: "GitHub", external: true },
    { icon: Twitter, href: paths.SOCIALS.TWITTER, label: "Twitter", external: true },
    { icon: AtSign, href: paths.SOCIALS.MASTODON, label: "Mastodon", external: true },
    { icon: Youtube, href: paths.SOCIALS.YOUTUBE, label: "YouTube", external: true },
    { icon: Linkedin, href: paths.SOCIALS.LINKEDIN, label: "LinkedIn", external: true },
    // { icon: Mail, href: paths.SOCIALS.GITHUB, label: "Email", external: true },
  ] as SocialLink[],
};

// -----------------------------
// Small components
// -----------------------------
function FooterAnchor({ href, external, children, className }: { href: string; external?: boolean; children: React.ReactNode; className?: string }) {
  return external ? (
    <ExternalLink href={href} underline={false} className={className}>
      {children}
    </ExternalLink>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

// -----------------------------
// Main component
// -----------------------------
export function Footer(props: FooterProps) {
  const sections = footerContent.sections;
  const socialLinks = footerContent.social;
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showErrorDemo, setShowErrorDemo] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setSubmissionStatus("idle");

    if (!email || !email.includes("@")) {
      setSubmissionStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (showErrorDemo) {
      setSubmissionStatus("error");
      setErrorMessage("Subscription failed. Please try again later or contact support@opensourceeconomy.org");
      setIsSubmitting(false);
      setShowErrorDemo(false);
    } else {
      setSubmissionStatus("success");
      setIsSubmitting(false);
      setEmail("");
    }
  };

  const handleResetSuccess = () => {
    setSubmissionStatus("idle");
    setEmail("");
  };

  return (
    <footer className={`bg-brand-secondary border-t border-border`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Building a sustainable open source economy through collaboration, innovation, and community-driven development.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(social => {
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
            {sections.map(section => (
              <div key={section.title} className="text-left">
                <h3 className="font-medium mb-4 text-left">{section.title}</h3>
                <ul className="space-y-2 text-left pl-0">
                  {section.links.map(link => (
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
        {isVisible("newsletterSection") && (
          <div className="border-t border-border mt-8 pt-8">
            <NewsletterSubscriptionForm />
          </div>
        )}


        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-muted-foreground text-sm flex items-center">
            © Open Source Economy - Non profit organisation -{" "}
            <ExternalLink href={paths.SOCIALS.ZEFIX} className="hover:text-brand-primary transition-colors">
              CHE-440.058.692
            </ExternalLink>{" "}
            Switzerland
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-brand-highlight" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
