import React from "react";
import { Button } from "../../../components";
import { Link } from "react-router-dom";
import { NavbarItem } from "../navbar/item/NavbarItem";
import { Navigation } from "../navbar/item/NavItemData";

interface AuthenticationProps {}

export function Authentication(props: AuthenticationProps) {
  return (
    <div className="flex items-center gap-3">
      <NavbarItem item={Navigation.items.signIn} />
      <Button audience="ALL" level="SECONDARY" size="SMALL" className="!capitalize" asChild>
        <Link to="/sign-up">Join</Link>
      </Button>
    </div>
  );
}
