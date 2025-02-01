import React from "react";
import SponsorCard from "./SponsorCard";

interface SponsorCardData {
  id: string;
  type: "mainSwissBorg" | "swissBorg" | "adidas" | "softwareMill";
  title?: string;
  subtitle?: string;
  layout: "full" | "half" | "quarter" | "grid";
  nestedCards?: Array<Omit<SponsorCardData, "nestedCards" | "layout">>;
  details?: string;
  description?: string;
  isLeft?: boolean;
  isRight?: boolean;
  className?: string;
}

const GridCards: React.FC<{ cards: Array<Omit<SponsorCardData, "nestedCards" | "layout">> }> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 gap-2 1800:gap-3 h-full">
      {cards.map(card => (
        <SponsorCard key={card.id} {...card} />
      ))}
    </div>
  );
};

const Sponsor: React.FC = () => {
  const sponsorData: SponsorCardData[] = [
    // First Row
    {
      id: "1",
      type: "mainSwissBorg",
      title: "Empowering Your Financial Freedom",
      layout: "half",
      details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    },
    {
      id: "2",
      type: "swissBorg",
      subtitle: "Distributed systems like Pekko",
      layout: "quarter",
      isRight: true,
    },
    {
      id: "3",
      layout: "quarter",
      type: "adidas",

      nestedCards: [
        {
          id: "3a",
          type: "adidas",
          className: "!pt-1 !gap-1 !pb-3",
          description: "Distributed systems like Pekko are inherently complex.", // Changed to 'description'
        },
        {
          id: "3b",
          className: "!py-1",
          type: "adidas",
          description: "Distributed systems like Pekko are inherently complex.", // Changed to 'description'
        },
      ],
    },
    // Second Row
    {
      id: "4",
      layout: "quarter",
      type: "softwareMill",
      nestedCards: [
        {
          id: "4a",
          type: "softwareMill",
          className: "!justify-center",
        },
        {
          id: "4b",
          type: "swissBorg",
          className: "!justify-center",
        },
        {
          id: "4c",
          type: "softwareMill",
          className: "!justify-center",
        },
        {
          id: "4d",
          type: "softwareMill",
          className: "!justify-center",
        },
      ],
    },
    {
      id: "5",
      type: "swissBorg",
      subtitle: "Distributed systems like Pekko",
      layout: "quarter",
      isRight: true,
    },
    {
      id: "6",
      layout: "quarter",
      type: "adidas",
      nestedCards: [
        {
          id: "6a",
          type: "adidas",
        },
        {
          id: "6b",
          type: "adidas",
        },
      ],
    },
    {
      id: "7",
      type: "swissBorg",
      isLeft: true,
      subtitle: "Distributed systems like Pekko",
      layout: "quarter",
    },
  ];

  return (
    <div className="!pb-32 !p-4 xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto">
      <h1 className="main-heading relative mb-8 w-fit text-center mx-auto !pb-4 1800:!pb-8 2xl:mb-16">
        <span className="absolute w-[80%]  h-1 3xl:h-[6px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        Companies <span className="!bg-gradient-custom text-transparent bg-clip-text">Supporting</span> Us
      </h1>

      <div className="grid grid-cols-1 sm:grid-col md:grid-cols-3 lg:grid-cols-4 gap-2 1800:gap-3 w-full">
        {/* First Row */}
        <div className="col-span-2">
          <SponsorCard {...sponsorData[0]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <SponsorCard {...sponsorData[1]} />
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2 gap-2 1800:gap-3 h-full">
            {sponsorData[2].nestedCards?.map(card => (
              <SponsorCard key={card.id} {...card} />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="col-span-2 md:col-span-1">
          <GridCards cards={sponsorData[3].nestedCards || []} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <SponsorCard {...sponsorData[4]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="grid grid-rows-2 gap-2 1800:gap-3 h-full">
            {sponsorData[5].nestedCards?.map(card => (
              <SponsorCard key={card.id} {...card} />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <SponsorCard {...sponsorData[6]} />
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
