import React, { AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: boolean; // Default is true
}

export function ExternalLink({ underline = true, className = "", children, ...rest }: ExternalLinkProps) {
  const underlineClass = underline ? "hover:underline" : "";

  return (
    <a target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${underlineClass} ${className} underline-offset-2`} {...rest}>
      {children}
    </a>
  );
}
