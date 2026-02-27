import type React from "react";
import { type Dispatch, type SetStateAction } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "src/views/v1/components";
import { useAuth } from "src/views/auth";
import { MobileNavbar } from "./MobileNavbar";
import { type Divider, DIVIDER, DropdownNavbar } from "./DropdownNavbar";
import type { Currency } from "@open-source-economy/api-types";
import { config, Env } from "src/ultils";
import { NavbarItem } from "./item/NavbarItem";
import { Nav } from "react-bootstrap";
import { paths } from "src/paths";
import { Navigation, type NavItemData } from "./item/NavItemData";
import { fundingHooks } from "src/api";
import { Credit, CreditUnit } from "src/model";
import Decimal from "decimal.js";

interface AppNavbarProps {
  setShowOffcanvas: Dispatch<SetStateAction<boolean>>;
  showDropdownNavbar: boolean;
  showCurrencyModal: boolean;
  selectedCurrency: Currency;
  setShowDropdownNavbar: Dispatch<SetStateAction<boolean>>;
  setShowCurrencyModal: (show: boolean) => void;
}

export function NavbarContent(props: AppNavbarProps) {
  const auth = useAuth();

  const { data: availableCreditsResponse } = fundingHooks.useAvailableCreditsQuery(
    {},
    {
      companyId: auth.authInfo?.company?.id,
    }
  );
  const availableCredits: Credit | null = availableCreditsResponse
    ? { amount: new Decimal(availableCreditsResponse.creditAmount), unit: CreditUnit.MINUTE }
    : null;

  const currencyNavItem = Navigation.currency(props.selectedCurrency, () => {
    props.setShowCurrencyModal(!props.showCurrencyModal);
    props.setShowDropdownNavbar(false); // for desktop
    props.setShowOffcanvas(false); // for mobile
  });

  const displayManageIssuesItem = (auth.authInfo?.repositories ?? []).length > 0;

  const authDropdownNavbarItems: (NavItemData | Divider)[] = [
    Navigation.items.dashboard,
    Navigation.items.fundIssues,
    ...(displayManageIssuesItem ? [Navigation.items.manageIssues] : []),
    ...(config.env === Env.Production ? [DIVIDER] : []),
    ...(config.env !== Env.Production
      ? [
          Navigation.items.fundingHistory,
          DIVIDER,
          Navigation.items.orders,
          Navigation.items.billing,
          DIVIDER,
          Navigation.items.profile,
          Navigation.items.maintainerPortal,
          DIVIDER,
        ]
      : []),
    currencyNavItem,
    DIVIDER,
    Navigation.items.howItWorks,
    Navigation.items.pricing,
    // Navigation.items.blog,
    // Navigation.items.newsletter,
    DIVIDER,
    Navigation.items.signOut,
  ];
  const authNavbarItems = [Navigation.items.dashboard, Navigation.availableCredits(availableCredits)];
  const nonAuthNavbarItems: NavItemData[] = [
    /*Navigation.items.blog,*/ /*Navigation.items.newsletter,*/ Navigation.items.howItWorks,
    Navigation.items.pricing,
  ]; // TODO: where to put ? currencyNavItem

  const _whitePaper = (
    <Button audience="ALL" level="SECONDARY" size="LARGE" asChild>
      <Link to={paths.WHITE_PAPER} target="_blank">
        WHITE PAPER
      </Link>
    </Button>
  );

  const _supportProjects = (
    <Button audience="ALL" level="PRIMARY" size="LARGE" asChild>
      <Link to={paths.PROJECTS}>Support Projects</Link>
    </Button>
  );

  return (
    <Nav className="justify-end  lg:items-center font-mich flex-grow gap-3">
      {auth.authInfo ? (
        <>
          <MobileNavbar navbarItems={authDropdownNavbarItems} />
          {authNavbarItems.map((item) => {
            return <NavbarItem key={item.title} item={item} />;
          })}
          {/*{supportProjects}*/}
          <DropdownNavbar
            showDropdownNavbar={props.showDropdownNavbar}
            setShowDropdownNavbar={props.setShowDropdownNavbar}
            navbarItems={authDropdownNavbarItems}
          />
        </>
      ) : (
        <>
          {nonAuthNavbarItems.map((item) => {
            return <NavbarItem key={item.title} item={item} />;
          })}
          {/*{supportProjects}*/}
        </>
      )}
    </Nav>
  );
}
