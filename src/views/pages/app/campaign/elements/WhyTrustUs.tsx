import React from "react";
import trustUs from "src/assets/icon/trustUs.svg";
import { LinearCenter } from "src/ultils/Icons";
import { CampaignDescription } from "src/model";

interface WhyTrustUsProps {
  description: CampaignDescription.Section;
}

export function WhyTrustUs(props: WhyTrustUsProps) {
  return (
    <div className="relative pb-24 3xl:pb-32">
      <div className="absolute w-full h-full -translate-x-1/2 left-1/2 -top-1/2">
        <LinearCenter />
      </div>
      <section className="3xl:max-w-[1617px] relative z-20 !px-4 xl:max-w-[90%] 2xl:max-w-[1440px] mx-auto justify-center gap-14 flex items-center xl:flex-row flex-col 3xl:gap-24">
        <div className="max-w-[620px] 2xl:max-w-[700px] 3xl:max-w-[833px] backdrop-blur-sm w-full !bg-secondary !bg-opacity-45 rounded-full flex justify-center items-center p-10 2xl:p-16 3xl:p-20 shadow-imgShadow">
          <img src={trustUs} loading="lazy" alt="Trust Us" className="object-cover h-full w-full" />
        </div>
        <div className="max-w-[590px] 3xl:max-w-[650px] w-full">
          <h1 className="text-2xl 1400:text-[32px] w-fit 3xl:text-[40px] pb-3 lg:pb-5 relative font-semibold sm:text-nowrap">
            <span className="absolute sm:inline hidden left-0 w-[50%] bottom-0 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            Why You Can Trust Us
          </h1>

          <p className="text-base sm:text-xl font-medium 3xl:text-2xl mt-8 xl:mt-10 3xl:mt-12">{props.description.paragraph1}</p>
          <p className="text-base max-w-[550px] 3xl:max-w-[656px] sm:text-xl font-medium 3xl:text-2xl mt-6">{props.description.paragraph2}</p>
        </div>
      </section>
    </div>
  );
}
