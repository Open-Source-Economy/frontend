import React from "react";

interface Participant {
  name: string;
  title: string;
  quote: string;
  image: string;
  mascot: string;
}

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  return (
    <div className="relative  flex flex-col items-center text-white ">
      {/* Participant Image */}
      <img src={participant.image} alt={participant.name} className="rounded-full w-[231px] h-[231px] object-cover mb-4" />
      <div className="!bg-secondary text-white rounded-full !pl-6 !pr-3 py-1 justify-between flex">
        <span className="text-sm 3xl:text-base">
          {" "}
          OSS Full time <br /> Thanks to you!
        </span>{" "}
        <img className="max-w-14 xl:max-w-16 3xl:max-w-[79px] w-full object-fill -mt-16" src={participant.mascot} alt="" />{" "}
      </div>
      {/* Participant Info */}
      <div className="text-center">
        <h3 className="font-montserrat font-semibold text-xl  2xl:text-2xl 3xl:text-[28px]">{participant.name}</h3>
        <p className="text-[#ADABAF] text-base lg:text-lg font-montserrat font-medium xl:text-xl 3xl:text-[22px]">{participant.title}</p>
        <p className="text-white opacity-80 text-base lg:text-lg font-montserrat xl:text-xl 3xl:text-[22px]">"{participant.quote}"</p>
      </div>

      {/* Badge */}
    </div>
  );
};

export default ParticipantCard;
