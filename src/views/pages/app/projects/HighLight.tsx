import React from "react";

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
    <section className="bg-gradient-to-r from-[#0b1120] to-[#1c2a42] py-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-4xl font-bold mb-8">Highlight</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="w-10 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {highlightData.map((card, index) => (
            <div key={index} className="bg-[#1c2a42] text-white rounded-lg p-6 shadow-lg flex flex-col">
              {/* Card Title */}
              <h3 className="text-lg font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{card.description}</p>

              {/* Task List */}
              <ul className="mb-4">
                {card.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    {/* <CheckCircleIcon className="h-5 w-5 text-pink-500 mr-2" /> */}
                    <span className="text-sm">{task}</span>
                  </li>
                ))}
              </ul>

              {/* Progress */}
              <div className="mt-auto">
                <p className="text-sm text-gray-400 mb-2">
                  {card.progress} / {card.total} DoW requested
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(card.progress / card.total) * 100}%` }}
                  ></div>
                </div>

                {/* Fund Button */}
                <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-md text-white font-bold hover:opacity-90 transition">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlight;
