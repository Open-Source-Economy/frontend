import React from "react";
import { CampaignDescription } from "src/model";

interface FeatureListProps {
  features: CampaignDescription.Summary.Feature[];
  summaryType: CampaignDescription.Summary.Type;
}

export function FeatureList(props: FeatureListProps) {
  if (props.summaryType === CampaignDescription.Summary.Type.ONE) {
    return (
      <div className="!space-y-3 relative z-20 3xl:!space-y-[19px]">
        {props.features.map(({ icon, heading, text }, index) => (
          <div key={index} className="flex items-start sm:items-center gap-4 px-6 !py-3 3xl:!py-4 cursor-pointer rounded-2xl 3xl:rounded-[35px] !bg-primaryBg">
            <div className="w-16 h-16 min-h-16 min-w-16 2xl:w-[90px] sm:w-20 sm:h-[90px] 3xl:w-[112px] 2xl:h-24 3xl:h-[112px] object-cover">{icon}</div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold 3xl:text-2xl">{heading}</h2>
              <div className="h-[3px] 3xl:h-1 my-2 2xl:my-2.5 w-full bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] max-w-[95px]"></div>
              <p className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl !leading-[130%]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 500:grid-cols-2 place-items-center flex-1 gap-x-3 gap-y-3 xl:!gap-y-5 3xl:!gap-y-6 xl:!gap-x-4 relative z-20">
        {props.features.map(({ icon, heading, text }, index) => (
          <div
            key={index}
            className="flex flex-col sm:max-w-[400px] w-full items-center text-center !px-5 pb-12 pt-8 xl:pt-12 3xl:pt-[53px] 3xl:!px-14 md:pb-16 3xl:pb-[84px] cursor-pointer rounded-2xl xl:rounded-[35px] bg-primaryBg"
          >
            <div className="w-20 h-20 min-h-20 min-w-20 sm:w-24 xl:w-[110px] xl:h-[110px] 3xl:w-[125px] sm:h-24 3xl:h-[125px] object-cover !mb-4 xl:!mb-6 3xl:!mb-[30px]">
              {icon}
            </div>
            <div className="max-w-[200px] xl:max-w-[210px] 3xl:max-w-[287px] mx-auto text-center">
              <h2 className="text-xl font-semibold lg:text-2xl xl:text-[26px] 3xl:text-3xl">{heading}</h2>
              <div className="h-1 my-2.5 2xl:my-4 3xl:my-[18px] w-full bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] max-w-[95px] mx-auto"></div>
              <p className="text-base lg:text-lg xl:text-xl 3xl:text-2xl !leading-[130%]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
