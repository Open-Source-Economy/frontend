import React, { AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ExternalLink({ href, children, className, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`cursor-pointer hover:underline ${className}`} {...rest}>
      {children}
    </a>
  );
}
