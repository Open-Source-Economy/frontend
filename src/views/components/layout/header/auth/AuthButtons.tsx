import React from "react";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "src/views/components/ui/forms/button";
import { cn } from "src/views/components/utils";
import { NavigationLink } from "src/types/navigation";

interface AuthButtonsProps {
  login: NavigationLink;
  cta: NavigationLink;
  variant?: "desktop" | "mobile";
}

function AuthButton(props: { link: NavigationLink; variant: "desktop" | "mobile"; type: "login" | "cta" }) {
  const isMobile = props.variant === "mobile";
  const isExternal = props.link.external;

  // Replaced with Button component usage
  const { variant: btnVariant, size: btnSize } =
    props.type === "login"
      ? { variant: "ghost" as const, size: "sm" as const }
      : { variant: "default" as const, size: "default" as const };

  const mobileClasses = isMobile ? "w-full justify-start" : "hidden lg:flex";

  if (isExternal) {
    return (
      <a
        href={props.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: btnVariant, size: btnSize }), mobileClasses, "!no-underline")}
      >
        {props.link.title}
      </a>
    );
  }

  return (
    <Link
      to={(props.link.href || "#") as string}
      className={cn(buttonVariants({ variant: btnVariant, size: btnSize }), mobileClasses, "!no-underline")}
    >
      {props.link.title}
    </Link>
  );
}

export function AuthButtons(props: AuthButtonsProps) {
  const variant = props.variant ?? "desktop";
  const isMobile = variant === "mobile";

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-3" : "items-center gap-3"}`}>
      <AuthButton link={props.login} variant={variant} type="login" />
      <AuthButton link={props.cta} variant={variant} type="cta" />
    </div>
  );
}
