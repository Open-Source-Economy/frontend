import React from "react";
import WhatWeOfferCard, { CardData } from "./WhatWeOfferCard";
import support from "src/assets/support-logo.webp";
import development from "src/assets/write-code.webp";
import advisory from "src/assets/advisory.webp";
import operation from "src/assets/operation.webp";

export const whatWeOfferData: CardData[] = [
  {
    title: "Support",
    features: [{ name: "Customer Support" }, { name: "Technical Support" }, { name: "Deployment Support" }],
    img: support,
  },
  {
    title: "Development",
    features: [{ name: "Bug Fixes" }, { name: "New Features", comingSoon: true }, { name: "Ongoing Maintenance", comingSoon: true }],
    img: development,
  },
  {
    title: "Operation",
    features: [{ name: "Incident Support" }, { name: "Maintenance", comingSoon: true }, { name: "Supervision", comingSoon: true }],
    img: operation,
  },
  {
    title: "Advisory",
    features: [{ name: "Training and Workshops" }, { name: "Technology Assessment" }, { name: "Solution Design" }],
    comingSoon: true,
    img: advisory,
  },
];

const WhatWeOffer = () => {
  return (
    <div className="max-w-[1440px] px-5 mx-auto grid place-items-center lg:place-items-start  grid-cols-1 lg:grid-cols-2  !gap-5 2xl:!gap-10">
      {whatWeOfferData.map((card, index) => (
        <WhatWeOfferCard key={index} card={card} />
      ))}
    </div>
  );
};

export default WhatWeOffer;
