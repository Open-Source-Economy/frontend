import React from "react";
import { Maintainer } from "../../../../../dtos";
import { ExternalLink } from "../../../../../components";

interface ParticipantCardProps {
  maintainer: Maintainer;
}

export function ParticipantCard(props: ParticipantCardProps) {
  return (
    <>
      <div className="relative z-20 max-w-[250px] 500:max-w-[294px] flex flex-col items-center text-white ">
        {/* Participant Image */}
        <ExternalLink href={props.maintainer.githubPage}>
          <img
            src={props.maintainer.githubAvatar}
            alt={props.maintainer.displayName}
            className="rounded-full border border-white 3xl:w-[231px] w-[150px] h-[150px] xl:w-[200px] xl:h-[200px] 3xl:h-[231px] object-cover mb-2 xl:mb-4"
          />
        </ExternalLink>
        <div className="!bg-secondary text-white rounded-full !pl-6 !pr-3 py-1 justify-between flex">
          <span className="text-xs md:text-sm 3xl:text-base">{props.maintainer.mascotAlt}</span>{" "}
          <img
            className="max-w-10 md:max-w-12 h-auto xl:max-w-16 3xl:max-w-[79px] w-full object-contain -mt-10 3xl:-mt-16"
            src={props.maintainer.mascot}
            alt=""
          />{" "}
        </div>
        {/* Participant Info */}

        <ExternalLink href={props.maintainer.githubPage}>
          <h3 className="font-semibold text-xl 2xl:text-2xl 3xl:text-[28px] !mt-4 3xl:!mt-[18px]">{props.maintainer.displayName}</h3>
        </ExternalLink>
        <p className="text-[#ADABAF] text-base lg:text-lg font-medium xl:text-xl mt-1 mb-2 3xl:text-[22px]">{props.maintainer.title}</p>
        {props.maintainer.quote && <p className="text-white opacity-80 text-base lg:text-lg xl:text-xl 3xl:text-[22px]">"{props.maintainer.quote}"</p>}
      </div>
    </>
  );
}
