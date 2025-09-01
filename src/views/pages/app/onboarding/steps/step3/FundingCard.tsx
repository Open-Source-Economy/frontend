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
  <div className="w-[120px] h-[120px] relative">
    {/* Main gear shape with correct path */}
    <svg
      className="w-[104px] h-[111px] absolute left-4 top-0 drop-shadow-[1.743px_0_2.615px_rgba(0,0,0,0.20)]"
      width="111"
      height="117"
      viewBox="0 0 111 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_620_58477)">
        <path
          d="M52.042 72.9492C56.2728 72.9491 70.997 70.2948 73.4863 71.1201C75.9756 71.9455 76.8056 77.2183 71.8271 79.6943C68.5789 81.3097 61.2877 82.4393 56.4578 83.5471C55.6133 83.7408 55.6524 84.6996 56.5141 84.7895C61.2742 85.286 68.4141 84.8976 72.7188 83.292C79.3571 80.816 91.8036 73.5713 96.7822 73.5713C101.761 73.5713 106.74 73.5718 105.91 78.5234C105.08 83.4753 81.017 97.5052 72.7188 99.1562C64.4209 100.807 43.6757 101.633 37.8672 101.633C32.0587 101.633 25.4204 111.537 21.2715 113.188C17.122 114.838 -5.2814 111.536 3.8457 95.0303C8.27123 88.1526 17.974 74.8918 24.6123 73.5713C35.9447 71.317 43.4985 72.9491 52.042 72.9492ZM69.1133 2.80078C69.4613 2.79987 69.7989 2.92262 70.0654 3.14648C70.3318 3.37036 70.5102 3.6815 70.5693 4.02441L71.5763 11.2396C71.6197 11.5503 71.8274 11.8121 72.1154 11.9363C73.597 12.5753 74.9113 13.387 76.1737 14.3051C76.4201 14.4843 76.741 14.5273 77.0237 14.4138L83.8203 11.6836C84.4609 11.4215 85.2471 11.6838 85.5967 12.3242L91.4219 22.4014C91.7713 23.0421 91.6256 23.8288 91.0723 24.2656L85.3173 28.711C85.075 28.8982 84.9494 29.1987 84.9821 29.503C85.0699 30.3216 85.1309 31.1232 85.1309 31.9248C85.1309 32.7178 85.0712 33.4911 84.9849 34.2609C84.9509 34.5646 85.0737 34.8655 85.3139 35.0545L91.0723 39.584C91.6256 40.0208 91.7714 40.8075 91.4219 41.4482L85.5967 51.5244C85.2472 52.1651 84.461 52.398 83.8203 52.165L77.0314 49.4114C76.7446 49.2951 76.4183 49.3405 76.1695 49.5247C74.9057 50.4598 73.5897 51.2556 72.1059 51.9112C71.8229 52.0362 71.6202 52.2957 71.5774 52.6021L70.5693 59.8252C70.4527 60.524 69.8412 61.0478 69.1133 61.0479H57.4639C56.7359 61.0479 56.1245 60.524 56.0078 59.8252L54.9999 52.6099C54.9565 52.2993 54.7488 52.0375 54.4609 51.9133C52.9808 51.2747 51.6676 50.462 50.4064 49.5251C50.158 49.3405 49.8316 49.2951 49.5447 49.4115L42.7568 52.165C42.1161 52.398 41.329 52.1651 40.9795 51.5244L35.1553 41.4482C34.7767 40.8075 34.9515 40.0208 35.5049 39.584L41.2623 35.0545C41.5025 34.8655 41.6253 34.5647 41.5913 34.2609C41.5053 33.4912 41.4463 32.7178 41.4463 31.9248C41.4463 31.1232 41.5066 30.3215 41.5942 29.503C41.6268 29.1986 41.5012 28.8982 41.259 28.711L35.5049 24.2656C34.9516 23.8288 34.7767 23.0421 35.1553 22.4014L40.9795 12.3242C41.329 11.6836 42.1161 11.4215 42.7568 11.6836L49.5524 14.4137C49.8352 14.5273 50.1561 14.4843 50.4025 14.3051C51.6649 13.3871 52.9793 12.5753 54.4609 11.9363C54.7488 11.8121 54.9565 11.5503 54.9999 11.2397L56.0078 4.02441C56.1243 3.32546 56.7358 2.80078 57.4639 2.80078H69.1133Z"
          fill="#FF7E4B"
        />
      </g>
      <defs>
        <filter id="filter0_d_620_58477" x="0.807978" y="0.185653" width="109.553" height="115.998" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1.74342"/>
          <feGaussianBlur stdDeviation="1.30756"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_620_58477"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_620_58477" result="shape"/>
        </filter>
      </defs>
    </svg>
    
    {/* Overlay effects */}
    <div
      className="w-[104px] h-[111px] absolute left-0 top-2 opacity-60 backdrop-blur-[2.4px]"
      style={{
        background:
          "radial-gradient(71.92% 185.75% at 0% 106.32%, #FFF 0%, rgba(255, 255, 255, 0.89) 7%, rgba(255, 255, 255, 0.63) 27%, rgba(255, 255, 255, 0.40) 46%, rgba(255, 255, 255, 0.23) 63%, rgba(255, 255, 255, 0.10) 78%, rgba(255, 255, 255, 0.03) 100%)",
      }}
    />
    
    {/* Star/sparkle effect */}
    <svg
      className="w-[37px] h-[37px] absolute left-[30px] top-[2px] opacity-80"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.8"
        d="M18.6822 21.0776L32.1733 37.5187L20.951 19.443L37.3996 5.94694L19.317 17.1599L5.82589 0.71875L17.0347 18.808L0.599609 32.3041L18.6822 21.0776Z"
        fill="url(#paint0_radial_620_58483)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_620_58483"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18.9468 19.6278) rotate(54.2) scale(22.6256 22.623)"
        >
          <stop stopColor="white" />
          <stop offset="0.09" stopColor="white" stopOpacity="0.84" />
          <stop offset="0.23" stopColor="white" stopOpacity="0.62" />
          <stop offset="0.36" stopColor="white" stopOpacity="0.43" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.28" />
          <stop offset="0.63" stopColor="white" stopOpacity="0.15" />
          <stop offset="0.76" stopColor="white" stopOpacity="0.07" />
          <stop offset="0.89" stopColor="white" stopOpacity="0.02" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
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

  const shouldShowGlow = !isEnabled && title.toLowerCase() === "offer services";

  return (
    <div
      className={`flex flex-col justify-center items-start gap-9 p-8 rounded-[30px] bg-primaryBg transition-all duration-300 hover:shadow-[0_0_16px_0_#FF7E4B] ${
        shouldShowGlow ? "shadow-[0_0_16px_0_#FF7E4B]" : ""
      } ${isFullWidth ? "self-stretch" : "flex-1"}`}
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
          <h3 className="self-stretch text-primary-developer font-michroma text-[28px] font-normal leading-[1.3]">
            {title}
          </h3>
          <p className="self-stretch text-white font-montserrat text-base font-normal leading-normal">
            {description}
          </p>
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
