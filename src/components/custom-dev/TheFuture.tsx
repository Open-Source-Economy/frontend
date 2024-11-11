// TheFuture.tsx
import React, { useEffect, useRef } from "react";
import { FutureDropDown } from "../common/FutureDropDown";
import { dropdownOptions } from "../common/Helper";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const TheFuture: React.FC = () => {
  const headingTextRef = useRef(null);
  const registerText = useRef(null);
  const formWrapper = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      headingTextRef.current,
      { y: 170, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-text-heading",
          start: "top 80%", // Starts the animation when the element is at the bottom of the viewport
          end: "top 70%", // Ends the animation when the element reaches the center of the viewport
          scrub: 2, // Smoothly scrubs the animation with the scroll
        },
      }
    );

    gsap.fromTo(
      registerText.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".register-text",
          start: "top 80%", // Starts the animation when the element is at the bottom of the viewport
          end: "top 70%", // Ends the animation when the element reaches the center of the viewport
          scrub: 2, // Smoothly scrubs the animation with the scroll
        },
      }
    );

    gsap.fromTo(
      formWrapper.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".form-wrapper",
          start: "top 80%", // Starts the animation when the element is at the bottom of the viewport
          end: "top 70%", // Ends the animation when the element reaches the center of the viewport
          scrub: 2, // Smoothly scrubs the animation with the scroll
        },
      }
    );
  }, []);
  return (
    <section id="feature" className="max-w-[1387px] w-full mx-auto !px-4 ">
      <div className="w-full the-future-bg relative max-w-[1023px] mx-auto 2xl:pt-[341px] xl:pt-[300px] lg:pt-[250px] md:pt-[200px] sm:pt-[150px] pt-20 pb-14 lg:pb-44">
        <div ref={headingTextRef} className="feature-text-heading">
          <h3 className="text-white leading-[113.115%] ff-michroma xl:text-[61px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-center">
            The future of open source is here
          </h3>
          <p className="text-white leading-[113.115%] ff_michroma xl:text-5xl lg:text-4xl md:text=3xl sm:text-2xl text-xl text-center mt-4">
            JOIN THE MOVEMENT.
          </p>
        </div>
        <h4
          ref={registerText}
          className="register-text gradient-text-future 2xl:text-[74px] xl:text-6xl lg:text-5xl md:text-4xl text-3xl text-center 2xl:mt-[189px] xl:mt-40 lg:mt-36 md:mt-32 sm:mt-28 mt-16"
        >
          Register your <br /> interest now.
        </h4>
      </div>

      <form ref={formWrapper} className="form-wrapper mx-auto flex flex-col lg:px-42 2xl:px-64 md:px-32 sm:px-10">
        <div>
          <input type="email" placeholder="Your Email*" required className="email common-layout ff_michroma" />
          <label className="flex align-items-center mt-3 gap-2 agreecheckbox">
            <input className="w-5 h-5" type="checkbox" />
            <p className="sm:text-[15px] text-xs text-[#fcfefd45] leading-[100%] ff_michroma">Sign up for news & updates</p>
          </label>

          <div className="lg:mt-14 md:mt-12 sm:mt-10 mt-8">
            <FutureDropDown
              options={dropdownOptions.profile}
              defaultValue="Your Profile"
              required
              onChange={value => console.log("Profile selected:", value)}
            />
          </div>

          <div className="lg:mt-[72px] md:mt-14 sm:mt-10 mt-8">
            <FutureDropDown
              options={dropdownOptions.project}
              defaultValue="In which open source project? (if applicable)"
              onChange={value => console.log("Project option selected:", value)}
            />
          </div>

          <div className="md:mt-[33px] mt-6">
            <h1 className="text-sm md:text-[16px] lg:text-[23px] ff_michroma text-[#FCFEFD45]">Message</h1>
            <input
              placeholder="Share your motivation..."
              type="text"
              required
              className="!mt-3 message border-bottom border-[#fff] bg-transparent lg:text-[17px] text-sm xl:pb-[199px] lg:pb-32 md:pb-20 sm:pb-16 pb-14 outline-none text-[#fff] w-100 placeholder:!text-white placeholder:!opacity-100 ff_michroma"
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="px-6 md:py-3 py-2 md:mt-5 mt-4 button ff_michroma">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TheFuture;
