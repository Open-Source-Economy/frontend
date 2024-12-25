import React, { useState } from "react";
import faqImage from "src/assets/faq.webp";
import FaqItem from "./FaqItem";
import rightLinear from "src/assets/right-linear-bg.png";
import { Button } from "src/components";
import faq from "src/assets/faq-bg.webp";
import { faqData } from "../../whoBuiltIt/elements/Helper";

const WhyNeedFunding: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="2xl:pt-28 pt-10 md:pt-20 pb-10 md:pb-16 relative">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px] opacity-80 -z-10 -top-[15%]" />
      <img
        src={faq}
        alt=""
        className="absolute pointer-events-none object-cover -translate-x-1/2 left-1/2 w-full max-h-[850px] -z-10  max-w-[780px] h-full -bottom-[30%]"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 place-items-center !px-4 xl:!px-0 xl:max-w-[90%] 2xl:max-w-[84%] 3xl:max-w-[1650px] mx-auto">
        {/* Left side - Image */}
        <div className="w-full flex justify-center relative items-center p-8 3xl:pl-6 3xl:pb-[72px] 3xl:pr-16 3xl:pt-7 min-h-[300px] max-w-[749px] max-h-[749px] rounded-full !bg-secondary backdrop-blur-md shadow-[inset_5px_8px_10px_0px_rgba(255,255,255,0.08)]">
          <div className="absolute bg-[#9D3C95] w-full h-full max-h-[500px] max-w-[500px] rounded-full opacity-50 blur-[166px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>
          <img src={faqImage} alt="Team illustration" className="relative z-10" loading="lazy" />
        </div>

        {/* Right side - FAQ */}
        <div className="w-full max-w-[685px] 3xl:max-w-[858px]">
          <h2 className="section-heading text-center lg:!text-left xl:!pb-8 lg:w-fit relative !mb-9">
            Why do we Need Funding?
            <span className="absolute w-[34%] h-[6px] hidden xl:block bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>

          <div className="space-y-4 w-full">
            {faqData.map((faq, index) => (
              <FaqItem key={index} faq={faq} isOpen={openIndex === index} index={index} onToggle={handleToggle} />
            ))}
          </div>

          <div className="relative !mt-7 lg:!mt-9 flex justify-center w-full lg:justify-start items-center">
            <Button audience="ALL" className="cursor-pointer" level="PRIMARY" size="LARGE" asChild>
              <span> Donate</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyNeedFunding;
