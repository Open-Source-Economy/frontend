import React, { AnchorHTMLAttributes, forwardRef } from "react";

import { cn } from "src/views/components/utils";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: boolean; // Default is true
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(function ExternalLink(
  { underline = true, className = "", children, ...rest },
  ref,
) {
  const underlineClass = underline ? "hover:underline underline-offset-2" : "no-underline";

  return (
    <a ref={ref} target="_blank" rel="noopener noreferrer" className={cn("cursor-pointer", underlineClass, className)} {...rest}>
      {children}
    </a>
  );
});

ExternalLink.displayName = "ExternalLink";
