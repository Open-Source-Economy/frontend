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
  isFullWidth?: boolean;
}

export const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4L4 20" stroke="white" strokeLinecap="round" />
    <path d="M4 4L20 20" stroke="white" strokeLinecap="round" />
  </svg>
);

export const FireIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.13041 7.76852L5.12874 7.77018L5.12541 7.77268L5.11707 7.77935C5.08091 7.8068 5.04588 7.83571 5.01207 7.86601C4.92483 7.94329 4.84087 8.0242 4.7604 8.10852C4.56041 8.31935 4.30374 8.63268 4.06291 9.05185C3.57791 9.89768 3.17041 11.1585 3.39957 12.8443C3.62541 14.5085 4.32457 15.8993 5.50624 16.8693C6.68457 17.836 8.27957 18.3327 10.2087 18.3327C12.1979 18.3327 13.7862 17.5868 14.8371 16.3077C15.8787 15.0402 16.3437 13.311 16.2329 11.421C16.1262 9.60768 15.1387 8.23185 14.2662 7.01685L14.0171 6.66935C13.0654 5.32602 12.3146 4.08852 12.4971 2.35685C12.5063 2.26969 12.4971 2.18157 12.4701 2.09821C12.443 2.01484 12.3988 1.93809 12.3401 1.87294C12.2815 1.8078 12.2098 1.75571 12.1298 1.72006C12.0497 1.68441 11.963 1.666 11.8754 1.66602C11.5571 1.66602 11.1921 1.76435 10.8404 1.91268C10.4332 2.08727 10.0489 2.31117 9.69624 2.57935C8.92541 3.16102 8.15457 4.03768 7.74374 5.20935C7.33374 6.37768 7.54207 7.49102 7.84207 8.30185C8.03957 8.83435 7.82541 9.36018 7.50291 9.51352C7.36568 9.57843 7.20868 9.5878 7.06472 9.53965C6.92075 9.49151 6.80097 9.38959 6.73041 9.25518L6.05874 7.97935C6.0167 7.89931 5.9578 7.82935 5.8861 7.77428C5.8144 7.71921 5.7316 7.68036 5.64343 7.6604C5.55526 7.64043 5.4638 7.63983 5.37537 7.65864C5.28695 7.67745 5.20365 7.71522 5.13124 7.76935"
      fill="white"
    />
  </svg>
);

export const ServicesIcon = () => (
  <div className="w-[120px] h-[120px] flex items-center justify-center">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/f4c8aabeb0e04f0042222ead3264d511f9cb5d7e?width=240"
      className="w-[120px] h-[120px]"
      alt="Icon-Services"
    />
  </div>
);

export const RoyaltiesIcon = () => (
  <div className="w-[120px] h-[120px] flex items-center justify-center">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/ac39b2068b7caedeaadde23e13cdccb4d55e8d73?width=240"
      className="w-[120px] h-[120px]"
      alt="Icon-Royalties"
    />
  </div>
);

export const DonationsIcon = () => (
  <div className="w-[120px] h-[120px] flex items-center justify-center">
    <img
      src="https://api.builder.io/api/v1/image/assets/TEMP/e3ce0e015be5c0fd641819cc217b896c35f09aed?width=240"
      className="w-[120px] h-[120px]"
      alt="Icon-Donation"
    />
  </div>
);

const getIconForTitle = (title: string) => {
  switch (title.toLowerCase()) {
    case "offer services":
      return <ServicesIcon />;
    case "royalties":
      return <RoyaltiesIcon />;
    case "donations":
      return <DonationsIcon />;
    default:
      return <ServicesIcon />;
  }
};

export function FundingCard(props: FundingCardProps) {
  const { title, description, isEnabled, onChange, isRecommended = false, hasLearnMore = false, onLearnMore, isFullWidth = false } = props;

  return (
    <div
      className={`flex flex-col justify-center items-start gap-9 p-8 rounded-[30px] bg-primaryBg transition-all duration-300 hover:shadow-[0_0_16px_0_#FF7E4B] ${
        isFullWidth ? "self-stretch" : "flex-1"
      }`}
    >
      {/* Toggle and Recommended Badge */}
      <div className="flex items-center gap-6 self-stretch">
        <Toggle isEnabled={isEnabled} onChange={onChange} />
        {isRecommended && (
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-primary-developer rounded-[50px]">
            <FireIcon />
            <span className="text-white font-montserrat text-sm font-normal leading-[1.5]">Recommended</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start gap-6 self-stretch">
        {/* Icon */}
        {getIconForTitle(title)}

        {/* Text Content */}
        <div className="flex flex-col items-start gap-3 flex-1">
          <h3 className="self-stretch text-primary-developer font-michroma text-[28px] font-normal leading-[1.3]">{title}</h3>
          <p className="self-stretch text-white font-montserrat text-base font-normal leading-normal">{description}</p>
          {hasLearnMore && onLearnMore && (
            <button
              onClick={onLearnMore}
              className="self-stretch text-white font-montserrat text-base font-normal leading-normal underline hover:text-primary-developer transition-colors text-left opacity-60 hover:opacity-100"
            >
              Learn more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
