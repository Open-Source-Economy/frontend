import React from "react";
import HighLightCard from "./HighLightCard";
import highlightLinear from "src/assets/highlight-linear-bg.webp";
import { highlightData } from "../whoBuiltIt/Helper";

const Highlight = () => {
  return (
    <section className="relative pt-16 md:pt-20 xl:pt-24 3xl:pt-[144px] 2xl:pb-28">
      {/* ==== LEFT LINEAR BACKGROUND ==== */}

      <div className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rotate-180 -bottom-[15%] opacity-20 blur-[80px] -z-10 w-full left-1/2 -translate-x-1/2 max-h-[700px] rounded-full h-full absolute max-w-[900px]"></div>
      <img src={highlightLinear} alt="" className="absolute left-[-2%] max-h-[671px] max-w-[781px] h-full w-full -top-[10%] -z-10 pointer-events-none" />

      <div className="!px-4 lg:!px-6 xl:!px-0 xl:max-w-[86%]  2xl:max-w-[80%] 3xl:max-w-[1440px] mx-auto flex flex-col justify-center items-center">
        {/* Title */}
        <h2 className="section-heading lg:!pb-5 3xl:!pb-8 w-fit relative mb-6 md:mb-8 lg:mb-10 3xl:mb-14">
          Highlight{" "}
          <span className="absolute w-[80%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightData.map((card, index) => (
            <HighLightCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;
