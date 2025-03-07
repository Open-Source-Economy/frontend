import type React from "react";
import leftCat from "src/assets/cat-with-heart-2-right.webp";
import rightCat from "src/assets/cat-with-heart.webp";
import { SponsorDescription } from "../../../../../../model";

export interface SponsorCardProps {
  sponsor: SponsorDescription;
  className?: string;
}

export function SponsorCard(props: SponsorCardProps) {
  return (
    <div
      className={`${props.sponsor.className} ${props.className} w-full !bg-secondary rounded-lg !relative border shadow-[0px_0px_37.357px_0px_rgba(255,81,140,0.20)] !border-primary-user !p-3  gap-2 flex-col  h-full flex justify-start sm:justify-between`}
    >
      {props.sponsor.isLeftCat && (
        <div className="w-full flex justify-start relative">
          {" "}
          <img
            src={leftCat || "/placeholder.svg"}
            alt="Cat with heart left"
            className="max-w-12 sm:max-w-14 lg:max-w-16 w-full absolute 1800:max-w-[78px] object-contain  -ml-[3%] sm:-ml-[5%] lg:-ml-[10%] -mt-[5%] lg:-mt-[10%] xl:-ml-[12%] xl:-mt-[8%]"
          />
        </div>
      )}
      {props.sponsor.isRightCat && (
        <div className="flex justify-end relative w-full">
          <img
            src={rightCat || "/placeholder.svg"}
            alt="Cat with heart right"
            className="max-w-12 sm:max-w-14 lg:max-w-16 absolute z-20 !top-0 h-fit 1800:max-w-20  object-contain -mr-[3%] sm:-mr-[5%] lg:-mr-[10%] !-mt-[5%] xl:!-mt-[8%]"
          />
        </div>
      )}

      <div className="flex flex-col items-center h-fit justify-center space-x-[9px]">
        {" "}
        <div className={`${props.sponsor.main ? "md:px-10 sm:!pt-5 sm:px-16 gap-2 xl:gap-10 justify-between" : "justify-center"} flex  w-full items-center`}>
          {props.sponsor.main === true && (
            <img
              src={leftCat || "/placeholder.svg"}
              alt="Left Cat with heart"
              className="max-w-12 md:max-w-20 h-fit xl:max-w-24 1800:max-w-[102px] object-contain"
            />
          )}{" "}
          <img src={props.sponsor.imgUrl} alt="Sponsor" className={`${props.sponsor.imgClasses} object-contain w-full max-w-[180px] 2xl:max-w-[250px]`} />
          {props.sponsor.main === true && (
            <img
              src={rightCat || "/placeholder.svg"}
              alt="Right Cat with heart"
              className="max-w-12 md:max-w-20 xl:max-w-24 h-fit 1800:max-w-[102px] object-contain"
            />
          )}
        </div>
        {props.sponsor.subtitle && (
          <h4 className="text-white mt-2 text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{props.sponsor.subtitle}</h4>
        )}
      </div>
      {props.sponsor.title && (
        <h3
          className={` ${
            props.sponsor.isUnderline ? "!pb-2.5 lg:!pb-4" : ""
          } text-white text-xl 1700:text-2xl w-fit 1800:text-[26px] font-medium mx-auto relative text-center `}
        >
          {props.sponsor.isUnderline && (
            <span className="absolute w-[80%] sm:w-[110%] h-1 3xl:h-[6px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          )}
          {props.sponsor.title}
        </h3>
      )}
      {props.sponsor.details && (
        <h4 className="!text-[#b6bbc2] text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{props.sponsor.details}</h4>
      )}

      {props.sponsor.description && <p className="text-center text-[10px] xl:text-xs max-w-[244px] mx-auto">{props.sponsor.description}</p>}

      {props.sponsor.callToAction && <div className="text-center text-sm 1700:text-base 1800:text-lg !text-[#b6bbc2]">{props.sponsor.callToAction}</div>}
    </div>
  );
}
