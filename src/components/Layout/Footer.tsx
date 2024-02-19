import * as React from "react";
import logo from "../../assets/images/logo.png";
import discord from "../../assets/images/socials/discord.png";
import facebook from "../../assets/images/socials/facebook.png";
import elon from "../../assets/images/socials/x.png";
import kittyfooter from "../../assets/images/footerkit.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="position-relative ">
        <div className="d-flex justify-content-center">
          <img src={kittyfooter} className="footerkit" alt="" />
        </div>
        <div className="container py-4">
          <div className="d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap gap-lg-0 gap-4">
            <Link to="/" className="d-flex gap-3 align-items-center text-decoration-none">
              <img src={logo} className="logo" alt="" />
              <p className="logofont text-center text-white mb-0">
                Open Source <br />
                <span className="text__primary">Economy</span>
              </p>
            </Link>
            <div className="d-flex gap-lg-5 gap-3 align-items-center">
              <Link to="https://www.linkedin.com/company/open-source-economy/" className="socialimg" target="_blank">
                <img src={facebook} alt="" />
              </Link>
              <Link to="/" className="socialimg" target="_blank">
                <img src={discord} alt="" />
              </Link>

              <Link to="https://twitter.com/OS_Economy" className="socialimg" target="_blank">
                <img src={elon} alt="" />
              </Link>
            </div>
            <div>
              <a href="mailto:lauraine@open-source-economy.com" className="text-decoration-none text-reset">
                <h5 className="text-white mb-0">lauriane@open-source-economy.com</h5>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
