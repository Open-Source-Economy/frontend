import React from "react";

interface ModalHeaderProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}

export function ModalHeader(props: ModalHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-1 self-stretch">
      <div className="flex flex-col items-start gap-4 self-stretch">
        {/* Header with title and close button */}
        <div className="flex justify-center items-center gap-2.5 self-stretch">
          <div className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%]">
            {props.title}
          </div>
          <button
            onClick={props.onClose}
            className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 hover:opacity-70 transition-opacity"
          >
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4.97266L4 20.9727" stroke="white" strokeLinecap="round"/>
              <path d="M4 4.97266L20 20.9727" stroke="white" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        {/* Subtitle */}
        <div className="self-stretch text-white font-montserrat text-lg font-normal leading-[150%] opacity-60">
          {props.subtitle}
        </div>
      </div>
    </div>
  );
}
