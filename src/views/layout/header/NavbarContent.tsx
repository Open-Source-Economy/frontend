import React, { Dispatch, SetStateAction } from "react";
import { BaseURL } from "../../../App";
import { Nav } from "react-bootstrap";
import { WebsiteNavbar } from "./website";
import { AppNavbar } from "./app";
import { Currency } from "src/model";

interface NavbarContentProps {
  baseURL: BaseURL;
  setShowOffcanvas: Dispatch<SetStateAction<boolean>>;
  showDropdownNavbar: boolean;
  showCurrencyModal: boolean;
  selectedCurrency: Currency;
  setShowDropdownNavbar: Dispatch<SetStateAction<boolean>>;
  setShowCurrencyModal: Dispatch<SetStateAction<boolean>>;
}

export function NavbarContent(props: NavbarContentProps) {
  return (
    <Nav className="justify-end !items-start  lg:!items-center font-mich flex-grow gap-3">
      {props.baseURL === BaseURL.WEBSITE && <WebsiteNavbar />}

      {props.baseURL === BaseURL.APP && (
        <AppNavbar
          setShowOffcanvas={props.setShowOffcanvas}
          showCurrencyModal={props.showCurrencyModal}
          showDropdownNavbar={props.showDropdownNavbar}
          setShowDropdownNavbar={props.setShowDropdownNavbar}
          setShowCurrencyModal={props.setShowCurrencyModal}
          selectedCurrency={props.selectedCurrency}
        />
      )}
    </Nav>
  );
}
