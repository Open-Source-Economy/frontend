import React from "react";
import swissBorg from "src/assets/swiss-borg.webp";
import adidas from "src/assets/adidas.webp";
import softwareMill from "src/assets/software-mill.webp";

interface CardData {
  id: string;
  type: "swissBorg" | "adidas" | "softwareMill";
  title?: string;
  subtitle?: string;
  layout: "full" | "half" | "quarter" | "grid";
  nestedCards?: Array<Omit<CardData, "nestedCards" | "layout">>;
}

const Card: React.FC<Omit<CardData, "nestedCards" | "layout">> = ({ type, title, subtitle }) => {
  return (
    <div className="!bg-secondary rounded-lg border shadow-[0px_0px_37.357px_0px_rgba(255,81,140,0.20)] !border-primary-user p-1 flex flex-col justify-between h-full ">
      <div className="space-y-3">
        <div className="flex flex-col items-center justify-center space-x-[9px]">
          {type === "swissBorg" && (
            <>
              <img src={swissBorg} alt="SwissBorg logo" className="w-24 h-24 object-contain" />
              <span className="text-white font-medium text-4xl">SwissBorg</span>
            </>
          )}
          {type === "adidas" && <img src={adidas} alt="Adidas logo" className="w-[114px] h-[106px] object-contain" />}
          {type === "softwareMill" && <img src={softwareMill} alt="SoftwareMill logo" className="max-w-[120px] max-h-14 object-contain" />}
        </div>
        {title && <h3 className="text-white text-[26px] font-medium text-center">{title}</h3>}
        {subtitle && <p className="text-[#b6bbc2] text-xl text-center">{subtitle}</p>}
      </div>
      <button className="text-pink-500 text-lg underline underline-offset-2 !mt-1">Get in Touch</button>
    </div>
  );
};

const GridCards: React.FC<{ cards: Array<Omit<CardData, "nestedCards" | "layout">> }> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 gap-2 1800:gap-3 h-full">
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

const DynamicLayout: React.FC = () => {
  const cardsData: CardData[] = [
    // First Row
    {
      id: "1",
      type: "swissBorg",
      title: "Empowering Your Financial Freedom",
      subtitle: "A Company that Buy, sell and exchange crypto-currencies with % fees including EUR, CHF and GBP",
      layout: "half",
    },
    {
      id: "2",
      type: "swissBorg",
      title: "Distributed systems like Pekko",
      layout: "quarter",
    },
    {
      id: "3",
      layout: "quarter",
      type: "adidas",
      nestedCards: [
        {
          id: "3a",
          type: "adidas",
        },
        {
          id: "3b",
          type: "adidas",
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
        },
        {
          id: "4b",
          type: "softwareMill",
        },
        {
          id: "4c",
          type: "softwareMill",
        },
        {
          id: "4d",
          type: "softwareMill",
        },
      ],
    },
    {
      id: "5",
      type: "swissBorg",
      title: "Distributed systems like Pekko",
      layout: "quarter",
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
      title: "Distributed systems like Pekko",
      layout: "quarter",
    },
  ];

  return (
    <div className="min-h-screen !p-4 xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto">
      <h1 className="text-2xl mb-8">
        <span className="text-white">Companies</span> <span className="text-pink-500">Supporting</span> <span className="text-white">Us</span>
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 1800:gap-3">
        {/* First Row */}
        <div className="col-span-2">
          <Card {...cardsData[0]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Card {...cardsData[1]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="grid grid-rows-2 gap-2 1800:gap-3 h-full">
            {cardsData[2].nestedCards?.map(card => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="col-span-2 md:col-span-1">
          <GridCards cards={cardsData[3].nestedCards || []} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Card {...cardsData[4]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="grid grid-rows-2 gap-2 1800:gap-3 h-full">
            {cardsData[5].nestedCards?.map(card => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <Card {...cardsData[6]} />
        </div>
      </div>
    </div>
  );
};

export default DynamicLayout;
