import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { BillingIcon, FundIssueIcon, FundungHistoryIcon, LogOutIcon, MaintainerIcon, OrderIcon, ProfileIcon } from "./Icons";
import { Button } from "src/components";
import { useAuth } from "../../../pages/app/authenticate/AuthContext";
import { MobileNavbar } from "./MobileNavbar";
import { DropdownNavbar, DropdownNavbarItem } from "./DropdownNavbar";
import { Currency } from "src/model";
import { displayedCurrencies } from "../../../data";

interface AppNavbarProps {
  closeSidebar: () => void;
  showDropdownNavbar: boolean;
  showCurrencyModal: boolean;
  selectedCurrency: Currency;
  setShowDropdownNavbar: Dispatch<SetStateAction<boolean>>;
  setShowCurrencyModal: Dispatch<SetStateAction<boolean>>;
}

export function AppNavbar(props: AppNavbarProps) {
  const auth = useAuth();

  const dropdownNavbarItems: DropdownNavbarItem[] = [
    {
      title: "Fund Issues",
      href: "/fund-issues",
      icon: <FundIssueIcon />,
    },
    {
      title: "Funding history",
      href: "/funding-history",
      icon: <FundungHistoryIcon />,
      isBold: true,
    },
    {
      title: displayedCurrencies[props?.selectedCurrency].code,
      icon: displayedCurrencies[props?.selectedCurrency].symbol,
      isButton: true,
      isGradient: true,
      divider: true,
      onClick: () => {
        props?.setShowCurrencyModal(!props?.showCurrencyModal);
        props?.setShowDropdownNavbar(false);
      },
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <OrderIcon />,
      divider: true,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: <BillingIcon />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <ProfileIcon />,
      divider: true,
      badge: "Pro",
    },
    {
      title: "Maintainer Portal",
      href: "/maintainer",
      icon: <MaintainerIcon />,
    },
    {
      title: "Sign Out",
      href: "/logout",
      icon: <LogOutIcon />,
      divider: true,
    },
  ];
  console.log("show modal", props?.showCurrencyModal);
  return (
    <>
      {(auth.authInfo?.repositories ?? []).length > 0 && (
        <Link to="/manage-issues" className="gradient-text mr-8">
          Maintainer Portals
        </Link>
      )}

      <Link to="/fund-issues" className="gradient-text mr-3">
        FUND ISSUES
      </Link>

      {auth.authInfo && (
        <>
          <MobileNavbar
            selectedCurrency={props?.selectedCurrency}
            closeSidebar={props?.closeSidebar}
            showModal={() => props?.setShowCurrencyModal(!props?.showCurrencyModal)}
          />
          <Button audience="STAKEHOLDER" level="PRIMARY" size="SMALL" asChild>
            <Link to="/projects">BUY DOW</Link>
          </Button>

          <DropdownNavbar
            showDropdownNavbar={props?.showDropdownNavbar}
            setShowDropdownNavbar={props?.setShowDropdownNavbar}
            dropdownNavbarItems={dropdownNavbarItems}
          />
        </>
      )}
    </>
  );
}
