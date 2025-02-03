import React from "react";
import { CodeIcon, DollarSign } from "src/Utils/Icons";

interface CompanyBannerProps {}

export function NonProfitBanner(props: CompanyBannerProps) {
  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-wrap sm:!flex-nowrap justify-center sm:justify-between gap-3 xl:gap-8 !px-4 3xl:!px-8 my-6 3xl:my-8">
        <div className="flex items-center gap-1.5 3xl:gap-2.5">
          <span className="max-w-6 2xl:max-w-7 3xl:max-w-9">
            {" "}
            <DollarSign />
          </span>
          <span className="font-michroma text-base 2xl:text-lg 3xl:text-xl text-nowrap">100% non-profit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="max-w-6 2xl:max-w-7 3xl:max-w-9">
            {" "}
            <CodeIcon />
          </span>
          <span className="font-michroma text-base 2xl:text-lg 3xl:text-xl text-nowrap">100% open source</span>
        </div>
      </div>
    </>
  );
}
