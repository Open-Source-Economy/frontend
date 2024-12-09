import React from "react";
import HighLightCard from "./HighLightCard";

interface HighlightCardData {
  title: string;
  description: string;
  tasks: string[];
  progress: number; // Current progress
  total: number; // Total required
  buttonText: string;
}

const highlightData: HighlightCardData[] = [
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
  },
  {
    title: "Cluster Maintenance",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
  },
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    tasks: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: 3.3,
    total: 10,
    buttonText: "FUND",
  },
];

const Highlight = () => {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-4xl font-bold mb-8">Highlight</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="w-10 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {highlightData.map((card, index) => (
            <HighLightCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;
