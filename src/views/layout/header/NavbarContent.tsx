import React from "react";
import { BaseURL } from "../../../App";
import { Button, ExternalLink } from "../../../components";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useAuth } from "../../pages/app/authenticate/AuthContext";

interface NavbarContentProps {
  baseURL: BaseURL;
}

export function NavbarContent(props: NavbarContentProps) {
  const auth = useAuth();

  return (
    <Nav className="justify-content-end align-items-lg-center font-mich flex-grow-1 gap-3">
      {props.baseURL === BaseURL.WEBSITE && (
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
      )}
      {props.baseURL === BaseURL.APP && (
        <>
          {(auth.authInfo?.repositories ?? []).length > 0 && (
            <Link to="/manage-issues" className="gradient-text mr-8">
              Maintainer Portals
            </Link>
          )}

          <Link to="/fund-issues" className="gradient-text mr-8">
            FUND ISSUES
          </Link>

          {auth.authInfo && (
            <Link to="/logout" className="gradient-text mr-8">
              Logout
            </Link>
          )}
        </>
      )}
    </Nav>
  );
}
