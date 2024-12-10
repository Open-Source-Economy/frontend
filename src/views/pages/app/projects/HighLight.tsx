import React from "react";
import HighLightCard from "./HighLightCard";

interface HighlightCardData {
  title: string;
  description: string;
  tasks: string[];
  progress: number; // Current progress
  total: number; // Total required
  buttonText: string;
  isBorder: boolean;
}

const highlightData: HighlightCardData[] = [
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: false,
  },
  {
    title: "Cluster Maintenance",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: true,
  },
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
    isBorder: false,
  },
];

const Highlight = () => {
  return (
    <section className=" pt-[144px]">
      <div className="!px-4 lg:!px-0 lg:max-w-[90%] 3xl:max-w-[1440px] mx-auto flex flex-col justify-center items-center">
        {/* Title */}
        <h2 className="section-heading !pb-5 w-fit relative mb-14">
          Highlight{" "}
          <span className="absolute w-[80%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightData.map((card, index) => (
            <HighLightCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;
