import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components";
import { useAuth } from "../../../pages/app/authenticate/AuthContext";
import { MobileNavbar } from "./MobileNavbar";
import { DropdownNavbar } from "./DropdownNavbar";
import { Currency } from "src/model";
import { config, Env } from "../../../../ultils";
import {
  billingItem,
  currencyItem,
  fundingHistoryItem,
  fundIssuesItem,
  logoutItem,
  maintainerPortalItem,
  manageIssuesItem,
  NavbarItemData,
  ordersItem,
  profileItem,
} from "./NavbarItemData";
import { NavbarItem } from "./NavbarItem";

interface AppNavbarProps {
  setShowOffcanvas: Dispatch<SetStateAction<boolean>>;
  showDropdownNavbar: boolean;
  showCurrencyModal: boolean;
  selectedCurrency: Currency;
  setShowDropdownNavbar: Dispatch<SetStateAction<boolean>>;
  setShowCurrencyModal: Dispatch<SetStateAction<boolean>>;
}

export function AppNavbar(props: AppNavbarProps) {
  const auth = useAuth();

  const currencyNavItem = currencyItem(props.selectedCurrency, () => {
    props.setShowCurrencyModal(!props.showCurrencyModal);
    props.setShowDropdownNavbar(false); // for desktop
    props.setShowOffcanvas(false); // for mobile
  });

  const displayManageIssuesItem = (auth.authInfo?.repositories ?? []).length > 0;

  const authNavbarItems: NavbarItemData[] = [
    fundIssuesItem,
    ...(displayManageIssuesItem ? [manageIssuesItem] : []),
    ...(config.env !== Env.Production ? [fundingHistoryItem, ordersItem, billingItem, profileItem, maintainerPortalItem] : []),
    currencyNavItem,
    logoutItem,
  ];
  const nonAuthNavbarItems: NavbarItemData[] = [currencyNavItem];

  const navbarItems = auth.authInfo ? authNavbarItems : nonAuthNavbarItems;

  return (
    <>
      {displayManageIssuesItem && <NavbarItem item={manageIssuesItem} style="style_1" />}
      <NavbarItem item={fundIssuesItem} style="style_1" />

      {auth.authInfo ? (
        <>
          <MobileNavbar navbarItems={navbarItems} />

          {config.env !== Env.Production && (
            <Button audience="STAKEHOLDER" level="PRIMARY" size="SMALL" asChild>
              <Link to="/TODO">BUY DOW</Link>
            </Button>
          )}

          <DropdownNavbar showDropdownNavbar={props.showDropdownNavbar} setShowDropdownNavbar={props.setShowDropdownNavbar} navbarItems={navbarItems} />
        </>
      ) : (
        nonAuthNavbarItems.map(item => {
          return <NavbarItem item={item} style="style_1" />;
        })
      )}
    </>
  );
}
