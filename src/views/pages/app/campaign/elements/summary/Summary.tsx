import React from "react";
import VideoPlayer from "./VideoContainer";
import { FeatureList } from "./FeatureList";
import { CampaignDescription } from "src/dtos";

interface SummaryProps extends CampaignDescription.Summary {}

export function Summary(props: SummaryProps) {
  return (
    <>
      {props.summaryType === CampaignDescription.Summary.Type.ONE && (
        <>
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-[36px] !leading-[129%] 1300:text-4xl 1700:text-[48px] 3xl:text-[50px] text-center sm:!text-left !mx-auto xl:!mx-0 !font-michroma !pb-4 2xl:!pb-5 3xl:!pb-6 w-fit relative !mt-3 xl:!mt-4">
            {props.title}
            <span className="absolute w-[28%] h-[6px] left-1/2 -translate-x-1/2 xl:-translate-x-0 xl:left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>
          <p className="text-center !leading-[154%] xl:!text-left text-sm sm:text-lg mx-auto xl:!mx-0 font-medium 1600:text-xl max-w-[650px] w-full 3xl:max-w-[770px] 3xl:text-[26px] !mt-4 xl:!mt-6 2xl:mt-7 3xl:!mt-[35px]">
            {props.subtitle}
          </p>
          <p className="text-sm text-center xl:!text-left sm:text-left sm:text-lg font-medium 1600:text-xl 3xl:text-[26px] xl:!my-5 !my-3 3xl:!my-6">
            We need your help.
          </p>
        </>
      )}

      {props.summaryType === CampaignDescription.Summary.Type.TWO && (
        <>
          <h2 className="section-heading sm:!text-nowrap !mx-auto xl:!mx-0 !font-michroma !pb-4 2xl:!pb-6 3xl:!pb-8 w-fit relative !mb-3 3xl:!mb-4 !mt-3">
            {props.title}
            <span className="absolute w-[25%] h-[6px] left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>
          <VideoPlayer />
          <p className="text-sm xl:text-lg font-medium 3xl:text-xl !my-4 xl:!my-2 3xl:!my-4">{props.subtitle}</p>
        </>
      )}

      {props.features && <FeatureList features={props.features} summaryType={props.summaryType} />}
    </>
  );
}
