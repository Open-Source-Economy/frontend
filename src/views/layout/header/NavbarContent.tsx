import React, { useEffect, useRef, useState } from "react";
import { BaseURL } from "../../../App";
import { Button, ExternalLink } from "../../../components";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useAuth } from "../../pages/app/authenticate/AuthContext";
import catimg from "../../../assets/header.svg";
import { BillingIcon, EuroIcon, EuroIconTwo, FundIssueIcon, FundungHistoryIcon, LogOutIcon, MaintainerIcon, OrderIcon, ProfileIcon } from "./Icons";
import CurrencyModal from "./CurrencyModal";

interface NavbarContentProps {
  baseURL: BaseURL;
}
interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  badge?: string;
  isGradient?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  divider?: boolean;
  isBold?: boolean;
}

export function NavbarContent(props: NavbarContentProps) {
  const auth = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const [showdropdown, setShowdropdown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    name: "United States Dollar",
    code: "USD",
    symbol: "US$",
  });
  const navItems: NavItem[] = [
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
      title: "EUR",
      href: "/",
      icon: <EuroIcon />,
      isButton: true,
      isGradient: true,
      divider: true,
      onClick: () => {
        setIsOpen(!isOpen);
        setShowdropdown(false);
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

  //==========closing dropdown on click outside================
  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowdropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <Nav className="justify-end  lg:items-center font-mich flex-grow gap-3">
      {props.baseURL === BaseURL.WEBSITE && (
        <>
          <ExternalLink href="https://blog.open-source-economy.com/" className="gradient-text mr-8">
            Blog
          </ExternalLink>
          <Button audience="ALL" level="SECONDARY" size="LARGE" asChild>
            <Link to="/white-paper" target="_blank">
              WHITE PAPER
            </Link>
          </Button>
        </>
      )}
      {props.baseURL === BaseURL.APP && (
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
              <div className="flex lg:hidden flex-col gap-y-5">
                <Link to="/funding-history" className="gradient-text mr-3">
                  FUNDING HISTORY
                </Link>
                <Link to="/orders" className="gradient-text mr-3">
                  ORDERS
                </Link>
                <Link to="/billing" className="gradient-text mr-3">
                  BILLING
                </Link>
                <Link to="/profile" className="gradient-text mr-3">
                  PROFILE
                </Link>
                <button className="mr-3 flex gap-2 duration-300 text-white group">
                  <EuroIconTwo />
                  <span className="gradient-bg  bg-clip-text group-hover:text-transparent duration-200">EUR</span>
                </button>

                <Link to="/logout" className="gradient-text mr-3">
                  SIGN OUT
                </Link>
              </div>
              <Button audience="STAKEHOLDER" level="PRIMARY" size="SMALL" asChild>
                <Link to="/projects">BUY DOW</Link>
              </Button>

              <div className="relative lg:grid hidden place-items-center font-montserrat  cursor-pointer" ref={ref}>
                <div className="relative group size-16 rounded-full p-[2px]">
                  <div className={`absolute top-0 left-0 size-full  rounded-full group ${showdropdown ? "gradient-bg" : "bg-white "}`}>
                    <div className="absolute top-0 left-0 size-full  rounded-full duration-200  gradient-bg opacity-0 group-hover:!opacity-100"></div>
                  </div>
                  <div
                    className="w-full h-full bg-primaryBg relative z-20 rounded-full grid place-items-center pr-[2px]"
                    onClick={() => setShowdropdown(!showdropdown)}
                  >
                    <img src={catimg} className=" " alt="" />
                  </div>
                </div>
                {/* DropDown */}
                {showdropdown && (
                  <div className="absolute top-[85px] z-20 right-0  h-max min-w-[279px] p-2 shadow-[0_15px_90px_0px_rgba(0,0,0,0.6)] bg-primaryBg !border rounded-xl border-[#303f52] text-white flex flex-col gap-y-1">
                    <div className="absolute -top-[10px]  right-5 -z-10  bg-primaryBg border-t border-l border-t-[#303f52] border-l-[#303f52] rounded-tl-md rotate-45  size-5"></div>

                    {navItems.map(item => {
                      return (
                        <div key={item.title}>
                          {item.divider && <div className="h-px bg-white/5 my-2" aria-hidden="true" />}
                          {item.isButton ? (
                            <button
                              onClick={item.onClick}
                              className="flex text-lg items-center gap-3 px-3 py-2.5  rounded-lg transition-colors w-full text-left group"
                            >
                              {item.icon}
                              <span
                                className={`gradient-bg  bg-clip-text   duration-200 ${
                                  item?.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
                                } `}
                              >
                                {item.title}
                              </span>
                            </button>
                          ) : (
                            <Link
                              key={item.title}
                              to={item?.href ?? "/"}
                              className={`flex duration-300 group text-lg  items-center gap-3 px-3 py-2  rounded-lg transition-colors `}
                            >
                              {item.icon}
                              <span className={`text-base ${item?.isBold ? "font-semibold" : "font-normal"}  `}>
                                <span
                                  className={`gradient-bg  bg-clip-text  ${
                                    item?.isGradient ? "text-transparent font-medium" : "group-hover:text-transparent"
                                  }    duration-200 `}
                                >
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="ml-3 relative z-20 px-3 py-1 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-full text-sm font-medium">
                                    {item.badge}
                                  </span>
                                )}
                              </span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      <CurrencyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={currency => {
          setSelectedCurrency(currency);
          //If you want to close as the  currency is selected
          // setIsOpen(false);
        }}
        selectedCurrency={selectedCurrency}
      />
    </Nav>
  );
}
