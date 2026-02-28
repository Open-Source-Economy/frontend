import React from "react";
import { Button } from "../../../components";
import { Link } from "@tanstack/react-router";
import { NavbarItem } from "../navbar/item/NavbarItem";
import { Navigation } from "../navbar/item/NavItemData";
import { useCurrency } from "src/context/CurrencyContext";

interface AuthenticationProps {}

export function Authentication(_props: AuthenticationProps) {
  const { preferredCurrency, showCurrencyModal, setShowCurrencyModal } = useCurrency();
  return (
    <div className="flex items-center gap-3">
      <NavbarItem
        item={Navigation.currency(preferredCurrency, () => {
          setShowCurrencyModal(!showCurrencyModal);
        })}
      />
      <NavbarItem item={Navigation.items.signIn} />
      <Button audience="ALL" level="SECONDARY" size="SMALL" className="!capitalize" asChild>
        <Link to="/auth/identify" search={{ repository_token: undefined, company_token: undefined, email: undefined }}>
          Join
        </Link>
      </Button>
    </div>
  );
}
