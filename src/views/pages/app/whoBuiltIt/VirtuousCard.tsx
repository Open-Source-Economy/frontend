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
    <div className="virtuous-card max-w-[370px] xl:max-w-[450px] w-full rounded-[35px] p-6 xl:!py-10">
      <div className="flex justify-center mb-4">
        <img src={card.cardIcon} alt={card.title} className="min-[1800px]:w-[133px] h-24 w-24 xl:w-28 xl:h-28 object-contain min-[1800px]:h-[133px]" />
      </div>
      <h3 className="text-[22px] xl:text-[22px] min-[1800px]:text-[28px] mt-10 min-[1800px]:mt-12 relative text-center font-montserrat !pb-4 font-semibold text-white mb-3 min-[1800px]:mb-4">
        {card.title}
        <span className="absolute w-[40%] bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-[6px]"></span>
      </h3>
      <p className="text-lg min-[1800px]:text-[22px] leading-tight xl:w-[80%] font-montserrat mx-auto text-center opacity-80">{card.description}</p>
    </div>
  );
};

export default VirtuousCard;
