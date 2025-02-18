import {
  AvailableFunding,
  BillingIcon,
  DashboardIcon,
  FundIssueIcon,
  FundungHistoryIcon,
  HowItWorksIcon,
  LogOutIcon,
  MaintainerIcon,
  OrderIcon,
  ProfileIcon,
} from "../Icons";
import { displayedCurrencies } from "src/views/data";
import { credit, Credit, Currency } from "src/model";
import React from "react";
import { paths } from "src/paths";

// Base class for all navigation items
export class NavItemData {
  readonly title: string;
  readonly icon?: React.ReactNode;
  readonly isGradient?: boolean;
  readonly isBold?: boolean;
  readonly badge?: string;

  protected constructor(
    title: string,
    options: {
      icon?: React.ReactNode;
      isGradient?: boolean;
      isBold?: boolean;
      badge?: string;
    } = {},
  ) {
    this.title = title;
    this.icon = options.icon;
    this.isGradient = options.isGradient;
    this.isBold = options.isBold;
    this.badge = options.badge;
  }
}

// Internal link navigation item
export class LinkItemData extends NavItemData {
  readonly to: string;

  constructor(
    title: string,
    to: string,
    options: {
      icon?: React.ReactNode;
      isGradient?: boolean;
      isBold?: boolean;
      badge?: string;
    } = {},
  ) {
    super(title, options);
    this.to = to;
  }
}

// External link navigation item
export class ExternalLinkItemData extends NavItemData {
  readonly href: string;

  constructor(
    title: string,
    href: string,
    options: {
      icon?: React.ReactNode;
      isGradient?: boolean;
      isBold?: boolean;
      badge?: string;
    } = {},
  ) {
    super(title, options);
    this.href = href;
  }
}

// Button navigation item
export class ButtonItemData extends NavItemData {
  readonly onClick: () => void;

  constructor(
    title: string,
    onClick: () => void,
    options: {
      icon?: React.ReactNode;
      isGradient?: boolean;
      isBold?: boolean;
      badge?: string;
    } = {},
  ) {
    super(title, options);
    this.onClick = onClick;
  }
}

export class Navigation {
  static readonly items = {
    // Authentication
    signIn: new LinkItemData("Sign In", paths.SIGN_IN),
    signOut: new LinkItemData("Sign Out", paths.LOGOUT, { icon: <LogOutIcon /> }),

    // Main navigation
    newsletter: new LinkItemData("Newsletter", "#footer"),
    blog: new ExternalLinkItemData("Blog", "https://blog.open-source-economy.com/"),

    // Issue management
    manageIssues: new LinkItemData("Manage Issues", paths.MANAGE_ISSUES, {
      icon: <MaintainerIcon />,
    }),
    fundIssues: new LinkItemData("Fund Issues", paths.FUND_ISSUES, {
      icon: <FundIssueIcon />,
    }),

    howItWorks: new LinkItemData("How it Works", paths.HOW_ITS_WORK, {
      icon: <HowItWorksIcon />,
    }),
    dashboard: new LinkItemData("Dashboard", paths.DASHBOARD, {
      icon: <DashboardIcon />,
    }),

    // User section
    fundingHistory: new LinkItemData("Funding history", "/funding-history", {
      icon: <FundungHistoryIcon />,
      isBold: true,
    }),
    orders: new LinkItemData("Orders", "/orders", {
      icon: <OrderIcon />,
    }),
    billing: new LinkItemData("Billing", "/billing", {
      icon: <BillingIcon />,
    }),
    profile: new LinkItemData("Profile", "/profile", {
      icon: <ProfileIcon />,
      badge: "Pro",
    }),

    // Maintainer section
    maintainerPortal: new LinkItemData("Maintainer Portal", "/maintainer", {
      icon: <MaintainerIcon />,
    }),
  } as const;

  // Factory method for currency selector
  static currency(selectedCurrency: Currency, onClick: () => void): ButtonItemData {
    const currency = displayedCurrencies[selectedCurrency];
    return new ButtonItemData(currency.code, onClick, {
      icon: currency.symbol,
      isGradient: true,
    });
  }

  static availableCredits(credits: Credit | null): LinkItemData {
    return new LinkItemData(credit.displayAmount(credits), "/maintainer", {
      icon: <AvailableFunding />,
    });
  }
}
