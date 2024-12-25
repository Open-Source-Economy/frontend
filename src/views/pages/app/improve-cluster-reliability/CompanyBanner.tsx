import React from "react";
import { CodeIcon, DollarSign, MascotIcon } from "src/Utils/Icons";

interface CompanyBannerProps {
  leftButtonText: string;
  rightButtonText: string;
}

const CompanyBanner: React.FC<CompanyBannerProps> = ({ leftButtonText = "Only $100/mo", rightButtonText = "for 100 Companies" }) => {
  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-between gap-8 px-8 my-8">
        <div className="flex items-center gap-2.5">
          <span className="max-w-9">
            {" "}
            <DollarSign />
          </span>
          <span className="font-michroma text-base 2xl:text-lg 3xl:text-xl text-nowrap">100% not profit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="max-w-9">
            {" "}
            <CodeIcon />
          </span>
          <span className="font-michroma text-base 2xl:text-lg 3xl:text-xl text-nowrap">100% open source</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-[url('src/assets/company-banner.webp')] bg-cover py-[22px] px-[30px] flex !gap-4 items-center justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-montserrat 3xl:text-[22px] font-bold">We are looking for</h2>
          <button className="bg-primary-user shadow-[0px_4px_4p_0px_rgba(255,255,255,0.50)_inset,_0px_4px_4px_0px_#09172A] text-white font-semibold py-3 px-6 rounded-full transition-colors">
            {leftButtonText}
          </button>
        </div>

        {/* Simplified cat face */}
        <div className="w-full max-w-[145px] h-full relative">
          <MascotIcon />
        </div>

        <div className="flex flex-col items-end gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full transition-colors">{rightButtonText}</button>
          <p className="text-xl font-semibold">Be one of them!</p>
        </div>
      </div>
    </>
  );
};

export default CompanyBanner;
