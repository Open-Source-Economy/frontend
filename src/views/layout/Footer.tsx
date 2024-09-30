import * as React from "react"; // Import React and useEffect for AOS
import { useEffect } from "react";
import logo from "../../assets/logo.svg"; // Importing logo image
import "./Footer.css";
import { SocialMedia } from "../../components/socialMedia/SocialMedia";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

export const Footer = () => {
  // Defining the Footer functional component
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div className="bg-2">
      <div className="bg-1">
        <div className="boxlayers">
          <div className="container footer px-md-5">
            <div className="row">
              <div
                className="col-md-6 pt-4"
                data-aos="fade-right" // AOS animation for fading in from the right
              >
                <a href="/" className="">
                  <img src={logo} className="img-fluid footerlogo" alt="Logo" />
                </a>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <SocialMedia />
                </div>
              </div>

              <div
                className="col-md-6 pt-4"
                data-aos="fade-left" // AOS animation for fading in from the left
              >
                {/*<div className="d-flex flex-column align-items-md-end justify-content-md-end">*/}
                {/*  <h1 className="footer-h1-text">Stay Tuned!</h1>*/}
                {/*  <div className="input-group mt-2 d-flex align-items-md-end justify-content-md-end">*/}
                {/*    <input type="email" className="" placeholder="Enter your email" />*/}
                {/*    <button className="footerbtn">Join now</button>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
