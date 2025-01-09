import React from "react";
import { Button } from "src/components";
import { PriceType } from "src/model";
import { HeartIcon, PointingArrow } from "src/Utils/Icons";

interface PaymentHeaderProps {
  donationType: PriceType;
  handleDonationTypeChange: (type: PriceType) => void;
}

export function PaymentHeader(props: PaymentHeaderProps) {
  return (
    <>
      <div className="relative">
        <div className="flex !flex-wrap sm:!flex-nowrap !gap-5 xl:!gap-2 max-w-[97%] sm:max-w-full">
          <Button
            onClick={() => props.handleDonationTypeChange(PriceType.ONE_TIME)}
            parentClassName="w-full"
            className={`!w-full !font-montserrat !font-medium !capitalize !text-base 2xl:!text-lg 1600:!text-xl 3xl:!h-[70px] 3xl:!text-2xl hover:!text-white   ${
              props.donationType === PriceType.ONE_TIME ? "after:hover:!opacity-0 !border-none !text-white  pointer-events-none" : "!text-primary-user"
            }`}
            audience={props.donationType === PriceType.ONE_TIME ? "ALL" : "USER"}
            level={props.donationType === PriceType.ONE_TIME ? "PRIMARY" : "SECONDARY"}
            size="LARGE"
          >
            Give Once
          </Button>

          <Button
            onClick={() => props.handleDonationTypeChange(PriceType.RECURRING)}
            parentClassName="w-full"
            className={`!w-full !font-montserrat !font-medium !capitalize !text-base hover:!text-white 2xl:!text-lg 1600:!text-xl 3xl:!h-[70px] 3xl:!text-2xl  ${
              props.donationType === PriceType.RECURRING ? "after:hover:!opacity-0 !border-none !text-white pointer-events-none" : "!text-primary-user"
            }`}
            audience={props.donationType === PriceType.RECURRING ? "ALL" : "USER"}
            level={props.donationType === PriceType.RECURRING ? "PRIMARY" : "SECONDARY"}
            size="LARGE"
            icon={<HeartIcon />}
          >
            Give Monthly
          </Button>
        </div>
        {props.donationType === PriceType.ONE_TIME && (
          <span className="absolute -right-5 sm:-right-8 2xl:-right-10 3xl:-right-11 top-[90%] sm:top-[40%] xl:top-1/2">
            <PointingArrow />
          </span>
        )}
      </div>

      <div className="flex rounded-[15px] py-3 !px-4 sm:!px-[19px] bg-[#3E2946] w-full sm:max-w-full mt-3 3xl:!mt-6">
        <h1 className="text-sm sm:text-base 1600:text-lg 3xl:text-xl lg:max-w-[90%] 3xl:max-w-[97%] w-full text-primary-user font-montserrat">
          Giving monthly is an easy, effective way to be a hero for nature 365 days a year!
        </h1>
      </div>
    </>
  );
}
