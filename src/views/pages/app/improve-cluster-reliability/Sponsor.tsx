import React from "react";
import swissBorg from "src/assets/swiss-borg.webp";
import adidas from "src/assets/adidas.webp";
import softwareMill from "src/assets/software-mill.webp";
import leftCat from "src/assets/cat-with-heart-2-right.webp";
import rightCat from "src/assets/cat-with-heart.webp";

interface CardData {
  id: string;
  type: "mainSwissBorg" | "swissBorg" | "adidas" | "softwareMill";
  title?: string;
  subtitle?: string;
  layout: "full" | "half" | "quarter" | "grid";
  nestedCards?: Array<Omit<CardData, "nestedCards" | "layout">>;
  subtitleColor?: string;
  descripation?: string;
  isLeft?: boolean;
  isRight?: boolean;
}

const Card: React.FC<Omit<CardData, "nestedCards" | "layout">> = ({ type, title, subtitle, subtitleColor, descripation, isLeft, isRight }) => {
  return (
    <div className="!bg-secondary rounded-lg relative border shadow-[0px_0px_37.357px_0px_rgba(255,81,140,0.20)] !border-primary-user p-1 flex gap-2 flex-col h-full justify-center">
      {isLeft && <img src={leftCat} alt="SwissBorg logo" className="max-w-16  object-contain -ml-[3%] lg:-ml-[10%] -mt-[5%] lg:-mt-[10%]" />}
      {isRight && (
        <div className="flex justify-end">
          <img
            src={rightCat}
            alt="SwissBorg logo"
            className="max-w-16 absolute top-0 h-fit 1800:max-w-[78px] object-contain -mr-[2%] lg:-mr-[5%] -mt-[5%] lg:-mt-[10%]"
          />{" "}
        </div>
      )}
      <div className="space-y-3">
        <div className="flex flex-col items-center justify-center space-x-[9px]">
          {type === "mainSwissBorg" && (
            <>
              <div className="flex justify-between w-full items-center px-10 pt-10 sm:px-16">
                <img src={leftCat} alt="SwissBorg logo" className="max-w-20 h-fit 1800:max-w-[78px] object-contain" />{" "}
                <div className="flex items-center flex-col justify-center">
                  {" "}
                  <img src={swissBorg} alt="SwissBorg logo" className="maxw-24  max-h-32 1800:max-w-[236px] object-contain" />
                </div>
                <img src={rightCat} alt="SwissBorg logo" className="max-w-20 h-fit 1800:max-w-[78px] object-contain" />{" "}
              </div>
            </>
          )}
          {type === "swissBorg" && (
            <>
              <img src={swissBorg} alt="SwissBorg logo" className="max-h-24 max-w-[60%] mx-auto object-contain" />
            </>
          )}
          {type === "adidas" && <img src={adidas} alt="Adidas logo" className="max-w-24 1800:max-w-[114px] max-h-[106px] object-contain" />}
          {type === "softwareMill" && <img src={softwareMill} alt="SoftwareMill logo" className="max-w-[120px] max-h-14 object-contain" />}
        </div>
        {title && (
          <h3 className="text-white text-xl w-fit 1800:text-[26px] font-medium mx-auto relative text-center !pb-4">
            <span className="absolute w-[100%] sm:w-[120%] h-1 3xl:h-[6px] left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>{" "}
            {title}
          </h3>
        )}
        {subtitle && <h4 className={`text-white text-lg 1800:text-xl text-center ${subtitleColor}`}>{subtitle}</h4>}
        {descripation && <p className="text-center text-xs max-w-[244px] mx-auto">{descripation}</p>}
      </div>
      <button className="text-pink-500 text-base 1800:text-lg underline underline-offset-2">Get in Touch</button>
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
      type: "mainSwissBorg",
      title: "Empowering Your Financial Freedom",
      subtitle: "A Company that Buy, sell and exchange crypto-currencies with % fees including EUR, CHF and GBP",
      layout: "half",
      subtitleColor: "!text-[#b6bbc2]",
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
          descripation: "Distributed systems like Pekko are inherently complex.",
        },
        {
          id: "3b",
          type: "adidas",
          descripation: "Distributed systems like Pekko are inherently complex.",
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
          type: "swissBorg",
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
      <h1 className="text-2xl mb-8">
        <span className="text-white">Companies</span> <span className="text-pink-500">Supporting</span> <span className="text-white">Us</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-col md:grid-cols-3 lg:grid-cols-4 gap-2 1800:gap-3">
        {/* First Row */}
        <div className="col-span-2">
          <Card {...cardsData[0]} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Card {...cardsData[1]} />
        </div>
        <div className="col-span-1">
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
