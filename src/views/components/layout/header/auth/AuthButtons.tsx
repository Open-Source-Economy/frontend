import React from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../../../ui/forms/button";
import { cn } from "src/views/components/utils";
import { NavigationLink } from "src/types/navigation";

interface AuthButtonsProps {
  login: NavigationLink;
  cta: NavigationLink;
  variant?: "desktop" | "mobile";
}

const AuthButton = ({ link, variant, type }: { link: NavigationLink; variant: "desktop" | "mobile"; type: "login" | "cta" }) => {
  const isMobile = variant === "mobile";
  const isExternal = link.external;

  // Base classes
  // const mobileLoginClasses = "w-full justify-start"; // Unused
  // const desktopLoginClasses = "text-sm font-medium text-gray-300 hover:text-white transition-colors"; // Unused
  // const mobileCtaClasses = "w-full"; // Unused
  // const desktopCtaClasses = "bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center"; // Unused

  // Replaced with Button component usage
  const { variant: btnVariant, size: btnSize } =
    type === "login" ? { variant: "ghost" as const, size: "sm" as const } : { variant: "default" as const, size: "default" as const };

  const mobileClasses = isMobile ? "w-full justify-start" : "hidden lg:flex";

  if (isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: btnVariant, size: btnSize }), mobileClasses, "!no-underline")}
      >
        {link.title}
      </a>
    );
  }

  return (
    <Link to={link.href || "#"} className={cn(buttonVariants({ variant: btnVariant, size: btnSize }), mobileClasses, "!no-underline")}>
      {link.title}
    </Link>
  );

  return null; // Should be unreachable code as all paths return
};

export function AuthButtons({ login, cta, variant = "desktop" }: AuthButtonsProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-3" : "items-center gap-3"}`}>
      <AuthButton link={login} variant={variant} type="login" />
      <AuthButton link={cta} variant={variant} type="cta" />
    </div>
  );
}
