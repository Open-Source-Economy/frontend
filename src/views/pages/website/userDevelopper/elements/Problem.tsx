import React, { ReactNode, useEffect } from "react";
import img1 from "src/assets/source.png";
import bgText from "src/assets/userbannertext.png";
import devBg from "src/assets/developer-bg.png";

interface ProblemProps {
  title: string | ReactNode;
  primarySrc: string;
  secondarySrc: string;
}

export function Problem(props: ProblemProps) {
  useEffect(() => {}, []);

  return (
    <>
      <h1 className="text-md md:text-3xl lg:text-4xl xl:text-[60px] xl:leading-[65px] text-white font-michroma relative z-10">{props.title}</h1>
      <div className=" max-w-[1740px] w-full mx-auto relative ">
        <img className="absolute -z-10 pointer-events-auto object-center h-full bottom-0 right-0" src={bgText} alt="" />
        <div className="flex items-center justify-between mx:gap-8 sm:gap-4 gap-3 max-w-[1290px] w-full mx-auto relative pt-14">
          <div className="flex items-center justify-center w-full lg:p-[15px] mx:p-2 p-1 xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma rounded-[10px] bg-[#FF7E4B] mx:max-w-[319px] relative z-10">
            No availability <br className="mx:block hidden" /> for community
          </div>
          <img className="absolute z-0 w-full h-[200%] -top-[30%] object-center" src={devBg} alt="" />
          <img
            src={img1}
            alt=""
            className="lg:max-w-[390px] md:max-w-[300px] mx:max-w-[220px] sm:max-w-[150px] max-w-[120px] w-full xl:min-h-[550px] mx:min-h-[400px] sm:min-h-[310px] min-h-[250px] h-full object-center z-10 relative"
          />
          <div className="mx:max-w-[319px] w-full lg:space-y-[194px] mx:space-y-32 space-y-20  h-full relative z-10">
            <div className="flex items-center justify-center w-full lg:p-[15px] mx:p-2 p-1 xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma rounded-[10px] bg-[#FF7E4B] ">
              Others profiting <br className="mx:block hidden" /> off your work
            </div>
            <div className="flex items-center justify-center w-full lg:p-[15px] mx:p-2 p-1 xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma rounded-[10px] bg-[#FF7E4B]">
              Project struggling <br className="mx:block hidden" /> to survive
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
