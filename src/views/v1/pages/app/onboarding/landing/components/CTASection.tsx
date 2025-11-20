import React from "react";
import { BookACallButton } from "../../../../../components/elements/BookACallButton";
import { Audience } from "src/views/index";

interface CTASectionProps {}

export function CTASection(props: CTASectionProps) {
  return (
    <div className="flex px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[200px] flex-col items-center gap-6 sm:gap-8 self-stretch">
      <div className="flex h-[105px] flex-col items-center gap-4 self-stretch">
        <h2 className="self-stretch text-white text-center font-michroma text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-[130%]">
          Got A Question?
        </h2>
        <p className="self-stretch text-white text-center font-montserrat text-lg sm:text-xl md:text-2xl lg:text-[28px] font-normal leading-normal">
          Book a meeting with our team
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 self-stretch">
        <BookACallButton audience={Audience.ALL} level="PRIMARY" className="!font-michroma !text-xs !normal-case" />
      </div>
    </div>
  );
}
