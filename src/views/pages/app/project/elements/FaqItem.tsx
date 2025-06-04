import React from "react";
import AnimateHeight from "react-animate-height";
import { MinusIcon, PlusIcon } from "src/ultils/Icons";

interface FaqItemProps {
  faq: {
    title: string;
    content?: string;
  };
  canOpen: boolean;
  isOpen: boolean;
  index: number;
  onToggle: (index: number) => void;
}

export function FaqItem(props: FaqItemProps) {
  const onClick = () => {
    if (props.canOpen) props.onToggle(props.index);
    else return;
  };

  return (
    <div className={`rounded-xl overflow-hidden transition-all z-20 bg-primaryBg duration-300 ${props.isOpen ? "virtuous-card" : ""}`}>
      <button className="w-full !px-4 sm:!px-6 py-4 flex justify-between sm:items-center" onClick={onClick}>
        <span className={`${props.isOpen ? "text-primary-user" : "text-white"} text-base xl:text-lg text-left 2xl:text-[22px] 3xl:text-[25px] font-michroma`}>
          {props.faq.title}
        </span>
        {props.canOpen && <span className="duration-300 transform transition-transform">{props.isOpen ? <MinusIcon /> : <PlusIcon />}</span>}
      </button>

      <AnimateHeight duration={500} height={props.isOpen ? "auto" : 0} easing="ease-in-out">
        <div className="!px-4 sm:!px-6 pb-4 text-sm md:text-base xl:text-lg 3xl:text-xl opacity-80">{props.faq.content}</div>
      </AnimateHeight>
    </div>
  );
}
