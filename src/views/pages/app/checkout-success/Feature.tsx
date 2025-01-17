import React from "react";
import { cn } from "src/components";
import { FaCheck } from "react-icons/fa6";
import { Audience, bgColorVariants } from "../../../Audience";
import ComingSoon from "src/components/commingSoon/ComingSoon";

interface FeatureItemProps {
  audience: Audience;
  title: string;
  isComingSoon?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = (props: FeatureItemProps) => {
  return (
    <div className="grid grid-flow-col justify-start 400:items-center   gap-[10px] ">
      <div className={cn("md:size-[30px] size-[24px] flex items-center  justify-center rounded-full text-primaryBg", bgColorVariants[props?.audience])}>
        <FaCheck className="cursor-default" />
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <span className="lg:text-2xl text-left text-sm 350:text-base sm:text-lg md:text-xl font-montserrat font-medium text-white">{props?.title}</span>

        {props?.isComingSoon && <ComingSoon />}
      </div>
    </div>
  );
};
export default FeatureItem;
