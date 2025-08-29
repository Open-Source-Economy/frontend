import React from "react";
import { FeatureCard } from "./FeatureCard";

interface SpiritSectionProps {}

export function SpiritSection(props: SpiritSectionProps) {
  const focusFeatures = [
    { text: "We help you get paid for your OSS work" },
    { text: "You choose: the what, the how, and the price" },
    { text: "Work full-time, part-time, or on your schedule" },
  ];

  const handleFeatures = [
    { text: "Outreach, marketing, and sales? On us." },
    { text: "Negotiations, contracts, and sponsors? Covered." },
    { text: "Client relations, invoicing, and taxes? All handled." },
  ];

  const nonProfitFeatures = [
    { text: "Transparency on where the funds go" },
    { text: "All earnings are reinvested in open-source" },
    { text: "Supporting oss neutrality and independence" },
  ];

  return (
    <div className="flex px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[200px] flex-col items-center gap-2.5 self-stretch">
      <div className="flex flex-col items-center gap-[100px] self-stretch rounded-md">
        <div className="flex flex-col justify-center items-center gap-6 self-stretch">
          <h2 className="self-stretch text-white text-center font-michroma text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal leading-[130%]">
            The Spirit
          </h2>
          <svg className="w-[500px] h-0" width="502" height="2" viewBox="0 0 502 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H501" stroke="#FF7E4B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-8 self-stretch">
          <FeatureCard title="You Focus on OSS" features={focusFeatures} />
          <FeatureCard title="We Handle  The Rest" features={handleFeatures} />
          <FeatureCard title="100% Non-Profit" features={nonProfitFeatures} />
        </div>
      </div>
    </div>
  );
}
