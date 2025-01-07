import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "src/Utils/Icons";
import React from "react";

// Define the feature type
interface Feature {
  icon: React.ReactNode;
  heading: string;
  text: string;
}

// Dummy data with type annotations
const features: Feature[] = [
  {
    icon: <AimIcon />,
    heading: "Our Aim",
    text: "From benevolence to professionalism.",
  },
  {
    icon: <WinIcon />,
    heading: "Win-Win",
    text: "Support us; prioritize your needs.",
  },
  {
    icon: <PromiseIcon />,
    heading: "Our Promise",
    text: "Reliable. Bug-free. Built to serve you.",
  },
  {
    icon: <OurMissionIcon />,
    heading: "Our Mission",
    text: "100% non-profit. 100% for you.",
  },
];

// Component with TypeScript annotations
interface FeatureListProps {
  donationType: "once" | "monthly";
}

const FeatureList: React.FC<FeatureListProps> = ({ donationType }) => {
  if (donationType === "monthly") {
    return (
      <div className="!space-y-3 relative z-20 3xl:!space-y-[19px]">
        {features.map(({ icon, heading, text }, index) => (
          <div key={index} className="flex items-start sm:items-center gap-4 px-6 !py-3 3xl:!py-4 cursor-pointer rounded-2xl 3xl:rounded-[35px] !bg-primaryBg">
            <div className="w-16 h-16 min-h-16 min-w-16 2xl:w-[90px] sm:w-20 sm:h-[90px] 3xl:w-[112px] 2xl:h-24 3xl:h-[112px] object-cover">{icon}</div>
            <div>
              <h2 className="font-montserrat text-lg sm:text-xl font-semibold  3xl:text-2xl">{heading}</h2>
              <span className="h-1 my-2 2xl:my-2.5 block bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] max-w-[95px]"></span>
              <p className="text-sm sm:text-base xl:text-lg 3xl:text-xl font-montserrat !leading-[130%]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 500:grid-cols-2 place-items-center gap-x-3 gap-y-3 xl:!gap-y-6 xl:!gap-x-4 relative z-20">
      {features.map(({ icon, heading, text }, index) => (
        <div
          key={index}
          className="flex flex-col sm:max-w-[400px] w-full items-center text-center !px-5 pb-12 pt-8 xl:pt-[53px] 3xl:!px-14 xl:pb-20 1400:pb-[84px] cursor-pointer rounded-2xl 3xl:rounded-[35px] bg-primaryBg"
        >
          <div className="w-20 h-20 min-h-20 min-w-20 sm:w-24 xl:w-[112px] xl:h-[112px] 3xl:w-[125px] sm:h-24 3xl:h-[125px] object-cover !mb-4 2xl:!mb-6 3xl:!mb-[30px]">
            {icon}
          </div>
          <div className="max-w-[200px] xl:max-w-[210px] 3xl:max-w-[287px] mx-auto text-center">
            <h2 className="font-montserrat text-xl font-semibold xl:text-2xl 2xl:text-[26px] 3xl:text-3xl">{heading}</h2>
            <span className="h-1 my-2.5 2xl:my-4 3xl:my-[18px] block bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] max-w-[95px] mx-auto"></span>
            <p className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl font-montserrat !leading-[130%]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
