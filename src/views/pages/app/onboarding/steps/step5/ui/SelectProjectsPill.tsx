import React from "react";
import { AddCircleIcon } from "../icons/AddCircleIcon";

interface SelectProjectsPillProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

export function SelectProjectsPill(props: SelectProjectsPillProps) {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] bg-[#202F45] hover:bg-[#2a3f56] transition-colors ${props.className || ""}`}
      >
        <AddCircleIcon
          className="flex w-[18px] h-[18px] p-[1.5px] flex-col justify-center items-center gap-[7.5px]"
          maskId={`mask0_${Math.random().toString(36).substr(2, 9)}`}
        />
        <span className="text-white font-montserrat text-sm font-normal leading-[150%]">
          {props.text || "Select Projects"}
        </span>
      </button>
    </>
  );
}
