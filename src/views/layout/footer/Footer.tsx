import * as React from "react";
import { useEffect } from "react";
import { SocialMedia } from "src/views/components/socialMedia/SocialMedia";
import AOS from "aos";
import "aos/dist/aos.css";
import { BaseURL } from "src/App";
import backdropSVG2 from "../../../assets/footer-bd-rr.png";
import backdropSVG3 from "../../../assets/footer-bd-ll.png";
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
    <div className="bg-[url('./assets/bg-2.svg')] max-[1100px]:bg-none bg-cover bg-right relative">
      <img src={backdropSVG2} className="pointer-events-none absolute bottom-0 right-0 z-[-1] max-w-[500px] lg:max-w-[700px]" alt="" />
      <img src={backdropSVG3} className="pointer-events-none absolute bottom-0 left-0 z-[-1] max-w-[600px] lg:max-w-[1100px]" alt="" />

      <div className="bg-[url('./assets/bg-1.png')] max-[1100px]:bg-none bg-cover bg-left">
        <div className="bg-[url('./assets/boxes.png')]  bg-auto bg-no-repeat bg-[position:743px_0%] 1200:bg-[position:743px_0%] md:bg-[position:492px_0%]">
          <div className="pb-[30px] sm:pb-[100px] md:px-[48px] container max-[376px]:max-w-[95%]">
            <div className="flex flex-wrap">
              <div
                className="md:w-1/2 w-full pt-4"
                data-aos="fade-right" // AOS animation for fading in from the right
              >
                <a href={props.baseURL} className="">
                  <img src="/Logo-svg.svg" className="max-[540px]:w-[200px] w-[250px] " alt="Logo" />
                </a>
                <div className="flex items-center  mt-4 gap-3">
                  <SocialMedia />
                </div>
              </div>

              {config.env !== Env.Production && (
                <div className="md:w-1/2 w-full pt-4" data-aos="fade-left">
                  <div className="flex flex-col  md:items-end md:justify-end ">
                    <h1 className="text-[29px] leading-[43.5px] font-mich mb-2">Stay Tuned!</h1>
                    <div className="mt-2 flex h-[57px] max-w-[400px] w-full lg:min-w-[400px] justify-between rounded-xl bg-white">
                      <input type="email" className="w-full border-none bg-transparent pl-3 text-sm text-black outline-none" placeholder="Enter your email" />
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
