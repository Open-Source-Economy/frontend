import React from "react";
import AnimateHeight from "react-animate-height";
import { MinusIcon, PlusIcon } from "src/Utils/Icons";

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
  <div className={`rounded-xl overflow-hidden transition-all z-20 bg-primaryBg duration-300 ${isOpen ? "virtuous-card" : ""}`}>
    <button className="w-full !px-4 sm:!px-6 py-4 flex justify-between sm:items-center" onClick={() => onToggle(index)}>
      <span className={`${isOpen ? "text-primary-user" : "text-white"} text-base xl:text-lg text-left 2xl:text-[22px] 3xl:text-[25px] font-michroma`}>
        {faq.title}
      </span>
      <span className="duration-300 transform transition-transform">{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
    </button>

    <AnimateHeight duration={500} height={isOpen ? "auto" : 0} easing="ease-in-out">
      {" "}
      <div className="!px-4 sm:!px-6 pb-4 text-sm md:text-base xl:text-lg 3xl:text-xl opacity-80">{faq.content}</div>
    </AnimateHeight>
  </div>
);

export default FaqItem;
