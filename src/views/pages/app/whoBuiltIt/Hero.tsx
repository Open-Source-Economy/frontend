import React from "react";
import whoBuiltHero from "src/assets/Rectangle.png";

const Hero = () => {
  return (
    <>
      <h1 className="!mt-20 relative lg:!mt-32 min-[1800px]:!mt-[141px]  who-built-it-main-heading bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text">
        Open Source
      </h1>
      <img src={whoBuiltHero} alt="" className="absolute pointer-events-none z-0 top-0 min-[1440px]:hidden sm:!-top-20 opacity-40 sm:opacity-30" />
      <h1 className="who-built-it-main-heading max-w-[887px] mx-auto mt-2.5">
        From the Experts{" "}
        <span className="relative block pb-3 lg:pb-5">
          Who Built It
          <span className="absolute w-[30%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
        </span>{" "}
      </h1>

      <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-[33px] text-center font-montserrat min-[1800px]:text-[40px] mt-12 md:mt-[60px]">
        Need help with an Open Source project?
      </h3>
      <h5 className="font-montserrat text-sm md:text-xl text-center min-[1800px]:text-2xl opacity-70 !mt-5">
        We're the experts who build, debug, and maintain it
      </h5>
    </>
  );
};

export default Hero;
