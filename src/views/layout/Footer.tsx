import * as React from "react"; // Import React and useEffect for AOS
import { useEffect } from "react";
import "./Footer.css";
import { SocialMedia } from "src/components/socialMedia/SocialMedia";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css";
import { BaseURL } from "src/App"; // Import AOS CSS
import backdropSVG2 from "../../assets/footer-bd-rr.png";
import backdropSVG3 from "../../assets/footer-bd-ll.png";
import { config, Env } from "src/ultils";

interface FooterProps {
  baseURL: BaseURL;
}

export function Footer(props: FooterProps) {
  // Defining the Footer functional component
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div className="bg-2 relative">
      <img src={backdropSVG2} className="pointer-events-none absolute bottom-0 right-0 z-[-1] max-w-[500px] lg:max-w-[700px]" alt="" />
      <img src={backdropSVG3} className="pointer-events-none absolute bottom-0 left-0 z-[-1] max-w-[600px] lg:max-w-[1100px]" alt="" />

      <div className="bg-1">
        <div className="boxlayers">
          <div className="footer px-md-5 container max-[376px]:max-w-[95%]">
            <div className="row">
              <div
                className="col-md-6 pt-4"
                data-aos="fade-right" // AOS animation for fading in from the right
              >
                <a href={props.baseURL} className="">
                  <img src="/Logo-svg.svg" className="img-fluid footerlogo" alt="Logo" />
                </a>
                <div className="d-flex align-items-center mt-4 gap-3">
                  <SocialMedia />
                </div>
              </div>

              {config.env !== Env.Production && (
                <div
                  className="col-md-6 pt-4"
                  data-aos="fade-left" // AOS animation for fading in from the left
                >
                  <div className="d-flex flex-column align-items-md-end justify-content-md-end">
                    <h1 className="footer-h1-text font-mich mb-2">Stay Tuned!</h1>
                    <div className="mt-2 flex h-[56px] justify-between rounded-xl bg-white">
                      <input
                        type="email"
                        className="w-[calc(100%-122px)] border-none bg-transparent pl-3 text-sm text-black outline-none"
                        placeholder="Enter your email"
                      />

                      {/*TODO: rajaziafat: needs to be re factorized with Button*/}
                      <button
                        className={`gradient-btn-bg font-mich relative h-[57px] min-w-[112px] rounded-r-md duration-300 after:absolute after:left-1/2 after:top-1/2 after:h-[53px] after:w-[106px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-r-md after:bg-secondary after:opacity-0 after:duration-300 hover:bg-transparent after:hover:opacity-100`}
                      >
                        <span className="relative z-30">Join now</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
