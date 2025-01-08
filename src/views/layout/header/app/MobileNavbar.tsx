import React from "react";
import { Link } from "react-router-dom";
import { EuroIconTwo } from "./Icons";

interface MobileNavbarProps {}

export function MobileNavbar(props: MobileNavbarProps) {
  return (
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
    </>
  );
}
