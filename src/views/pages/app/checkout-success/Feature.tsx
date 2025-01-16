import React from "react";
import { cn } from "src/components";
import { FaCheck } from "react-icons/fa6";

import clock from "src/assets/sand-clock.png";
import { Audience, bgColorVariants } from "../../../Audience";

interface FeatureItemProps {
  audience: Audience;
  title: string;
  isComingSoon?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, audience, isComingSoon }) => {
  return (
    <div className="grid grid-flow-col justify-start  350:gap-3 gap-[10px] ">
      <div className={cn("md:size-[30px] size-[24px] flex items-center  justify-center rounded-full text-primaryBg", bgColorVariants[audience])}>
        <FaCheck className="cursor-default" />
      </div>

      <div className="flex gap-3 items-start flex-wrap">
        <span className="lg:text-2xl text-left text-sm 350:text-base sm:text-lg md:text-xl font-montserrat font-medium text-white">{title}</span>

        {isComingSoon && (
          <button className="flex items-center !cursor-default gap-2 bg-gradient-to-r from-[#FF7E4B] to-[#FF518C] text-white px-[9px] sm:px-3 sm:py-[10px] py-[8px]  rounded-[50px]">
            <img src={clock} className="w-5 h-5" alt="clock" />
            <h3 className="sm:text-[12px] text-[11px] font-semibold">coming soon</h3>
          </button>
        )}
      </div>
    </div>
  );
};
export default FeatureItem;
