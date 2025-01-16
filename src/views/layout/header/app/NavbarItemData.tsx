import { BillingIcon, FundIssueIcon, FundungHistoryIcon, LogOutIcon, MaintainerIcon, OrderIcon, ProfileIcon } from "./Icons";
import { displayedCurrencies } from "src/views/data";
import { Currency } from "src/model";
import React from "react";

export interface NavbarItemData {
  title: string;
  href?: string; // if it is a button, href is not required
  icon?: any;
  badge?: string;
  isGradient?: boolean;
  onClick?: () => void;
  divider?: boolean;
  isBold?: boolean;
}

export const manageIssuesItem: NavbarItemData = {
  title: "Manage Issues",
  href: "/manage-issues",
  icon: <MaintainerIcon />,
};

export const fundIssuesItem: NavbarItemData = {
  title: "Fund Issues",
  href: "/fund-issues",
  icon: <FundIssueIcon />,
};

export const logoutItem: NavbarItemData = {
  title: "Sign Out",
  href: "/logout",
  icon: <LogOutIcon />,
  divider: true,
};

export const fundingHistoryItem: NavbarItemData = {
  title: "Funding history",
  href: "/funding-history",
  icon: <FundungHistoryIcon />,
  isBold: true,
};

export function currencyItem(selectedCurrency: Currency, onClick: () => void): NavbarItemData {
  return {
    title: displayedCurrencies[selectedCurrency].code,
    icon: displayedCurrencies[selectedCurrency].symbol,
    isGradient: true,
    divider: true,
    onClick,
  };
}

export const ordersItem: NavbarItemData = {
  title: "Orders",
  href: "/orders",
  icon: <OrderIcon />,
  divider: true,
};

export const billingItem: NavbarItemData = {
  title: "Billing",
  href: "/billing",
  icon: <BillingIcon />,
};

export const profileItem: NavbarItemData = {
  title: "Profile",
  href: "/profile",
  icon: <ProfileIcon />,
  divider: true,
  badge: "Pro",
};

export const maintainerPortalItem: NavbarItemData = {
  title: "Maintainer Portal",
  href: "/maintainer",
  icon: <MaintainerIcon />,
};
