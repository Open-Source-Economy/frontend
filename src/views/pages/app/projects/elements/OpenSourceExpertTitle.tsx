import React from "react";
import whoBuiltHero from "src/assets/Rectangle.png";

interface OpenSourceExpertTitleProps {}

export function OpenSourceExpertTitle(props: OpenSourceExpertTitleProps) {
  return (
    <>
      {/*/!* =================== RIGHT DONUT =============== *!/*/}
      {/*<span className="absolute hidden max-w-[200px] xl:block -right-[3%] top-[11%] 2xl:max-w-[240px]">*/}
      {/*  <RightDonutIcon />*/}
      {/*</span>*/}
      <section className="w-full pt-20 lg:!pt-32 3xl:!pt-[141px] pb-6 lg:pb-10 max-w-[1164px] relative 3xl:max-w-[1376px] !px-4 mx-auto">
        {/* ================== HERO LINEAR BG ================== */}
        <img
          src={whoBuiltHero}
          alt=""
          className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] object-cover -translate-x-1/2 left-1/2 -z-10 top-[1%] opacity-40 md:opacity-30"
        />

        {/*/!* ================== RIGHT DONUT ===================== *!/*/}
        {/*<span className="absolute hidden xl:block xl:-left-[6%] 2xl:-left-[10%] top-[4%]  max-w-[200px] 2xl:max-w-[280px]">*/}
        {/*  <DonutIcon />*/}
        {/*</span>*/}
        <h1 className="relative  text-center mx-auto   main-heading bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text">
          Open Source
        </h1>
        <h1 className="main-heading max-w-[887px] mx-auto mt-2.5">
          From the Experts{" "}
          <span className="relative block pb-3 lg:pb-5">
            Who Built It
            <span className="absolute w-[30%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
        </h1>
        <h3 className="text-[21px] md:text-2xl lg:text-3xl xl:text-[33px] text-center font-montserrat 3xl:text-[40px] mt-10 sm:mt-12 md:mt-[60px] max-w-[320px] 500:max-w-[470px]  sm:max-w-full mx-auto">
          Need help with an Open Source project?
        </h3>
        <h5 className="font-montserrat text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center opacity-70 !mt-5 max-w-[320px] 500:max-w-[470px] sm:max-w-full mx-auto">
          We're the experts who build, debug, and maintain it
        </h5>
      </section>
    </>
  );
}
