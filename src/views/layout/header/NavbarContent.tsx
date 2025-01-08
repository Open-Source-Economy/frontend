import React from "react";
import { BaseURL } from "../../../App";
import { Nav } from "react-bootstrap";
import { WebsiteNavbar } from "./website";
import { AppNavbar } from "./app";

interface NavbarContentProps {
  baseURL: BaseURL;
}

export function NavbarContent(props: NavbarContentProps) {
  return (
    <Nav className="justify-end  lg:items-center font-mich flex-grow gap-3">
      {props.baseURL === BaseURL.WEBSITE && <WebsiteNavbar />}

      {props.baseURL === BaseURL.APP && <AppNavbar />}
    </Nav>
  );
}
