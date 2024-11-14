import * as React from "react"; // Import React and useEffect for AOS
import { useEffect } from "react";
import logo from "../../assets/logo.svg"; // Importing logo image
import "./Footer.css";
import { SocialMedia } from "../../components/socialMedia/SocialMedia";
import footerRightBg from "../../assets/footer-right-bg.png";
import footerLeft from "../../assets/footer-left-bg.png";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const Footer = () => {
  const footerWrapper = React.useRef(null);
  // Defining the Footer functional component
  useEffect(() => {
    gsap.fromTo(
      footerWrapper.current,
      { x: 0, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer.container",
          start: "center bottom", // Starts the animation when the element is at the bottom of the viewport
          end: "bottom bottom", // Ends the animation when the element reaches the center of the viewport
          scrub: 2, // Smoothly scrubs the animation with the scroll
        },
      }
    );
  }, []);

  return (
    <div className=" z-10">
      <div className="relative ">
        <img className="absolute right-0 bottom-0 w-full -z-10 opacity-[0.5] pointer-events-none" src={footerRightBg} alt="" />
        <img className="absolute left-0 bottom-0 w-full -z-10 mix-blend-lighten  pointer-events-none" src={footerLeft} alt="" />
        <div className="boxlayers ">
          <div ref={footerWrapper} className="container footer px-md-5 ">
            <div className="row relative z-50">
              <div className="col-md-6">
                <a href="/" className="">
                  <img src={logo} className="img-fluid footerlogo" alt="Logo" />
                </a>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <SocialMedia />
                </div>
              </div>

              <div className="col-md-6 pt-4 mb-7 sm:mb-0">
                <div className="d-flex flex-column align-items-md-end justify-content-md-end">
                  <h1 className="footer-h1-text">Stay Tuned!</h1>
                  <div className="input-group mt-2 d-flex align-items-md-end justify-content-md-end">
                    <input type="email" className="" placeholder="Enter your email" />
                    <button className="footerbtn ">Join now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
