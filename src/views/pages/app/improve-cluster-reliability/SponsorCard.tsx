import type React from "react";
import type { SponsorCardData, CardSize } from "./types";
import { getCardWidth } from "./utils";
import swissBorg from "src/assets/swiss-borg.webp";
import adidas from "src/assets/adidas.webp";
import softwareMill from "src/assets/software-mill.webp";
import leftCat from "src/assets/cat-with-heart-2-right.webp";
import rightCat from "src/assets/cat-with-heart.webp";

const SponsorCard: React.FC<Omit<SponsorCardData, "nestedCards" | "layout"> & { size?: CardSize }> = ({
  type,
  title,
  subtitle,
  size,
  details,
  description,
  isLeftCat,
  className,
  isRightCat,
}) => {
  return (
    <div
      className={`${className} w-full !bg-secondary rounded-lg !relative border shadow-[0px_0px_37.357px_0px_rgba(255,81,140,0.20)] !border-primary-user !p-3  gap-2 flex-col  h-full flex justify-start sm:justify-between`}
    >
      {isLeftCat && (
        <img
          src={leftCat || "/placeholder.svg"}
          alt="Cat with heart left"
          className="max-w-12 sm:max-w-14 lg:max-w-16 w-full 1800:max-w-[78px] object-contain  -ml-[3%] sm:-ml-[5%] lg:-ml-[10%] -mt-[5%] lg:-mt-[10%] xl:-ml-[12%] xl:-mt-[8%]"
        />
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
        {type === "mainSwissBorg" && (
          <>
            <div className="flex h-[150px] justify-between w-full sm:h-full items-center md:px-10 sm:!pt-5 sm:px-16">
              <img
                src={leftCat || "/placeholder.svg"}
                alt="Left Cat with heart"
                className="max-w-12 md:max-w-20 h-fit xl:max-w-24 1800:max-w-[102px] object-contain"
              />
              <div className="flex items-center h-fit justify-center">
                <img
                  src={swissBorg || "/placeholder.svg"}
                  alt="SwissBorg logo"
                  className="max-w-40 lg:max-w-44 xl:max-w-48 h-fit 1800:max-w-[236px] object-contain"
                />
              </div>
              <img
                src={rightCat || "/placeholder.svg"}
                alt="Right Cat with heart"
                className="max-w-12 md:max-w-20 xl:max-w-24 h-fit 1800:max-w-[102px] object-contain"
              />
            </div>
          </>
        )}
        {type === "swissBorg" && (
          <>
            <img
              src={swissBorg || "/placeholder.svg"}
              alt="SwissBorg logo"
              className="lg:max-w-[68%] max-w-[155px] xl:max-w-[62%] 2xl:max-w-[70%] w-full mx-auto object-contain"
            />
            {subtitle && (
              <h4 className="text-white mt-2 text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{subtitle}</h4>
            )}
          </>
        )}
        {type === "adidas" && (
          <img src={adidas || "/placeholder.svg"} alt="Adidas logo" className="max-w-[70px] lg:max-w-24 1800:max-w-[114px] object-contain" />
        )}
        {type === "softwareMill" && (
          <img
            src={softwareMill || "/placeholder.svg"}
            alt="SoftwareMill logo"
            width={120}
            height={56}
            className="max-w-[120px] w-full 2xl:max-w-[155px] object-contain"
          />
        )}
      </div>
      {title && (
        <h3 className="text-white text-xl 1700:text-2xl w-fit 1800:text-[26px] font-medium mx-auto relative text-center !pb-2.5 lg:!pb-4">
          <span className="absolute w-[80%] sm:w-[110%] h-1 3xl:h-[6px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          {title}
        </h3>
      )}
      {details && <h4 className="!text-[#b6bbc2] text-base 1700:text-lg 1800:text-xl text-center max-w-[500px] 1800:max-w-[550px] mx-auto">{details}</h4>}

      {description && <p className="text-center text-[10px] xl:text-xs max-w-[244px] mx-auto">{description}</p>}

      <button className="text-pink-500 text-sm 1700:text-base hover:text-white duration-300 ease-linear transition-all 1800:text-lg underline underline-offset-2">
        Get in Touch
      </button>
    </div>
  );
};

export default SponsorCard;
