import React from "react";

interface InfoPillProps {
  text: string;
  className?: string;
}

export function InfoPill(props: InfoPillProps) {
  return (
    <>
      <div className={`flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B] ${props.className || ""}`}>
        <span className="text-white font-montserrat text-sm font-normal leading-[150%]">{props.text}</span>
      </div>
    </>
  );
}
