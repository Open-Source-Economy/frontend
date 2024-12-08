import React, { useState } from "react";

interface FaqItem {
  title: string;
  content: string;
}

const faqData: FaqItem[] = [
  {
    title: "Open Source should stay Open Source",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Develop new feature",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Guaranty reliability",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Maintaining a complex project",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

interface FaqItemProps {
  faq: FaqItem;
  isOpen: boolean;
  index: number;
  onToggle: (index: number) => void;
}

const FaqItemComponent: React.FC<FaqItemProps> = ({ faq, isOpen, index, onToggle }) => (
  <div
    className={`rounded-xl overflow-hidden border transition-all duration-300 ${isOpen ? "border-gradient bg-[#1a2b4a]" : "border-[#1a2b4a] bg-transparent"}`}
  >
    <button className="w-full px-6 py-4 flex justify-between items-center text-white" onClick={() => onToggle(index)}>
      <span className="text-left font-semibold">{faq.title}</span>
      <span className="text-2xl transform transition-transform">{isOpen ? "−" : "+"}</span>
    </button>

    {isOpen && <div className="px-6 pb-4 text-gray-300">{faq.content}</div>}
  </div>
);

const WhyNeedFunding: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number): void => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1B39] to-[#1F0E3D] p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Image */}
        <div className="relative">
          <div className="w-full h-[400px] rounded-full bg-[#1a2b4a] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
          <img src="/api/placeholder/500/500" alt="Team illustration" className="relative z-10" />
        </div>

        {/* Right side - FAQ */}
        <div className="space-y-6">
          <h2 className="text-3xl text-white font-bold mb-8">
            Why do we Need Funding?
            <div className="h-1 w-32 bg-gradient-to-r from-[#FF7E4B] to-[#FF518C] mt-2" />
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FaqItemComponent key={index} faq={faq} isOpen={openIndex === index} index={index} onToggle={handleToggle} />
            ))}
          </div>

          <button
            type="button"
            className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#FF7E4B] to-[#FF518C] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Donate
          </button>
        </div>
      </div>
      {/* 
      <style jsx>{`
        .border-gradient {
          background: linear-gradient(to right, #ffffff14, #66666636);
          background-clip: padding-box;
          border: 1px solid transparent;
        }
      `}</style> */}
    </div>
  );
};

export default WhyNeedFunding;
