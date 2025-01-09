import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BillingIcon, FundIssueIcon, FundungHistoryIcon, LogOutIcon, MaintainerIcon, OrderIcon, ProfileIcon } from "./Icons";
import { Button } from "src/components";
import { useAuth } from "../../../pages/app/authenticate/AuthContext";
import { CurrencyModal } from "./CurrencyModal";
import { MobileNavbar } from "./MobileNavbar";
import { DropdownNavbar, DropdownNavbarItem } from "./DropdownNavbar";
import { Currency } from "src/model";
import { displayedCurrencies } from "../../../data";

interface AppNavbarProps {}

export function AppNavbar(props: AppNavbarProps) {
  const auth = useAuth();

  const [showDropdownNavbar, setShowDropdownNavbar] = useState<boolean>(false);

  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState(Currency.USD);

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
      title: displayedCurrencies[selectedCurrency].code,
      icon: displayedCurrencies[selectedCurrency].symbol,
      isButton: true,
      isGradient: true,
      divider: true,
      onClick: () => {
        setShowCurrencyModal(!showCurrencyModal);
        setShowDropdownNavbar(false);
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
          <MobileNavbar />

          <Button audience="STAKEHOLDER" level="PRIMARY" size="SMALL" asChild>
            <Link to="/projects">BUY DOW</Link>
          </Button>

          <DropdownNavbar showDropdownNavbar={showDropdownNavbar} setShowDropdownNavbar={setShowDropdownNavbar} dropdownNavbarItems={dropdownNavbarItems} />

          <CurrencyModal
            isOpen={showCurrencyModal}
            onClose={() => setShowCurrencyModal(false)}
            onSelect={currency => {
              setSelectedCurrency(currency);
              // If you want to close as the  currency is selected
              setShowCurrencyModal(false);
            }}
            selectedCurrency={selectedCurrency}
          />
        </>
      )}
    </>
  );
}
