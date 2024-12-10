import React from "react";
import WhatWeOfferCard, { CardData } from "./WhatWeOfferCard";
import support from "src/assets/support-logo.webp";
import rightLinear from "src/assets/right-linear-bg.png";
import development from "src/assets/write-code.webp";
import advisory from "src/assets/advisory.webp";
import offerLeftLinear from "src/assets/offer-linear.webp";
import operation from "src/assets/operation.webp";
import { Button } from "src/components";

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
    <section className="relative pt-10">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px]  z-0 top-[20%]" />
      <img src={offerLeftLinear} alt="" className="absolute max-w-[970px] w-full -z-10 pointer-events-none left-[-2%] -top-[15%] xl:-top-[36%] " />
      <div className="max-w-[1440px] !px-5 mx-auto relative z-20 ">
        <div className="grid lg:place-items-start  place-items-center grid-cols-1 lg:grid-cols-2  !gap-5 2xl:!gap-10">
          {whatWeOfferData.map((card, index) => (
            <WhatWeOfferCard key={index} card={card} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 xl:mt-14 3xl:mt-16">
          <Button audience="ALL" level="PRIMARY" size="LARGE" asChild>
            <span>Book a Metting</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
