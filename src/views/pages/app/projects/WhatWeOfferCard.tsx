import React from "react";
import comingSoon from "src/assets/coming-soon.webp";
import { ListIcon } from "src/Utils/Icons";

export interface Feature {
  name: string;
  comingSoon?: boolean; // If true, display "Coming Soon"
}

export interface CardData {
  title: string;
  features: Feature[];
  comingSoon?: boolean; // If true, display "Coming Soon" on the entire card
  img: string;
}

const WhatWeOfferCard = ({ card }: { card: CardData }) => {
  return (
    <article className="relative p-[1px] max-w-[690px] w-full h-full rounded-[35px] bg-gradient-to-r from-[#FFFFFF14] to-[#66666636]">
      {card.comingSoon && <img src={comingSoon} alt="" className="absolute max-w-[140px] 2xl:max-w-[200px] bottom-[10%] -left-3" />}
      <div className="!bg-secondary h-full rounded-[35px] py-[57px] !px-5 md:!px-6 2xl:!px-8">
        <div className="flex !gap-5 md:!gap-8 2xl:!gap-16">
          <div className="max-w-[100px] xl:max-w-[143px]">
            <img src={card.img} alt={card.title} className="w-full h-auto rounded-md" />
          </div>
          <div>
            {" "}
            <h3 className="text-3xl font-michroma relative w-fit !pb-5">
              {card.title} <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            </h3>
            {card.comingSoon && <div>Coming Soon</div>}
            <ul className="space-y-4 !mt-5">
              {card.features.map((feature, index) => (
                <li key={index} className="flex relative gap-3.5 items-center">
                  <span className="max-w-4 min-w-4 xl:min-w-[20px] md:max-w-5 max-h-5 block min-h-[17px]">
                    <ListIcon />
                  </span>
                  <span className="text-base lg:text-lg 2xl:text-[22px] text-nowrap font-montserrat relative">
                    {" "}
                    {feature.name}
                    {feature.comingSoon && (
                      <span className="absolute left-[105%] -top-2.5 leading-[100%] rounded-[5px] h-fit w-fit bg-[#243347] text-white text-[8px] font-montserrat font-semibold py-2 px-1.5">
                        (Coming Soon)
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WhatWeOfferCard;
