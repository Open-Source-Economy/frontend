import React from "react";
import whoBuiltHero from "src/assets/Rectangle.png";
import { RoundLinearBg } from "src/Utils/Icons";
import BookACall from "./BookACall";
import { virtuousCard } from "./Helper";
import VirtuousCard from "./VirtuousCard";

const VirtuousSection: React.FC = () => {
  return (
    <main className="relative w-full">
      {/* ====== BOTTOM LINEAR BACKGROUND ========= */}
      <img
        src={whoBuiltHero}
        alt=""
        className="absolute pointer-events-none  rotate-12 opacity-20 w-full object-cover -translate-x-1/2 left-1/2 z-0 max-w-[1200px] bottom-0 xl:-bottom-[4%]"
      />{" "}
      <span className="absolute bottom-[10%] max-w-[671px] w-full opacity-80 left-0">
        <RoundLinearBg />
      </span>
      {/* =============== BOOK CALL BUTTON ============ */}
      <BookACall />
      {/* ============== VIRTUOUS SECTION ============= */}
      <section className="!pt-16  !pb-16 lg:!pb-[220px] w-full  max-w-[1164px] relative 3xl:max-w-[1376px] !px-4 mx-auto ">
        <h2 className="text-3xl text-center md:text-4xl font-medium  max-w-[386px] md:max-w-[470px] mx-auto lg:max-w-[800px] text-white mb-8">
          A Virtuous Way to
          <span className="relative pb-1.5 lg:!pb-4 pl-3 w-fit">
            Secure{" "}
            <span className="absolute w-[80%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </span>
          Your Business
        </h2>
        <div className="xl:grid flex justify-center  items-center flex-wrap xl:grid-cols-3 gap-6 w-full !mt-16">
          {virtuousCard.map((card, index) => (
            <VirtuousCard key={index} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default VirtuousSection;
