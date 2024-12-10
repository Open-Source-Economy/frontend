import React, { useState } from "react";
import faqImage from "src/assets/faq.webp";
import FaqItem from "./FaqItem";
import rightLinear from "src/assets/right-linear-bg.png";
import { Button } from "src/components";
import faq from "src/assets/faq-bg.webp";
import { faqData } from "../whoBuiltIt/Helper";

const WhyNeedFunding: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="2xl:py-28 py-20 relative">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px] opacity-80 -z-10 -top-[15%]" />
      <img
        src={faq}
        alt=""
        className="absolute pointer-events-none object-cover -translate-x-1/2 left-1/2 w-full max-h-[850px] -z-10  max-w-[780px] h-full -bottom-[30%]"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  xl:gap-14 items-center !px-4 lg:max-w-[96%]  3xl:max-w-[1659px] mx-auto">
        {/* Left side - Image */}
        <div className="w-full flex justify-center items-center p-8 3xl:pl-6 3xl:pb-[72px] 3xl:pr-16 3xl:pt-7 max-w-[749px] max-h-[749px] rounded-full !bg-secondary backdrop-blur-[7.5px] shadow-[inset_5px_8px_10px_0px_rgba(255,255,255,0.08)]">
          <img src={faqImage} alt="Team illustration" className="relative z-10" />
        </div>

        {/* Right side - FAQ */}
        <div className="space-y-3 md:space-y-4 xl:space-y-6">
          <h2 className="section-heading lg:!pb-8 w-fit relative !mb-9">
            Why do we Need Funding?
            <span className="absolute w-[30%] h-[6px] hidden lg:block  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FaqItem key={index} faq={faq} isOpen={openIndex === index} index={index} onToggle={handleToggle} />
            ))}
          </div>

          <div className="relative !mt-7 lg:!mt-9 flex justify-center lg:justify-start items-center">
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
