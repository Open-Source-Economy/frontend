import React from "react";
import loader from "src/assets/loader.png";
import whoBuiltHero from "src/assets/Rectangle.png";
import { MascotIcon } from "src/Utils/Icons";

interface LoadingProps {
  message?: string;
  className?: string;
  textSize?: string;
  type?: "page" | "component";
  height?: string;
  width?: string;
}

const Loading: React.FC<LoadingProps> = ({ message, className = "", textSize = "", type = "page", height = "auto", width = "auto" }) => {
  return type === "page" ? (
    // Page Loading Layout
    <div className="max-w-[800px] w-full flex relative p-3 h-full max-h-[793px] flex-col justify-center items-center">
      <img src={whoBuiltHero} className="absolute opacity-30 pointer-events-none z-0 object-cover w-full sm:block hidden h-full" alt="Background" />
      <div className="flex justify-center items-center z-10 500:p-4 flex-col">
        <MascotIcon className="max-w-20 sm:max-w-28 lg:max-w-36" />
        <img src={loader} alt="Loading" className="-mt-[8%] sm:-mt-[10%] w-[80%] 400:w-[70%] max-w-[550px] lg:w-full md:-mt-[14%]" />
      </div>

      {message && <h4 className={`${textSize} text-lg sm:text-xl md:text-2xl mt-[7%] xl:mt-[9%] text-center z-10 font-michroma`}>{message}</h4>}
    </div>
  ) : (
    // Component Loading Layout
    <div className="w-full flex justify-center">
      <div className={`${className} relative flex flex-col items-center justify-center`} style={{ height, width }}>
        <img src={whoBuiltHero} className="absolute opacity-30 pointer-events-none -z-0 object-cover w-full h-full" alt="Background" />
        <div className="p-4 flex flex-col justify-center items-center relative z-10">
          <MascotIcon className="max-w-16 w-full sm:max-w-20" />
          <img src={loader} alt="Loading" className="-mt-4" />
        </div>
        {message && <h4 className={`${textSize} text-base text-center relative z-10 font-michroma mt-2`}>{message}</h4>}
      </div>
    </div>
  );
};

export default Loading;
