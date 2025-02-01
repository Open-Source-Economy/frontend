import React from "react";
import clock from "src/assets/sand-clock.png";

interface ComingSoonProps {
  className?: string;
}
const ComingSoon = (props: ComingSoonProps) => {
  return (
    <button className="flex items-center !cursor-default gap-2 bg-gradient-to-r from-[#FF7E4B] to-[#FF518C] text-white px-[9px] sm:px-3 sm:py-[10px] py-[8px]  rounded-[50px] md:py-3 md:px-4">
      <img src={clock} className="w-5 h-5" alt="clock" />
      <h3 className={`sm:text-[12px] text-[11px] md:text-[15px] font-semibold ${props?.className}`}>coming soon</h3>
    </button>
  );
};

export default ComingSoon;
