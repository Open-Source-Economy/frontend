import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  className?: string;
}

export function ModalHeader(props: ModalHeaderProps) {
  return (
    <>
      <div className={`flex flex-col items-center gap-4 mb-8 ${props.className || ""}`}>
        <div className="flex justify-center items-center gap-2.5 self-stretch">
          <h2 className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%]">
            {props.title}
          </h2>
          <button
            onClick={props.onClose}
            className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-[#FF7E4B] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        {props.subtitle && (
          <p className="self-stretch text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
            {props.subtitle}
          </p>
        )}
      </div>
    </>
  );
}
