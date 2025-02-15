import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/components";
import { useAuth } from "src/views/pages";
import { MobileNavbar } from "./MobileNavbar";
import { Divider, DIVIDER, DropdownNavbar } from "./DropdownNavbar";
import { Currency } from "src/model";
import { config, Env } from "src/ultils";
import { NavbarItem } from "./item/NavbarItem";
import { Nav } from "react-bootstrap";
import { paths } from "src/paths";
import { Navigation, NavItemData } from "./item/NavItemData";

interface AppNavbarProps {
  setShowOffcanvas: Dispatch<SetStateAction<boolean>>;
  showDropdownNavbar: boolean;
  showCurrencyModal: boolean;
  selectedCurrency: Currency;
  setShowDropdownNavbar: Dispatch<SetStateAction<boolean>>;
  setShowCurrencyModal: Dispatch<SetStateAction<boolean>>;
}

export function NavbarContent(props: AppNavbarProps) {
  const auth = useAuth();

  const currencyNavItem = Navigation.currency(props.selectedCurrency, () => {
    props.setShowCurrencyModal(!props.showCurrencyModal);
    props.setShowDropdownNavbar(false); // for desktop
    props.setShowOffcanvas(false); // for mobile
  });

  const displayManageIssuesItem = (auth.authInfo?.repositories ?? []).length > 0;

  const authDropdownNavbarItems: (NavItemData | Divider)[] = [
    Navigation.items.dashboard,
    DIVIDER,
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
    Navigation.items.signOut,
  ];
  const authNavbarItems = [Navigation.items.dashboard];
  const nonAuthNavbarItems: NavItemData[] = [Navigation.items.blog, Navigation.items.newsletter]; // TODO: where to put ? currencyNavItem

  const whitePaper = (
    <Button audience="ALL" level="SECONDARY" size="LARGE" asChild>
      <Link to={paths.WHITE_PAPER} target="_blank">
        WHITE PAPER
      </Link>
    </Button>
  );

  const supportProjects = (
    <Button audience="ALL" level="PRIMARY" size="LARGE" asChild>
      <Link to={paths.PROJECTS}>Support</Link>
    </Button>
  );

  return (
    <Nav className="justify-end  lg:items-center font-mich flex-grow gap-3">
      {auth.authInfo?.user ? (
        <>
          <MobileNavbar navbarItems={authDropdownNavbarItems} />
          {authNavbarItems.map(item => {
            return <NavbarItem item={item} />;
          })}
          {supportProjects}
          <DropdownNavbar
            showDropdownNavbar={props.showDropdownNavbar}
            setShowDropdownNavbar={props.setShowDropdownNavbar}
            navbarItems={authDropdownNavbarItems}
          />
        </>
      ) : (
        <>
          {nonAuthNavbarItems.map(item => {
            return <NavbarItem item={item} />;
          })}
          {supportProjects}
        </>
      )}
    </Nav>
  );
}
