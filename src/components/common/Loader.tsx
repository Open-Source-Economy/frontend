import React from "react";
import loader from "src/assets/loader.png";
import { MascotIcon } from "src/Utils/Icons";
import whoBuiltHero from "src/assets/Rectangle.png";

interface LoaderProps {
  isFullScreen?: boolean; // Full-screen or smaller loader
  message?: string; // Custom loading message
  showBackgroundImage?: boolean; // Whether to show the background image
}

const Loader: React.FC<LoaderProps> = ({ isFullScreen = true, message = "Loading..." }) => {
  return (
    <div
      className={`flex flex-col overflow-hidden relative items-center justify-center ${isFullScreen ? "h-screen" : "h-auto"} ${
        isFullScreen ? "!bg-secondary" : ""
      } relative`}
    >
      {isFullScreen && (
        <div className="bg-gradient-to-r from-[#66319B] to-[#FF518C] -right-[30%] bottom-0 absolute max-w-[50%]  w-full rounded-full  max-h-[60%] h-full opacity-25 blur-3xl"></div>
      )}
      {isFullScreen && (
        <div className="bg-gradient-to-r  from-[#FF518C] to-[#66319B] -bottom-[30%]  -left-[30%] absolute max-w-[50%]  w-full rounded-full  max-h-[60%] h-full opacity-25 blur-3xl"></div>
      )}
      {isFullScreen && (
        <img
          src={whoBuiltHero}
          className="absolute top-1/2 left-1/2 z-0 opacity-30 pointer -translate-x-1/2 select-none -translate-y-1/2 max-w-[800px] w-full max-h-[70%] lg:max-h-[700px] h-full"
          alt=""
        />
      )}

      {/* Character Icon */}

      <div className={`${isFullScreen ? "max-w-[100px] sm:max-w-[145px]" : "max-w-[50px]"} relative z-20 w-full rounded-full flex items-center justify-center`}>
        <MascotIcon />
      </div>

      {/* Loader Animation */}
      <img
        src={loader}
        alt="Loading"
        className={` ${isFullScreen ? "max-w-[80%] lg:max-w-[500px] -mt-20" : "-mt-16 max-w-[90px]"}  z-20 object-cover w-full relative mx-auto`}
      />

      {/* Loading Message */}
      {message && <h4 className={`${isFullScreen ? "text-xl md:text-2xl lg:text-3xl mt-20 " : "text-sm"} relative z-20 font-michroma mt-4`}>{message}</h4>}
    </div>
  );
};

export default Loader;
