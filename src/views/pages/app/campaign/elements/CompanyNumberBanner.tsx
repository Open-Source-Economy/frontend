import React from "react";
import { MascotIcon } from "../../../../../ultils/Icons";

interface CompanyNumberBannerProps {
  leftButtonText: string;
  rightButtonText: string;
}

export function CompanyNumberBanner(props: CompanyNumberBannerProps) {
  return (
    <section>
      <div className="relative rounded-2xl xl:rounded-[25px] bg-no-repeat bg-[url('src/assets/company-banner.webp')] 3xl:!max-w-[1560px] max-w-[800px] mx-auto bg-center bg-cover py-[22px] !px-4 3xl:px-[30px] flex !gap-3 3xl:!gap-4 500:flex-row flex-col overflow-hidden xl:bg-full items-center justify-center">
        <div className="flex flex-col items-center gap-1.5 3xl:gap-2.5">
          <h2 className="text-base 1600:text-lg text-nowrap 3xl:text-[22px] font-bold">We are looking for</h2>
          <button className="bg-primary-user text-nowrap w-full shadow-[0px_4px_4px_0px_rgba(255,255,255,0.50)_inset,_0px_4px_4px_0px_#09172A] font-semibold py-2 md:py-3 px-6 rounded-[12px] 3xl:text-[22px] 3xl:font-bold">
            {props.leftButtonText}
          </button>
        </div>

        {/* Simplified cat face */}
        <div className="w-full max-w-[110px] 2xl:max-w-[130px] 3xl:max-w-[145px] h-full relative">
          <MascotIcon />
        </div>

        <div className="flex flex-col items-center !gap-2.5">
          <button className="bg-primary-user text-nowrap w-full shadow-[0px_4px_4px_0px_rgba(255,255,255,0.50)_inset,_0px_4px_4px_0px_#09172A] font-semibold py-2 md:py-3 px-6 rounded-[12px] 3xl:text-[22px] 3xl:font-bold">
            {props.rightButtonText}
          </button>
          <p className="text-base 1600:text-lg text-nowrap 3xl:text-[22px] font-bold">Be one of them!</p>
        </div>
      </div>
    </section>
  );
}
