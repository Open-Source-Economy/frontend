import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Wallet from "../../components/Wallet";
import { Dropdown } from "react-bootstrap";
import solicon3 from "../../assets/images/solicon3.png";
import pfp from "../../assets/images/pfp.png";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <>
      <header>
        <nav className="container pt-4">
          <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap gap-lg-0 gap-3">
            {/* Logo */}
            <Link to="/" className="text-decoration-none">
              <div className="d-flex gap-3 align-items-center">
                <img src={logo} className="logo" alt="" />
                <p className="logofont text-center text-white mb-0">
                  Open Source <br />
                  <span className="text__primary">Economy</span>
                </p>
              </div>
            </Link>

            <Wallet />
          </div>
        </nav>
      </header>
    </>
  );
}
