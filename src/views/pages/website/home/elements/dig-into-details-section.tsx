import React, { useState } from "react";
import svgPlay from "src/assets/svg-4.svg";
import thumbnail1 from "src/assets/video1.jpeg";
import thumbnail2 from "src/assets/video2.jpg";
import thumbnail3 from "src/assets/video3.jpg";
import backdropSVG from "src/assets/backdrop.svg";

const videoData = [
  {
    id: 1,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 1",
    delay: "100",
    thumbnail: thumbnail1,
  },
  {
    id: 2,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 2",
    delay: "300",
    thumbnail: thumbnail2,
  },
  {
    id: 3,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 3",
    delay: "600",
    thumbnail: thumbnail3,
  },
];

export const DigIntoDetails = () => {
  return (
    <div className="relative sm:px-8 px-[0px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px]">
      <div className="dig-into-details relative flex w-full flex-col items-center justify-center gap-[80px] lg:gap-[130px]">
        <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="" />
        <h1 className="text-center font-mich text-[28px] font-[400] lg:text-[42px]">Dig into the details</h1>
        <div className="dig-grid z-[10] grid w-full px-[20px] lg:grid-cols-3  lg:px-0">
          {/* 1  */}
          {videoData?.map(video => <VideoCom key={video.id} delay={video.delay} thumbnail={video.thumbnail} source={video.src} id={video.id} />)}
        </div>
      </div>
    </div>
  );
};

const VideoCom = ({ source, id, delay, thumbnail }: { source: string; id: number; delay: string; thumbnail: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    // Function to handle play button click
    setIsPlaying(true); // Set the state to indicate video is playing
    const video = document.getElementById("myVideo"); // Get the video element by its ID
    if (video) {
      // @ts-ignore
      video.play();
    }
  };

  return (
    <div data-aos="fade-right" data-aos-delay={delay} className="rounded-[30px] bg-[#14233A] px-[16px] py-[20px] lg:rounded-[50px] lg:px-[28px] lg:py-[25px]">
      <div className="flex lg:h-[200px] sm:h-[450px] h-[250px] relative w-full cursor-pointer items-center justify-center overflow-hidden rounded-[30px] bg-[#2C35431A]">
        {/* {!isPlaying && (
          <img onClick={handlePlayClick} src={svgPlay} alt="" className="absolute z-[10] aspect-square size-full w-full  duration-300 hover:opacity-55" />
        )} */}
        {!isPlaying && (
          <img
            // onClick={handlePlayClick}
            src={svgPlay}
            alt=""
            className="absolute z-[10] aspect-square size-[40px] w-full max-w-[40px] duration-300 hover:opacity-55"
          />
        )}
        {!isPlaying && <img src={thumbnail} className="absolute top-0 left-0 sm:object-cover w-full h-full" />}
      </div>
      <div className="dig-grid-content w-full text-center">
        <h1 className="text-center text-[21px] font-[400] font-mich">New video youtube</h1>
        <button className="gradient-text-btn dig-grid-content-btn font-mich text-center text-[16px] font-[400]">READ MORE</button>
      </div>
    </div>
  );
};
