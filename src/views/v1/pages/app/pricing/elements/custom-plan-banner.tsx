import React from "react";
import bannerBottomLeft from "../../../../../../assets/v1/banner/custom-plan-banner-lb.png";
import bannerBottomRight from "../../../../../../assets/v1/banner/custom-plan-banner-br.png";
import bannerTopRight from "../../../../../../assets/v1/banner/custom-plan-banner-tr.png";
import cat from "../../../../../../assets/v1/banner/custom-plan-banner-cat.png";
import backdropSVG from "src/assets/v1/backdrop.svg";
import { BookACallButton } from "../../../../components/elements/BookACallButton";

export function CustomPlanBanner() {
  return (
    <div className="relative">
      <img src={backdropSVG} className="pointer-events-none absolute z-0 -top-32 -right-32 scale-[0.65] origin-top-right" alt="backdrop" />
      <div className="relative bg-theme-blue overflow-hidden rounded-[20px]">
        {/* Background curved shapes */}
        <div className="absolute inset-0">
          <img src={bannerBottomLeft} className="absolute -bottom-12 -left-28" alt="" />
          <img src={bannerBottomRight} className="absolute -bottom-48 -right-24" alt="" />
          <img src={bannerTopRight} className="absolute -top-60 right-0" alt="" />
        </div>

        {/* Content container */}
        <div className="relative w-full px-6 lg:px-[106px] py-12 lg:py-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <div data-aos="fade-up" data-aos-duration="1000" className="text-white z-10">
            <h2 className="text-xl md:text-2xl font-bold">Need a Custom Plan?</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 mt-2">Let's design a subscription that matches your enterprise requirements</p>
            <BookACallButton />
            {/*<button*/}
            {/*  type="button"*/}
            {/*  className="font-michroma bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-white px-10 py-3 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"*/}
            {/*>*/}
            {/*  <FaPhone className="w-5 h-5" />*/}
            {/*  Let's talk*/}
            {/*</button>*/}
          </div>

          {/* Right side astronaut cat */}
          <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200" className="flex justify-end mt-8 md:mt-0 z-10">
            <div className="flex md:items-start flex-col md:flex-row">
              <div className="text-center md:order-last bg-theme-pink text-white font-medium text-xl px-3 py-1 mt-2 rounded-full relative after:absolute after:content-[''] after:border-[12px] after:border-transparent max-md:after:border-t-theme-pink max-md:after:-bottom-5 max-md:after:left-1/2 max-md:after:-translate-x-1/2 md:after:border-t-theme-pink md:after:left-5 md:after:-bottom-5">
                LETS TALK
              </div>
              <img src={cat} width={170} height={234} alt="Astronaut Cat" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
