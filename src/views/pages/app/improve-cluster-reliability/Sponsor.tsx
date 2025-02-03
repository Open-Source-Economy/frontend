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
      details: "A Company that buys, sells, and exchanges cryptocurrencies.",
      position: 0,
    },
    {
      id: "2",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      isRightCat: true,
      position: 1,
    },
    {
      id: "3",
      type: "adidas" as const,
      size: "large" as CardSize,
      position: 2,
      nestedCards: [
        { id: "3a", type: "adidas" as const, description: "Distributed systems are complex." },
        { id: "3b", type: "adidas" as const, description: "Handling scale is challenging." },
      ],
    },
    {
      id: "4",
      type: "softwareMill" as const,
      size: "large" as CardSize,
      position: 3,
      nestedCards: [
        { id: "4a", type: "softwareMill" as const, className: "!justify-center" },
        { id: "4b", type: "swissBorg" as const, className: "!justify-center" },
        { id: "4c", type: "softwareMill" as const, className: "!justify-center" },
        { id: "4d", type: "softwareMill" as const, className: "!justify-center" },
      ],
    },
    {
      id: "5",
      type: "swissBorg" as const,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      isRightCat: true,
      position: 4,
    },
    {
      id: "6",
      type: "adidas" as const,
      size: "large" as CardSize,
      position: 5,
      nestedCards: [
        { id: "6a", type: "adidas" as const },
        { id: "6b", type: "adidas" as const },
      ],
    },
    {
      id: "7",
      type: "swissBorg" as const,
      isLeftCat: true,
      subtitle: "Distributed systems like Pekko",
      size: "large" as CardSize,
      position: 6,
    },
  ];

  return (
    <section className="!px-4 2xl:!px-0">
      <div className="!pb-32  xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto">
        <h1 className="main-heading relative mb-8 w-fit text-center mx-auto pb-4">
          <span className="absolute w-[80%] h-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          Companies <span className="bg-gradient-custom text-transparent bg-clip-text">Supporting</span> Us
        </h1>

        <div className="grid grid-cols-2 900:grid-cols-3 xl:grid-cols-4 gap-2 1800:gap-3 w-full">
          {sponsorData.map(card => (
            <div key={card.id} className={getCardWidth(card.size)}>
              {card.nestedCards ? (
                <div className={`grid gap-2 1800:gap-3 min-h-full ${card.nestedCards.length >= 4 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {card.nestedCards.map(nestedCard => (
                    <SponsorCard key={nestedCard.id} {...nestedCard} />
                  ))}
                </div>
              ) : (
                <SponsorCard {...card} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
