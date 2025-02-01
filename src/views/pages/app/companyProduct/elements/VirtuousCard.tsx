import React from "react";

interface VirtuousCardProps {
  title: string;
  description: string;
  cardIcon: string;
  ishover?: boolean;
  isborder?: boolean;
}

export function VirtuousCard(props: VirtuousCardProps) {
  return (
    <div
      className={`max-w-[370px] xl:max-w-[450px] z-20 duration-300 ease-in-out transition-all cursor-pointer bg-primaryBg hover:shadow-[0px_0px_50px_0px_rgba(208,102,99,0.28)] w-full rounded-2xl xl:rounded-[35px] p-6 xl:!py-10 ${
        props.isborder ? "virtuous-props" : ""
      } ${props.ishover ? "hover:shadow-[0px_0px_50px_0px_rgba(208,102,99,0.28)] " : ""}`}
    >
      <div className="flex justify-center mb-4">
        <img src={props.cardIcon} alt={props.title} className="3xl:w-[133px] h-24 w-24 xl:w-28 xl:h-28 object-contain 3xl:h-[133px]" />
      </div>
      <h3 className="text-[22px] xl:text-[22px] 3xl:text-[28px] mt-10 3xl:mt-12 relative text-center !pb-4 font-semibold text-white mb-3 3xl:mb-4">
        {props.title}
        <span className="absolute w-[40%] bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-[6px]"></span>
      </h3>
      <p className="text-lg 3xl:text-[22px] leading-tight xl:w-[80%] mx-auto text-center opacity-80">{props.description}</p>
    </div>
  );
}
