import React, { ReactNode, useEffect } from "react";

interface ProblemProps {
  title: string | ReactNode;
  subtittle1: string | ReactNode;
  subtittle2: string | ReactNode;
  subtittle3: string | ReactNode;
  bgTextImg: string;
  mainBg: string;
  cartoonImg: string;
  primarySrc: string;
  secondarySrc: string;
}

export function UserCondition(props: ProblemProps) {
  useEffect(() => {}, []);

  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[54px] xl:leading-[138.889%] text-white font-michroma relative z-10">{props.title}</h1>
      <div className="max-w-[1740px] w-full mx-auto relative ">
        <img className="absolute -z-10 pointer-events-auto object-center h-full bottom-0 right-0" src={props.bgTextImg} alt="bgText" />
        <div className="flex items-center justify-between mx:gap-8 sm:gap-4 gap-3 max-w-[1290px] w-full mx-auto relative pt-14">
          <div className="mx:max-w-[319px] w-full lg:space-y-[194px] mx:space-y-32 space-y-20 h-full relative z-10">
            <div className="flex items-center justify-center w-full  xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma ">
              {props.subtittle2}
            </div>
            <div className="flex items-center justify-center w-full  xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma">
              {props.subtittle3}
            </div>
          </div>
          <img className="absolute -z-10 w-full h-[200%] -top-[30%] object-center" src={props.mainBg} alt="mainBg" />
          <img
            src={props.cartoonImg}
            alt="cartoonImg"
            className="lg:max-w-[390px] md:max-w-[300px] mx:max-w-[220px] sm:max-w-[150px] max-w-[120px] w-full xl:min-h-[550px] mx:min-h-[400px] sm:min-h-[310px] min-h-[250px] h-full object-center z-10 relative"
          />
          <div className="flex items-center justify-center w-full  xl:text-[23px] xl:text-lg lg:text-base mx:text-sm text-xs font-michroma mx:max-w-[319px] relative z-10">
            {props.subtittle1}
          </div>
        </div>
      </div>
    </>
  );
}
