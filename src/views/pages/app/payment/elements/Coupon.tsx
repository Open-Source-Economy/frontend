import React from "react";
import couponimg from "src/assets/codeimg.png";

interface CouponProps {}

export function Coupon(props: CouponProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <img src={couponimg} className="absolute lg:top-4 md:top-3 top-4 sm:top-3 left-3 lg:w-8 lg:h-8 w-6 h-6" />
        <input
          type="number"
          name=""
          id=""
          placeholder="Enter Coupon Code"
          className="xl:text-[16px] md:text-[11px] text-[13px] bg-transparent border-0 outline-none text-[#fff] w-full sm:w-2/3 ps-5 py-3  sm:mt-0"
        />
        <button className="text-nowrap findbutton w-full py-3 sm:w-fit sm:px-3 sm:py-2 md:px-4 md:py-3 md:text-[11px] lg:text-[13px] sm:text-[10px] text-[12px]">
          Apply Coupon
        </button>
      </div>
    </>
  );
}
