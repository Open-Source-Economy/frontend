import * as React from "react"; // Import React and useEffect for AOS
import { useEffect } from "react";
import logo from "../../assets/logo.svg"; // Importing logo image
import "./Footer.css";
import { SocialMedia } from "../../components/socialMedia/SocialMedia";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export const Footer = () => {
  const footerWrapper = React.useRef(null);
  // Defining the Footer functional component
  useEffect(() => {
    gsap.fromTo(
      footerWrapper.current,
      { x: -200, opacity: 0 },
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
          markers: true,
        },
      }
    );
  }, []);

  return (
    <div className="bg-2 ">
      <div className="bg-1">
        <div className="boxlayers ">
          <div ref={footerWrapper} className="container  footer px-md-5">
            <div className="row">
              <div className="col-md-6 pt-4">
                <a href="/" className="">
                  <img src={logo} className="img-fluid footerlogo" alt="Logo" />
                </a>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <SocialMedia />
                </div>
              </div>

              <div className="col-md-6 pt-4">
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
