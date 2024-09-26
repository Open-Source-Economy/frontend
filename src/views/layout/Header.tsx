import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/authenticate/AuthContext";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout(); // Assuming `logout` is a function provided by `useAuth`
  };

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

            {/* Logout button */}
            {auth.user && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
