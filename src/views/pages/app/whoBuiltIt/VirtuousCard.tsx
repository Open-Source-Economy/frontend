import React from "react";

type VirtuousCardProps = {
  card: {
    title: string;
    description: string;
    cardIcon: string;
  };
};

const VirtuousCard: React.FC<VirtuousCardProps> = ({ card }) => {
  return (
    <div className="virtuous-card max-w-[450px] w-full rounded-[35px]  p-6">
      <div className="flex justify-center mb-4">
        <img src={card.cardIcon} alt={card.title} className="sm:w-[133px] h-24 w-24 object-contain sm:h-[133px]" />
      </div>
      <h3 className="text-[22px] xl:text-[24px] 2xl:text-[28px] mt-12 relative text-center font-montserrat !pb-4 font-semibold text-white mb-4">
        {card.title}
        <span className="absolute w-[40%] bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-[6px]"></span>
      </h3>
      <p className="xl:text-xl text-lg 2xl:text-[22px] xl:w-[75%]  font-montserrat font-medium mx-auto text-center opacity-80">{card.description}</p>
    </div>
  );
};

export default VirtuousCard;
