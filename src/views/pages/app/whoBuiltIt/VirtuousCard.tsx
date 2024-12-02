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
    <div className="bg-[#14233A] rounded-[35px] shadow-md p-6">
      <div className="flex justify-center mb-4">
        <img src={card.cardIcon} alt={card.title} className="sm:w-[133px] h-24 w-24 object-cover sm:h-[133px]" />
      </div>
      <h3 className="text-[28px] relative text-center font-montserrat pb-4 font-semibold text-white mb-2">
        {card.title}
        <span className="absolute w-[40%] bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-[6px]"></span>
      </h3>
      <p className="text-[22px] w-[80%] mx-auto text-center opacity-80">{card.description}</p>
    </div>
  );
};

export default VirtuousCard;
