import React from "react";

interface FeatureItem {
  text: string;
}

interface FeatureCardProps {
  title: string;
  features: FeatureItem[];
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <div className="flex px-6 sm:px-8 py-6 sm:py-9 flex-col items-start gap-6 sm:gap-8 flex-1 self-stretch rounded-[20px] sm:rounded-[30px] bg-primaryBg">
      <h3 className="self-stretch text-primary-developer font-michroma text-xl sm:text-2xl lg:text-[28px] font-normal leading-[130%]">{props.title}</h3>
      <div className="flex flex-col items-start gap-3 sm:gap-4 self-stretch">
        {props.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 self-stretch">
            <svg className="w-6 h-6 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="flex-1 text-white font-montserrat text-sm sm:text-base lg:text-lg font-normal leading-[130%]">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
