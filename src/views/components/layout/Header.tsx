import React from "react";
import { Logo } from "src/views/components/brand/Logo";
import { Button } from "src/views/components/ui/forms/button";
import { Code2, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ExternalLink } from "../ui/forms/external-link";
import { NavigationLink } from "src/types/navigation";
import { headerNavigation } from "./navigation";
import { paths } from "src/paths";

// -----------------------------
// Types
// -----------------------------

interface HeaderProps {
  navItems?: NavigationLink[];
  developerRegisterUrl?: string;
  className?: string;
  onDeveloperRegister?: () => void;
}

// -----------------------------
// Content (single source of truth)
// -----------------------------
export const headerContent = {
  banner: {
    label: "Are you an OSS developer?",
    ctaText: "Register Here",
  },
  nav: headerNavigation,
};

// -----------------------------
// Reusable UI bits
// -----------------------------
function NavButton({ item }: { item: NavigationLink }) {
  const { title, href, external } = item;
  const base = "text-muted-foreground hover:text-brand-primary transition-colors duration-200";

  return external ? (
    <ExternalLink href={href} underline={false} className={base}>
      {title}
    </ExternalLink>
  ) : (
    <Link to={href} className={base}>
      {title}
    </Link>
  );
}

function MobileNavButton({ item, closeMenu }: { item: NavigationLink; closeMenu: () => void }) {
  const { title, href, external } = item;
  const base = "text-left text-muted-foreground hover:text-foreground transition-colors duration-200 px-2 py-1";

  return external ? (
    <ExternalLink href={href} underline={false} className={base}>
      {title}
    </ExternalLink>
  ) : (
    <Link to={href} className={base} onClick={() => closeMenu()}>
      {title}
    </Link>
  );
}

// -----------------------------
// Main component
// -----------------------------
export function Header(props: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = props.navItems ?? headerContent.nav.items;

  const goHome = () => (window.location.href = "/");

  const handleDeveloperRegister = () => {
    if (props.onDeveloperRegister) return props.onDeveloperRegister();
    if (props.developerRegisterUrl) window.location.href = props.developerRegisterUrl;
  };

  // Define pages where the developer banner should be shown
  const showDeveloperBanner = [paths.HOME, paths.PROJECTS, paths.SERVICES, paths.HOW_ITS_WORK, paths.PRICING, paths.VISION].includes(location.pathname);

  return (
    <>
      {/* Developer Banner - Only shown on specific pages */}
      {showDeveloperBanner && (
        <div className="bg-gradient-to-r from-brand-accent to-brand-highlight border-b border-brand-accent-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-12 gap-3">
              <Code2 className="w-4 h-4 text-white" />
              <span className="text-white">{headerContent.banner.label}</span>
              <Link to={paths.DEVELOPER_LANDING}>
                <Button variant="outline" size="sm" className="bg-white text-brand-accent hover:bg-brand-neutral-950 hover:text-brand-accent border-white h-8">
                  {headerContent.banner.ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className={`bg-background border-b border-border sticky top-0 z-50 ${props.className ?? ""}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={goHome} className="hover:opacity-80 transition-opacity duration-200" aria-label="Go to homepage">
              <Logo size="sm" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <NavButton key={item.title} item={item} />
              ))}
            </nav>

            {/* CTA Button */}

            {headerContent.nav.cta && (
              <div className="hidden md:flex items-center">
                {headerContent.nav.cta.external ? (
                  <ExternalLink href={headerContent.nav.cta.href} underline={false}>
                    <Button variant="default">{headerContent.nav.cta.title}</Button>
                  </ExternalLink>
                ) : (
                  <Link to={headerContent.nav.cta.href}>
                    <Button variant="default">{headerContent.nav.cta.title}</Button>
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                {navItems.map(item => (
                  <MobileNavButton key={item.title} item={item} closeMenu={() => setIsMobileMenuOpen(false)} />
                ))}
                {headerContent.nav.cta && (
                  <div className="pt-4">
                    {headerContent.nav.cta.external ? (
                      <ExternalLink href={headerContent.nav.cta.href} underline={false} className="w-full block">
                        <Button variant="default" className="w-full">
                          {headerContent.nav.cta.title}
                        </Button>
                      </ExternalLink>
                    ) : (
                      <Link to={headerContent.nav.cta.href} className="w-full block" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="default" className="w-full">
                          {headerContent.nav.cta.title}
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
