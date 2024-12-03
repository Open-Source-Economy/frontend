import React from "react";
import VirtuousCard from "./VirtuousCard";
import nonProfit from "src/assets/non-profit.webp";
import communitydriven from "src/assets/community-driven.webp";
import talent from "src/assets/talent.webp";
// import communityDriven from "src/assets/community-driven.webp";
// import topTalent from "src/assets/top-talent.webp";

type Card = {
  title: string;
  description: string;
  cardIcon: string;
};

const VirtuousSection: React.FC = () => {
  const cards: Card[] = [
    {
      title: "100% Non-profit",
      description: "Every penny fuels open source.",
      cardIcon: nonProfit,
    },
    {
      title: "Community-Driven",
      description: "From devs. By devs. For devs.",
      cardIcon: communitydriven,
    },
    {
      title: "Top Talent, Ethical Impact",
      description: "Access experts, guarantee fair pay.",
      cardIcon: talent,
    },
  ];

  return (
    <section className="!pt-16  !pb-16 lg:!pb-[220px] w-full">
      <h2 className="text-3xl text-center md:text-4xl font-medium  max-w-[386px] md:max-w-[470px] mx-auto lg:max-w-[800px] text-white mb-8">
        A Virtuous Way to
        <span className="relative pb-1.5 min-[1800px]:!pb-4 pl-3 w-fit">
          Secure{" "}
          <span className="absolute w-[80%] h-[6px] hidden sm:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        </span>
        Your Business
      </h2>
      <div className="xl:grid flex justify-center  items-center flex-wrap xl:grid-cols-3 gap-6 w-full !mt-16">
        {cards.map((card, index) => (
          <VirtuousCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default VirtuousSection;
