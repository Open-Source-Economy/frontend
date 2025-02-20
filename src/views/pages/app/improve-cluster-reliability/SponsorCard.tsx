import type React from "react";
import leftCat from "src/assets/cat-with-heart-2-right.webp";
import rightCat from "src/assets/cat-with-heart.webp";

import type { CardSize, SponsorCardData } from "./types";

const SponsorCard: React.FC<Omit<SponsorCardData, "nestedCards" | "layout"> & { size?: CardSize }> = ({
  title,
  subtitle,
  isUnderline,
  details,
  description,
  isLeftCat,
  className,
  isRightCat,
  imgClasses,
  main,
  imgUrl,
}) => {
  return (
    <div
      className={`${className} w-full !bg-secondary rounded-lg !relative border shadow-[0px_0px_37.357px_0px_rgba(255,81,140,0.20)] !border-primary-user !p-3  gap-2 flex-col  h-full flex justify-start sm:justify-between`}
    >
      {isLeftCat && (
        <div className="w-full flex justify-start relative">
          {" "}
          <img
            src={leftCat || "/placeholder.svg"}
            alt="Cat with heart left"
            className="max-w-12 sm:max-w-14 lg:max-w-16 w-full absolute 1800:max-w-[78px] object-contain  -ml-[3%] sm:-ml-[5%] lg:-ml-[10%] -mt-[5%] lg:-mt-[10%] xl:-ml-[12%] xl:-mt-[8%]"
          />
        </div>
      )}
      {isRightCat && (
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
        <div className={`${main ? "md:px-10 sm:!pt-5 sm:px-16 gap-2 xl:gap-10 justify-between" : "justify-center"} flex  w-full items-center`}>
          {main === true && (
            <img
              src={leftCat || "/placeholder.svg"}
              alt="Left Cat with heart"
              className="max-w-12 md:max-w-20 h-fit xl:max-w-24 1800:max-w-[102px] object-contain"
            />
          )}{" "}
          <img src={imgUrl} alt="Sponsor" className={`${imgClasses} object-contain w-full max-w-[180px] 2xl:max-w-[250px]`} />
          {main === true && (
            <img
              src={rightCat || "/placeholder.svg"}
              alt="Right Cat with heart"
              className="max-w-12 md:max-w-20 xl:max-w-24 h-fit 1800:max-w-[102px] object-contain"
            />
          )}
        </div>
        {subtitle && <h4 className="text-white mt-2 text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{subtitle}</h4>}
      </div>
      {title && (
        <h3
          className={` ${
            isUnderline ? "!pb-2.5 lg:!pb-4" : ""
          } text-white text-xl 1700:text-2xl w-fit 1800:text-[26px] font-medium mx-auto relative text-center `}
        >
          {isUnderline && (
            <span className="absolute w-[80%] sm:w-[110%] h-1 3xl:h-[6px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          )}
          {title}
        </h3>
      )}
      {details && <h4 className="!text-[#b6bbc2] text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{details}</h4>}

      {description && <p className="text-center text-[10px] xl:text-xs max-w-[244px] mx-auto">{description}</p>}

      <button className="text-pink-500  text-sm 1700:text-base hover:text-white duration-300 ease-linear transition-all 1800:text-lg underline underline-offset-2">
        Get in Touch
      </button>
    </div>
  );
};

export default SponsorCard;
