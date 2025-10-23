import React from "react";
import backdropSVG from "src/assets/v1/backdrop.svg";

export const VideoSection = () => {
  return (
    <div data-aos="fade-right" className="relative flex w-full items-center justify-center max-[540px]:pb-0">
      <div className="box-33-333 relative z-[100] flex w-full items-center justify-center rounded-[20px] lg:mx-0 lg:rounded-[50px] ">
        <div className="relative inset-0 1600:h-[690px] h-[500px] max-[1024px]:h-max z-[10] aspect-video flex w-full max-[540px]:w-full max-[540px]:rounded-[20px] items-center justify-center overflow-hidden bg-[#14233A] p-7 rounded-[50px]">
          <iframe
            className="aspect-video object-cover z-30 absolute top-0 left-0 w-full h-full "
            src="https://www.youtube.com/embed/PbtRZ-ML9DI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <img src={backdropSVG} className="pointer-events-none absolute right-[-270px] top-[-170px] z-0" alt="" />
        <img src={backdropSVG} className="pointer-events-none absolute bottom-[-210px] left-[-280px] z-0" alt="" />
      </div>
    </div>
  );
};
