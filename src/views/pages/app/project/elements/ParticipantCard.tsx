import React from "react";
import { Maintainer } from "../../../../../dtos";
import { ExternalLink } from "../../../../../components";

interface ParticipantCardProps {
  maintainer: Maintainer;
}

export function ParticipantCard(props: ParticipantCardProps) {
  return (
    <>
      <div className="relative z-20  w-full sm:w-[48%] xl:w-[22%] lg:max-w-[294px] flex flex-col items-center text-white ">
        {/* Participant Image */}
        <ExternalLink href={props.maintainer.githubPage}>
          <img
            src={props.maintainer.githubAvatar}
            alt={props.maintainer.displayName}
            className="rounded-full border border-white 3xl:w-[231px] w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] 3xl:h-[231px] object-cover mb-2 xl:mb-4   2xl:!mb-4 3xl:!mb-6"
          />
        </ExternalLink>
        <div className="!bg-secondary h-12 md:h-14 3xl:h-[61px] text-white rounded-full !pl-6 !pr-3 py-1 justify-between flex items-center">
          <span className="text-xs md:text-sm 3xl:text-base opacity-80 max-w-[100px] md:max-w-[140px] 3xl:max-w-[155px]">OSS Full time Thanks to you!</span>{" "}
          <img className="max-w-12 md:max-w-14 h-auto xl:max-w-16  3xl:max-w-[79px] w-full -mt-10 3xl:-mt-16" src={props.maintainer.mascot} alt="" />{" "}
        </div>
        {/* Participant Info */}

        <ExternalLink href={props.maintainer.githubPage}>
          <h3 className="font-semibold text-xl lg:text-[22px] 2xl:text-2xl 3xl:text-[28px] !mt-4 3xl:!mt-[18px]">{props.maintainer.displayName}</h3>
        </ExternalLink>
        <p className="text-[#ADABAF] text-base lg:text-lg font-medium text-nowrap mt-1 2xl:text-xl !mb-3 3xl:text-[22px]">{props.maintainer.title}</p>
        {/* {props.maintainer.quote && <p className="text-white opacity-80 text-base lg:text-lg xl:text-xl 3xl:text-[22px]">"{props.maintainer.quote}"</p>} */}
        <p className="text-white text-base lg:text-lg 2xl:text-xl 3xl:text-[22px]">“{props.maintainer.mascotAlt}”</p>
      </div>
    </>
  );
}
