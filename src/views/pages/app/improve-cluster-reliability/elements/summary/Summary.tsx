import React from "react";
import VideoPlayer from "./VideoContainer";
import { FeatureList } from "./FeatureList";
import { SummaryType } from "./SummaryType";

interface SummaryProps {
  summaryType: SummaryType;
}

export function Summary(props: SummaryProps) {
  return (
    <>
      {props.summaryType === SummaryType.ONE && (
        <>
          {" "}
          <h2 className="text-3xl md:text-4xl xl:text-[44px] !leading-[129%] 1300:text-5xl 1700:text-[52px] 3xl:text-[55px] text-center sm:!text-left !mx-auto xl:!mx-0 !font-michroma !pb-5 2xl:!pb-6 3xl:!pb-7 w-fit relative !mt-3 xl:!mt-4">
            Improve Cluster Reliability
            <span className="absolute w-[28%] h-[6px] left-1/2 -translate-x-1/2 xl:-translate-x-0 xl:left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>{" "}
          <p className="text-center !leading-[154%] xl:!text-left text-base sm:text-xl mx-auto xl:!mx-0 font-medium 1600:text-2xl max-w-[650px] w-full 3xl:max-w-[770px] 3xl:text-[30px] !mt-6 xl:!mt-8 2xl:mt-9 3xl:!mt-[42px]">
            Apache Pekko is an independent open source project powered by volunteers in their free time.
          </p>
          <p className="text-base text-center xl:!text-left sm:text-left sm:text-xl font-medium  1600:text-2xl 3xl:text-[30px] xl:!my-6 !my-4 3xl:!my-8">
            We need your help.{" "}
          </p>
        </>
      )}

      {props.summaryType === SummaryType.TWO && (
        <>
          {" "}
          <h2 className="section-heading sm:!text-nowrap !mx-auto xl:!mx-0 !font-michroma !pb-5 2xl:!pb-8 3xl:!pb-10 w-fit relative !mb-4 3xl:!mb-5 !mt-4">
            Improve Cluster Reliability
            <span className="absolute w-[25%] h-[6px] left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>{" "}
          <VideoPlayer />
          <p className="text-base xl:text-xl font-medium 3xl:text-2xl !my-5 xl:!my-3 3xl:!my-5">
            Apache Pekko is an independent open source project powered by volunteers in their free time.
          </p>
        </>
      )}

      <FeatureList featureListType={props.summaryType} />
    </>
  );
}
