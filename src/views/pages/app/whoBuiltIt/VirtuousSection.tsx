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
    <section className="py-12 w-full">
      <h2 className="text-3xl text-center md:text-4xl font-bold text-white mb-8">A Virtuous Way to Secure Your Business</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <VirtuousCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default VirtuousSection;
