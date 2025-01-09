import React from "react";
import { Button, ExternalLink } from "src/components";
import { Link } from "react-router-dom";

interface WebsiteNavbarProps {}

export function WebsiteNavbar(props: WebsiteNavbarProps) {
  return (
    <>
      <ExternalLink href="https://blog.open-source-economy.com/" className="gradient-text mr-8">
        Blog
      </ExternalLink>
      <Button audience="ALL" level="SECONDARY" size="LARGE" asChild>
        <Link to="/white-paper" target="_blank">
          WHITE PAPER
        </Link>
      </Button>
    </>
  );
}
