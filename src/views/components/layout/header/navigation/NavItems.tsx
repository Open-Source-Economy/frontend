import React from "react";
import { Link } from "@tanstack/react-router";
import { NavDropdown } from "./NavDropdown";
import { MobileNavSubmenu } from "./MobileNavSubmenu";
import { ExternalLink } from "src/views/v1/components/elements/ExternalLink";
import { NavigationLink } from "src/types/navigation";

interface NavItemsProps {
  items: NavigationLink[];
  variant: "desktop" | "mobile";
  onMobileClose?: () => void;
}

export function NavItems(props: NavItemsProps) {
  return (
    <>
      {props.items.map((item) => {
        if (item.items && item.items.length > 0) {
          if (props.variant === "mobile") {
            return (
              <MobileNavSubmenu key={item.title} title={item.title} items={item.items} onClose={props.onMobileClose} />
            );
          }

          return <NavDropdown key={item.title} title={item.title} items={item.items} />;
        }

        const isExternal = item.external;
        const commonClasses =
          props.variant === "mobile"
            ? "w-full text-left text-foreground hover:text-brand-primary hover:bg-surface/50 transition-colors duration-200 px-4 py-3 border-b border-border/30 block"
            : "text-muted-foreground hover:text-brand-primary transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0";

        if (isExternal) {
          return (
            <ExternalLink
              key={item.title}
              href={item.href}
              underline={false}
              onClick={props.variant === "mobile" ? props.onMobileClose : undefined}
              className={commonClasses}
            >
              {item.title}
            </ExternalLink>
          );
        }

        return (
          <Link
            key={item.title}
            to={item.href as string}
            onClick={props.variant === "mobile" ? props.onMobileClose : undefined}
            className={`${commonClasses} !no-underline`}
          >
            {item.title}
          </Link>
        );
      })}
    </>
  );
}
