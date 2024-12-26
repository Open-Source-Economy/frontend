import React, { useState } from "react";
import CompanyBanner from "./CompanyBanner";
import DonationControls from "./DonationControls";
import FeatureList from "./FeatureList";
import Progress from "./Progress";
import VideoPlayer from "./VideoContainer";

const FundingCampaign: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<"once" | "monthly">("monthly");

  const currentAmount = 1400;
  const targetAmount = 10000;
  const backers = 250;
  const daysLeft = 24;

  return (
    <section className="mt-20 !px-4">
      <div className="xl:max-w-[98%] 2xl:max-w-[87%] 3xl:max-w-[1650px] mx-auto flex justify-center xl:!flex-nowrap flex-wrap gap-10 3xl:gap-14">
        {/* Left Section */}
        <div className="max-w-[800px] w-full 3xl:max-w-[817px] xl:max-w-[770px] mx-auto xl:!mx-0">
          <h4 className="py-2.5 flex justify-center items-center rounded-full bg-primary-user text-base lg:text-lg font-montserrat xl:text-[22px] 3xl:text-[25px] max-w-[270px] 3xl:max-w-[315px] w-full">
            Funding Campaign
          </h4>
          <h2 className="section-heading !font-michroma lg:!pb-8 w-fit relative !mb-5 !mt-3">
            Improve Cluster Reliability
            <span className="absolute w-[28%] h-[6px] hidden lg:block left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>

          <VideoPlayer />

          <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl !my-5">
            Apache Pekko is an independent open-source project powered by volunteers in their free time.
          </p>
          <FeatureList />
        </div>

        {/* Right Section */}
        <div className="mx-auto xl:!mx-0 max-w-[800px] xl:max-w-[550px] 2xl:max-w-[560px] 3xl:max-w-[672px] w-full">
          <div className="!bg-secondary py-10 3xl:py-12 !px-4 sm:!px-7 2xl:!px-10 3xl:!px-16 border !border-[#324053] rounded-2xl lg:rounded-[35px] space-y-6">
            <Progress currentAmount={currentAmount} targetAmount={targetAmount} backers={backers} daysLeft={daysLeft} />
            <DonationControls
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              donationType={donationType}
              setDonationType={setDonationType}
            />
          </div>
          <CompanyBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />
        </div>
      </div>
    </section>
  );
};

export default FundingCampaign;
