import React, { useState } from "react";

interface VideoPlayerProps {}

export function VideoPlayer(props: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-2xl md:rounded-[35px] overflow-hidden h-[260px] 500:h-[300px] md:h-[350px] lg:h-[396px] 3xl:h-[460px] max-w-[817px] border border-white">
      <iframe
        src="https://www.youtube.com/embed/NgYE75gkzkM"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default VideoPlayer;
