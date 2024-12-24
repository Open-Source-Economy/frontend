import React from "react";

interface CustomVideoEmbedProps {
  videoUrl: string; // URL of the local or hosted video file
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

const CustomVideoEmbed: React.FC<CustomVideoEmbedProps> = ({ videoUrl, autoplay = false, loop = false, muted = false, className = "" }) => {
  return (
    <div className={`relative w-full h-0 pb-[56.25%] overflow-hidden ${className}`}>
      <video className="absolute top-0 left-0 w-full h-full rounded-lg" src={videoUrl} autoPlay={autoplay} loop={loop} muted={muted} preload="auto" />
    </div>
  );
};

export default CustomVideoEmbed;
