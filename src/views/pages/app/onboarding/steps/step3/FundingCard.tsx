import React from "react";
import { Toggle } from "./Toggle";

interface FundingCardProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
  isRecommended?: boolean;
  hasLearnMore?: boolean;
  onLearnMore?: () => void;
}

// TODO: sam move them in a Icon folder and refactor with the one that we are currently using
export const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// TODO: sam move them in a Icon folder
export const FireIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 6.5C13.5 9.5 11 10.5 10 10.5C9 10.5 6.5 9.5 6.5 6.5C6.5 4.5 8.5 2.5 10 2.5C11.5 2.5 13.5 4.5 13.5 6.5Z" fill="currentColor" />
    <path
      d="M10 17.5C7.5 17.5 5.5 15.5 5.5 13C5.5 10.5 7 9.5 8.5 8.5C9 8.2 9.5 7.8 10 7.5C10.5 7.8 11 8.2 11.5 8.5C13 9.5 14.5 10.5 14.5 13C14.5 15.5 12.5 17.5 10 17.5Z"
      fill="currentColor"
    />
  </svg>
);

export function FundingCard(props: FundingCardProps) {
  const { title, description, isEnabled, onChange, isRecommended = false, hasLearnMore = false, onLearnMore } = props;

  return (
    <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-[30px] grow items-start justify-start min-h-px min-w-px p-[20px] relative rounded-md self-stretch shrink-0 border border-[rgba(255,255,255,0.2)]">
      {/* Toggle Section */}
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
        {isRecommended && (
          <div className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-2.5 py-0.5 relative rounded-[50px] shrink-0">
            <FireIcon />
            <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">Get Paid</p>
            </div>
          </div>
        )}
        {!isRecommended && <div />}
        <Toggle isEnabled={isEnabled} onChange={onChange} />
      </div>

      {/* Content */}
      <div className="box-border content-stretch flex flex-col gap-[9px] items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-left w-full">
        <div className="font-michroma not-italic relative shrink-0 text-[28px] w-full">
          <p className="block leading-[1.2]">{title}</p>
        </div>
        <div className="font-montserrat font-normal relative shrink-0 text-[16px] w-full">
          <p className="block leading-[normal]">{description}</p>
        </div>
        {hasLearnMore && onLearnMore && (
          <div className="font-montserrat font-normal relative shrink-0 text-[16px] w-full">
            <button onClick={onLearnMore} className="underline block leading-[normal] hover:text-[#ff7e4b] transition-colors text-left">
              Learn more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
