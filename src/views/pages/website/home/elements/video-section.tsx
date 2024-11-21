import React, { useState } from "react";
import backdropSVG from "src/assets/backdrop.svg";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true); // Set the state to indicate video is playing
  };

  return (
    <div data-aos="fade-right" className="relative sm:px-6 flex w-full items-center justify-center py-[30px] max-[540px]:pb-0 lg:py-[80px]">
      <div className="box-33-333 relative z-[100]  flex w-full items-center justify-center rounded-[20px] lg:mx-0 lg:rounded-[50px] ">
        <div className="relative inset-0 lg:w-[1010px] 1600:w-11/12  1600:h-[690px] h-[500px] max-[1024px]:h-max z-[10] aspect-video  flex  w-[96%] max-[540px]:w-[91%] max-[540px]:rounded-[20px] items-center justify-center overflow-hidden  bg-[#14233A]  p-7 rounded-[50px]">
          <iframe
            className="aspect-video object-cover   z-30 absolute top-0 left-0 w-full h-full "
            src="https://www.youtube.com/embed/PbtRZ-ML9DI?autoplay=1&si=pRmtC6n-G08zDJsD"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/*{!isPlaying && (*/}
          {/*  <>*/}
          {/*    <img*/}
          {/*      src={thubmnail}*/}
          {/*      className="rounded-[30px] max-[540px]:rounded-[20px] absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 h-[90%] w-[94%] object-cover aspect-video"*/}
          {/*      alt="Video Thumbnail"*/}
          {/*    />*/}
          {/*    <img*/}
          {/*      src={svgPlay}*/}
          {/*      onClick={handlePlayClick}*/}
          {/*      alt="Play Icon"*/}
          {/*      className="absolute z-[30] size-[50px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[96px] cursor-pointer duration-300 lg:size-[96px]"*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
          {/*{isPlaying && (*/}
          {/*  <iframe*/}
          {/*    className="aspect-video object-cover   z-30 absolute top-0 left-0 w-full h-full "*/}
          {/*    src="https://www.youtube.com/embed/PbtRZ-ML9DI?autoplay=1&si=pRmtC6n-G08zDJsD"*/}
          {/*    title="YouTube video player"*/}
          {/*    frameBorder="0"*/}
          {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
          {/*    referrerPolicy="strict-origin-when-cross-origin"*/}
          {/*    allowFullScreen*/}
          {/*  ></iframe>*/}
          {/*)}*/}
        </div>
        <img src={backdropSVG} className="pointer-events-none  absolute right-[-270px] top-[-170px] z-0" alt="" />
        <img src={backdropSVG} className="pointer-events-none absolute bottom-[-210px] left-[-280px] z-0" alt="" />
      </div>
    </div>
  );
};
