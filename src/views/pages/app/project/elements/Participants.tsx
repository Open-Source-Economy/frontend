import React from "react";
import ParticipantCard from "./ParticipantCard";
import offerLeftLinear from "src/assets/offer-linear.webp";
import rightLinear from "src/assets/right-linear-bg.png";
import faq from "src/assets/faq-bg.webp";
import { Button } from "src/components";
import { participants } from "../../whoBuiltIt/elements/Helper";

// Define the participant data interface

const Participants = () => {
  return (
    <section className="pb-20 3xl:pb-40 pt-10 md:pt-16 relative">
      <img
        src={rightLinear}
        alt="right linear Background"
        className="absolute pointer-events-none object-cover right-0 max-w-[671px] opacity-80 -z-10 -top-[15%]"
      />
      <img
        src={faq}
        alt="right linear Background"
        className="absolute pointer-events-none object-cover -translate-x-1/2 left-1/2 w-full max-h-[850px] -z-10  max-w-[780px] h-full bottom-0"
      />
      <img
        src={offerLeftLinear}
        alt="Linear background"
        className="absolute max-w-[670px] w-full -z-10 pointer-events-none left-[-10%] opacity-70 -top-[15%] xl:-top-[26%] "
      />

      <div className="3xl:max-w-[1520px] w-full !px-4 xl:!px-0 xl:max-w-[88%] 2xl:max-w-[80%] mx-auto text-center">
        {/* Title */}
        <h2 className="section-heading mx-auto lg:!pb-8 w-fit relative mb-10 md:mb-14">
          Who is Participating?
          <span className="absolute w-[50%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        </h2>

        {/* Participants List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-4 gap-14 sm:gap-8">
          {participants.map((participant, index) => (
            <ParticipantCard participant={participant} key={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="relative flex justify-center items-center !mt-7 xl:!mt-14 2xl:!mt-16 3xl:!mt-20">
          <Button audience="ALL" className="cursor-pointer" level="SECONDARY" size="LARGE" asChild>
            <span> View All</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Participants;
