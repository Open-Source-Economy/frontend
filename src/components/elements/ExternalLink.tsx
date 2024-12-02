import React, { AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: boolean; // Default is true
}

export function ExternalLink({ href, children, className, ...rest }: ExternalLinkProps) {
  const underline = rest.underline ? "hover:underline" : "";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${underline} ${className}`} {...rest}>
      {children}
    </a>
  );
}
