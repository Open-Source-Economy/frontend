import React from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "src/views/pages/PageWrapper";
import BookACall from "./BookACall";
import Hero from "./Hero";
import Services from "./Services";
import whoBuiltHero from "src/assets/Rectangle.png";
import rightLinear from "src/assets/right-linear-bg.png";
import leftlinear from "src/assets/left-linear-bg.png";
import VirtuousSection from "./VirtuousSection";
import { DonutIcon, RightDonutIcon, RoundLinearBg } from "src/Utils/Icons";

interface WhoBuiltItProps {}

export const WhoBuiltIt: React.FC<WhoBuiltItProps> = () => {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="relative overflow-hidden">
        <span className="absolute hidden max-w-[200px] xl:block -right-[3%] top-[11%] 2xl:max-w-[240px]">
          <RightDonutIcon />
        </span>
        <img
          src={whoBuiltHero}
          alt=""
          className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] object-cover -translate-x-1/2 left-1/2 z-0 top-[1%] opacity-40 md:opacity-30"
        />{" "}
        <img
          src={whoBuiltHero}
          alt=""
          className="absolute pointer-events-none  rotate-12 opacity-20 w-full object-cover -translate-x-1/2 left-1/2 z-0 max-w-[1200px] bottom-0 xl:-bottom-[4%]"
        />{" "}
        <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover opacity-90 right-0 max-w-[671px]  z-0 top-[24%]" />
        <img src={leftlinear} alt="" className="absolute opacity-10 pointer-events-none object-cover left-0 z-0 top-[24%] xl:top-[14%]" />
        <span className="absolute bottom-[10%] max-w-[671px] w-full opacity-80 left-0">
          <RoundLinearBg />
        </span>
        <div className="max-w-[1164px] relative min-[1800px]:max-w-[1376px] !px-4 mx-auto flex flex-col items-center">
          <span className="absolute hidden xl:block xl:-left-[6%] 2xl:-left-[10%] top-[4%]  max-w-[200px] 2xl:max-w-[280px]">
            <DonutIcon />
          </span>
          {/* ============== MAIN HEADING =========== */}
          <Hero />
          {/* ============================= SERVICE CARD ===================== */}
          {/* <Services /> */}
          {/* <BookACall /> */}
          {/* ============================= VIRTUOUS SECTION ====================  */}
          <VirtuousSection />
        </div>
      </section>
    </PageWrapper>
  );
};

export default WhoBuiltIt;
