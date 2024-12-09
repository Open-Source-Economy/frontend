import React from "react";

interface FaqItemProps {
  faq: {
    title: string;
    content: string;
  };
  isOpen: boolean;
  index: number;
  onToggle: (index: number) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, index, onToggle }) => (
  <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "service-card" : "border-[#1a2b4a] bg-transparent border"}`}>
    <button className="w-full px-6 py-4 flex justify-between items-center text-white" onClick={() => onToggle(index)}>
      <span className="text-left font-semibold">{faq.title}</span>
      <span className="text-2xl transform transition-transform">{isOpen ? "−" : "+"}</span>
    </button>

    {isOpen && <div className="px-6 pb-4 text-gray-300">{faq.content}</div>}
  </div>
);

export default FaqItem;
