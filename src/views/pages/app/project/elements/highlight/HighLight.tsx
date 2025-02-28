import React from "react";
import { HighLightCard } from "./HighLightCard";
import highlightLinear from "src/assets/highlight-linear-bg.webp";
import { highlightData } from "../../../companyProduct/elements/Helper";
import { DividerTitle } from "src/views/components";

interface HighlightProps {}

export function Highlight(props: HighlightProps) {
  return (
    <section className="relative pt-10 md:pt-16 3xl:pt-20 pb-10 2xl:pb-28">
      {/* ==== LEFT LINEAR BACKGROUND ==== */}

      <div className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rotate-180 -bottom-[15%] opacity-20 blur-[80px] -z-10 w-full left-1/2 -translate-x-1/2 max-h-[700px] rounded-full h-full absolute max-w-[900px]"></div>
      <img
        src={highlightLinear}
        alt="Highlight Background"
        className="absolute left-[-2%] max-h-[671px] max-w-[781px] h-full w-full -top-[10%] -z-10 pointer-events-none"
      />

      <DividerTitle title="Highlight" />

      <div className="!px-4 xl:!px-0 max-w-[1164px] 2xl:max-w-[1250px] 3xl:max-w-[1440px] mx-auto flex flex-col justify-center items-center">
        {/* Title */}
        {/* Cards Grid */}
        <div className="flex justify-center flex-wrap lg:grid grid-cols-3 gap-6">
          {highlightData.map((card, index) => (
            <HighLightCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
