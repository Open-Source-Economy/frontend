import React from "react";
import { Link } from "react-router-dom";
import { Currency } from "src/model";
import { displayedCurrencies } from "src/views/data";

interface MobileNavbarProps {
  selectedCurrency: Currency;
  closeSidebar: () => void;
  showModal: () => void;
}

export function MobileNavbar({ selectedCurrency, closeSidebar, showModal }: MobileNavbarProps) {
  const currency = displayedCurrencies[selectedCurrency];

  const handleButtonClick = () => {
    showModal();
    closeSidebar();
  };
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
        <button
          className="mr-3 flex items-center w-max duration-200 gradient-bg  bg-clip-text group gap-2 font-montserrat  text-xl  text-white group"
          onClick={handleButtonClick}
        >
          <span className=" flex   items-center    group-hover:text-transparent">{currency.symbol}</span>
          <span className="group-hover:text-transparent">{currency.code}</span>
        </button>

        <Link to="/logout" className="gradient-text mr-3">
          SIGN OUT
        </Link>
      </div>
    </>
  );
}
