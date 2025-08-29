import React from "react";
import { VideoSection as HomeVideoSection } from "../../../home/elements/video-section";

interface VideoSectionProps {}

export function VideoSection(props: VideoSectionProps) {
  return (
    <div className="flex px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[200px] flex-col justify-center items-center gap-2.5 self-stretch">
      <HomeVideoSection />
    </div>
  );
}
