import React from "react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/forms/button";
import { Input } from "../ui/forms/input";
import { Alert, AlertDescription } from "../ui/state/alert";
import { AlertCircle, AtSign, CheckCircle2, Github, Heart, Linkedin, Loader2, type LucideIcon, Twitter, Youtube } from "lucide-react";
import { paths } from "src/paths";
import { ExternalLink } from "../ui/forms/ExternalLink";
import { Link } from "react-router-dom";

// -----------------------------
// Types
// -----------------------------
interface FooterLink {
  title: string;
  href: string;
  external?: boolean; // open in new tab
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: LucideIcon; // keep as component type for consistency
  href: string;
  label: string;
  external?: boolean; // default true
}

interface FooterProps {
  className?: string;
  showNewsletter?: boolean;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
}

// -----------------------------
// Content (single source of truth)
// -----------------------------
export const footerContent = {
  sections: [
    // {
    //   title: "About",
    //   links: [
    //     { title: "About Us", href: "about" },
    //     { title: "Our Mission", href: "about#mission" },
    //     { title: "Team", href: "about#team" },
    //     { title: "Contact", href: "contact" },
    //     { title: "Careers", href: "#careers" },
    //   ],
    // },
    {
      title: "Platform",
      links: [
        // { title: "Services", href: "services" },
        { title: "Projects", href: paths.PROJECTS },
        // { title: "Pricing", href: "fund-redistribution" },
        // { title: "How It Works", href: "#how-it-works" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", href: paths.BLOG, external: true },
        // { title: "FAQ", href: paths.FAQ },
        // { title: "Documentation", href: "#docs" },
        // { title: "Community", href: "#community" },
      ],
    },
    // {
    //   title: "Legal",
    //   links: [
    //     // { title: "Privacy Policy", href: paths.PRIVACY },
    //     // { title: "Terms of Service", href: paths.TERMS },
    //     // { title: "Cookie Policy", href: "#cookies" },
    //   ],
    // },
  ] as FooterSection[],
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
export function Footer({ sections = footerContent.sections, socialLinks = footerContent.social, showNewsletter = false, className = "" }: FooterProps) {
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
    <footer className={`bg-brand-secondary border-t border-border ${className}`}>
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
        {showNewsletter && (
          <div className="border-t border-border mt-8 pt-8">
            <div className="max-w-md">
              <h3 className="font-medium mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">Get the latest updates on open source projects and community news.</p>

              {/* Demo Toggle - Development Only */}
              {process.env.NODE_ENV === "development" && (
                <div className="mb-4 p-3 bg-brand-card-blue-light border border-brand-warning rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-warning">Demo Mode</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xs text-brand-neutral-600">Simulate Error</span>
                      <input type="checkbox" checked={showErrorDemo} onChange={e => setShowErrorDemo(e.target.checked)} className="w-4 h-4" />
                    </label>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isSubmitting && (
                <Alert className="mb-4 border-brand-accent bg-brand-accent/10">
                  <Loader2 className="h-4 w-4 text-brand-accent animate-spin" />
                  <AlertDescription className="text-brand-accent">Processing your subscription...</AlertDescription>
                </Alert>
              )}

              {/* Success State */}
              {submissionStatus === "success" && (
                <Alert className="mb-4 border-brand-success bg-brand-success/10">
                  <CheckCircle2 className="h-4 w-4 text-brand-success" />
                  <AlertDescription className="text-brand-success">Thanks for subscribing! Check your email to confirm your subscription.</AlertDescription>
                </Alert>
              )}

              {/* Error State */}
              {submissionStatus === "error" && (
                <Alert className="mb-4 border-brand-error bg-brand-error/10">
                  <AlertCircle className="h-4 w-4 text-brand-error" />
                  <AlertDescription className="text-brand-error">{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Subscription Form */}
              {submissionStatus !== "success" && (
                <form onSubmit={handleSubscribe} className="flex gap-2 items-center">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    variant="outline"
                    className="flex-1 h-10"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (submissionStatus === "error") {
                        setSubmissionStatus("idle");
                        setErrorMessage("");
                      }
                    }}
                    disabled={isSubmitting}
                  />
                  <Button type="submit" variant="default" size="default" className="h-10" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>
              )}

              {/* Success - Show action to subscribe again */}
              {submissionStatus === "success" && (
                <Button variant="outline" size="default" className="h-10 w-full" onClick={handleResetSuccess}>
                  Subscribe Another Email
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-muted-foreground text-sm flex items-center">
            © Open Source Economy - Non profit organisation -{" "}
            <ExternalLink href={paths.SOCIALS.ZEFIX} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
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
