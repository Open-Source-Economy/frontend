import React from "react";
import { Link } from "react-router-dom";

interface Participant {
  name: string;
  title: string;
  quote: string;
  link: string;
  image: string;
  mascot: string;
}

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <Link to={participant.link} className="relative max-w-[250px] 500:max-w-[294px] flex flex-col items-center text-white ">
      {/* Participant Image */}
      <img
        src={participant.image}
        alt={participant.name}
        className="rounded-full border border-white 3xl:w-[231px] w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] 3xl:h-[231px] object-cover mb-2 xl:mb-4"
      />
      <div className="!bg-secondary text-white rounded-full !pl-6 !pr-3 py-1 justify-between flex">
        <span className="text-xs md:text-sm 3xl:text-base">
          {" "}
          OSS Full time <br /> Thanks to you!
        </span>{" "}
        <img
          className="max-w-10 md:max-w-12 h-auto xl:max-w-16 3xl:max-w-[79px] w-full object-contain -mt-10 3xl:-mt-16"
          src={participant.mascot}
          alt=""
        />{" "}
      </div>
      {/* Participant Info */}

      <h3 className="font-montserrat font-semibold text-xl 2xl:text-2xl 3xl:text-[28px] !mt-4 3xl:!mt-[18px]">{participant.name}</h3>
      <p className="text-[#ADABAF] text-base lg:text-lg font-montserrat font-medium xl:text-xl mt-1 mb-2 3xl:text-[22px]">{participant.title}</p>
      <p className="text-white opacity-80 text-base lg:text-lg font-montserrat xl:text-xl 3xl:text-[22px]">"{participant.quote}"</p>

      {/* Badge */}
    </Link>
  );
};

export default ParticipantCard;
