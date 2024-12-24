import React, { useState } from "react";
import DonationControls from "./DonationControls";
import FeatureList from "./FeatureList";
import Progress from "./Progress";
import CustomVideoEmbed from "./VideoEmbed";

const FundingCampaign: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationType, setDonationType] = useState<"once" | "monthly">("monthly");

  const currentAmount = 1400;
  const targetAmount = 10000;
  const backers = 250;
  const daysLeft = 24;

  const videoUrl = "https://youtube.com/shorts/V9UhIsUa99Y?si=IsQPJ1UX7iw4CEjJ"; // Use the path to your video file

  return (
    <section className="text-white p-6 md:p-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Left Section */}

        <div className="space-y-6">
          <h2 className="section-heading lg:!pb-8 w-fit relative">
            Improve Cluster Reliability
            <span className="absolute w-[28%] h-[6px] hidden lg:block left-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
          </h2>
          <p className="font-montserrat text-base sm:text-xl font-semibold 3xl:text-2xl !my-5">
            Apache Pekko is an independent open-source project powered by volunteers in their free time.{" "}
          </p>
          <CustomVideoEmbed videoUrl={videoUrl} autoplay={false} loop={true} muted={false} className="rounded-lg shadow-lg" />
          <FeatureList />
        </div>

        {/* Right Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-6">
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
      </div>
    </section>
  );
};

export default FundingCampaign;
