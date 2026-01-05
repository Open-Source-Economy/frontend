import React from "react";
import { Logo } from "src/views/components/brand/Logo";
import { Link } from "react-router-dom";
import { headerNavigation, userMenuNavigation } from "./navigation";
import { paths } from "src/paths";
import { useAuth } from "src/views/auth/AuthContext";

// New components
import { NavItems } from "./header/navigation/NavItems";
import { AuthSection } from "./header/auth/AuthSection";
import { DeveloperBanner } from "./header/DeveloperBanner";
import { MobileMenuButton } from "./header/navigation/MobileMenuButton";
import { MobileUserMenuDropdown } from "./header/user-menu/MobileUserMenuDropdown";
import { TokenDisplay } from "../user/TokenDisplay";
import { UserAvatar } from "../user/UserAvatar";

// -----------------------------
// Types
// -----------------------------

interface HeaderProps {
  className?: string;
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
// Main component
// -----------------------------
export function Header(props: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = React.useState(false);

  // Auth Integration
  const auth = useAuth();
  const authenticatedUser = auth.authInfo?.authenticatedUser;
  const isLoading = auth.loading;

  const navItems = headerContent.nav.items;
  const userMenuNav = userMenuNavigation;

  return (
    <>
      <DeveloperBanner />
      <header className={`bg-background border-b border-border sticky top-0 z-50 ${props.className ?? ""}`}>
        <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 max-w-[100vw]">
          <div className="flex items-center justify-between h-20 gap-2 lg:gap-4">
            {/* Logo */}
            <Link
              to={paths.HOME}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:opacity-80 transition-opacity duration-200 shrink-0 !no-underline"
              aria-label="Go to homepage"
            >
              <Logo size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 overflow-x-auto scrollbar-none flex-shrink min-w-0">
              <NavItems items={navItems} variant="desktop" />
            </nav>

            {/* Auth Section - Desktop */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-3 shrink-0">
              <AuthSection
                authenticatedUser={authenticatedUser || null}
                isLoading={isLoading}
                login={headerNavigation.login}
                cta={headerContent.nav.cta}
                variant="desktop"
                menuConfig={userMenuNav}
              />
            </div>

            {/* Mobile Auth Indicator + Menu Button */}
            <div className="flex md:hidden items-center gap-4 shrink-0">
              {/* Note: Source Header had mobile auth indicator here (avatar). 
                   But we moved all logic to AuthSection inside Mobile Menu in some designs?
                   Source Header lines 91-104: Shows avatar button on mobile bar if authenticated.
                   Let's replicate that behavior.
               */}
              {authenticatedUser && (
                <>
                  <TokenDisplay tokens={authenticatedUser.serviceTokens} variant="compact" />
                  <button
                    onClick={() => setIsMobileUserMenuOpen(true)}
                    className="flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
                    aria-label="Open user menu"
                  >
                    <UserAvatar user={authenticatedUser} className="w-8 h-8" />
                  </button>
                </>
              )}

              <MobileMenuButton isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Navigation */}
              <nav className="flex flex-col space-y-0">
                <NavItems items={navItems} variant="mobile" onMobileClose={() => setIsMobileMenuOpen(false)} />
              </nav>

              {/* Auth Buttons (only for non-logged-in users) */}
              {!authenticatedUser && (
                <div className="px-4 pt-6 mt-6 border-t border-border">
                  <AuthSection
                    authenticatedUser={authenticatedUser || null}
                    isLoading={isLoading}
                    login={headerNavigation.login}
                    cta={headerContent.nav.cta}
                    variant="mobile"
                    menuConfig={userMenuNav}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile User Menu Dropdown */}
      {authenticatedUser && (
        <MobileUserMenuDropdown
          authenticatedUser={authenticatedUser}
          isOpen={isMobileUserMenuOpen}
          onClose={() => setIsMobileUserMenuOpen(false)}
          menuConfig={userMenuNav}
        />
      )}
    </>
  );
}
