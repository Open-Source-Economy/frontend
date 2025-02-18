import type React from "react";
import SponsorCard from "./SponsorCard";
import type { SponsorCardData, CardSize } from "./types";
import { getCardWidth } from "./utils";

const Sponsor: React.FC = () => {
  const sponsorData: SponsorCardData[] = [
    {
      id: "1",
      type: "mainSwissBorg" as const,
      title: "Empowering Your Financial Freedom",
      size: "xlarge" as CardSize,
      isUnderline: true,
      details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    },
    {
      id: "2",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      isRightCat: true,
    },
    {
      id: "3",
      type: "adidas" as const,
      size: "large" as CardSize,
      nestedCards: [
        { id: "3a", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
        { id: "3b", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
      ],
    },
    {
      id: "4",
      type: "softwareMill" as const,
      size: "large" as CardSize,

      nestedCards: [
        { id: "4a", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "4b", type: "swissBorg" as const, className: "!justify-center !gap-1" },
        { id: "4c", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "4d", type: "softwareMill" as const, className: "!justify-center !gap-1" },
      ],
    },
    {
      id: "5",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      isRightCat: true,
    },
    {
      id: "6",
      type: "adidas" as const,
      size: "large" as CardSize,
      nestedCards: [
        { id: "3a", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
        { id: "3b", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
      ],
    },
    {
      id: "7",
      type: "swissBorg" as const,
      isLeftCat: true,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
    },
  ];
  const alternateSponsorData: SponsorCardData[] = [
    {
      id: "1",
      type: "softwareMill" as const,
      size: "small" as CardSize,
      position: 0,
      nestedCards: [
        { id: "5a", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "5b", type: "softwareMill" as const, className: "!justify-center !gap-1" },
      ],
    },
    {
      id: "2",
      type: "mainSwissBorg" as const,
      title: "Empowering Your Financial Freedom",
      size: "xlarge" as CardSize,
      details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
      position: 2,
    },
    {
      id: "3",
      type: "softwareMill" as const,
      size: "small" as CardSize,
      position: 0,
      nestedCards: [
        { id: "5a", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "5b", type: "softwareMill" as const, className: "!justify-center !gap-1" },
      ],
    },
    {
      id: "4",
      type: "adidas" as const,
      size: "large" as CardSize,
      position: 5,
      nestedCards: [
        { id: "5a", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
        { id: "5b", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
      ],
    },
    {
      id: "5",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      position: 3,
      isLeftCat: true,
    },
    {
      id: "6",
      type: "adidas" as const,
      size: "large" as CardSize,
      position: 4,
      nestedCards: [
        { id: "5a", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
        { id: "5b", type: "adidas" as const, className: "!gap-0.5 !pt-1 !pb-3", description: "Distributed systems like Pekko are inherently complex." },
      ],
    },
    {
      id: "7",
      type: "softwareMill" as const,
      size: "small" as CardSize,
      position: 0,
      nestedCards: [
        { id: "5a", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "5b", type: "softwareMill" as const, className: "!justify-center !gap-1" },
      ],
    },
    {
      id: "8",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      position: 3,
      isRightCat: true,
    },
    {
      id: "9",
      type: "softwareMill" as const,
      size: "small" as CardSize,
      position: 0,
      nestedCards: [
        { id: "5a", type: "softwareMill" as const, className: "!justify-center !gap-1" },
        { id: "5b", type: "softwareMill" as const, className: "!justify-center !gap-1" },
      ],
    },
  ];
  const otherSponsorData: SponsorCardData[] = [
    {
      id: "1",
      type: "swissBorg" as const,
      size: "large" as CardSize,
      subtitle: "Distributed systems like Pekko",
      isRightCat: true,
      position: 6,
    },
    {
      id: "2",
      type: "adidas" as const,
      className: "!gap-0.5 !pt-1 !pb-3",
      size: "large" as CardSize,
      position: 5,
      nestedCards: [
        { id: "2a", type: "softwareMill" as const, size: "xsmall" as CardSize, className: "!justify-center !gap-1" },
        { id: "2b", type: "softwareMill" as const, size: "xsmall", className: "!justify-center !gap-1" },
        {
          id: "2b",
          type: "adidas" as const,
          size: "large" as CardSize,
          className: "!justify-center !gap-0.5 !pt-1 !pb-3 !col-span-2",
          description: "Distributed systems like Pekko are inherently complex.",
        },
      ],
    },
    {
      id: "3",
      type: "mainSwissBorg" as const,
      title: "Empowering Your Financial Freedom",
      size: "xlarge" as CardSize,
      details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
      position: 5,
    },
    {
      id: "4",
      type: "adidas" as const,
      className: "!gap-0.5 !pt-1 !pb-3",
      size: "large" as CardSize,
      position: 1,
      nestedCards: [
        { id: "2a", type: "softwareMill" as const, size: "xsmall" as CardSize, className: "!justify-center !gap-1" },
        { id: "2b", type: "softwareMill" as const, size: "xsmall", className: "!justify-center !gap-1" },
        {
          id: "2b",
          type: "adidas" as const,
          className: "!gap-0.5 !pt-1 !pb-3 !col-span-2",
          description: "Distributed systems like Pekko are inherently complex.",
          size: "large" as CardSize,
        },
      ],
    },
    {
      id: "5",
      type: "mainSwissBorg" as const,
      title: "Empowering Your Financial Freedom",
      size: "xlarge" as CardSize,
      details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
      position: 0,
    },
    {
      id: "6",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      isRightCat: true,
      position: 5,
    },
  ];

  return (
    <section className="!px-4 2xl:!px-0">
      <div className="!pb-32 xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto">
        <h1 className="main-heading relative mb-8 w-fit text-center mx-auto pb-4">
          <span className="absolute w-[80%] h-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          Companies <span className="bg-gradient-custom text-transparent bg-clip-text">Supporting</span> Us
        </h1>

        {[sponsorData, alternateSponsorData, otherSponsorData].map((dataArray, index) => (
          <div key={index} className={`flex flex-wrap !justify-center gap-2 1800:gap-3 w-full pt-2 1800:pt-3`}>
            {dataArray.map((card, idx) => (
              <div key={card.id} className={`${getCardWidth(card.size)} ${card.position !== undefined ? `order-${card.position} lg:!order-none` : ""}`}>
                {card.nestedCards ? (
                  <div
                    className={` grid gap-2 1800:gap-3 min-h-full min-w-full ${card.nestedCards.length >= 3 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-1"}`}
                  >
                    {card.nestedCards.map(nestedCard => (
                      <SponsorCard key={nestedCard.id} {...nestedCard} className={`${nestedCard.className || ""}`} />
                    ))}
                  </div>
                ) : (
                  <SponsorCard className={``} {...card} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsor;
