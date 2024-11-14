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

export function Problem(props: ProblemProps) {
  useEffect(() => {}, []);

  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-[43px] 3xl:text-[54px] xl:leading-[138.889%] text-white font-michroma font-normal relative z-10 3xl:w-full w-fit">
        {props.title}
      </h1>
      <div className="max-w-[1740px] w-full mx-auto relative ">
        <div className="w-full absolute z-[-10] pointer-events-none flex justify-between mt-16">
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma max-w-[653px] w-full ">
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs max-w-[471px] w-full  mx-auto">Financial Struggle</p>
            <p className="3xl:text-[28px] lg:text-xl md:text-lg sm:text-base text-sm 3xl:mt-[140px] mx:mt-24 mt-20 text-start max-w-[471px] mx-auto">
              Lack of resources
            </p>
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs 3xl:mt-[130px] mx:mt-36 sm:mt-16 mt-10 mb-[57px] xl:max-w-[471px]  xl:text-center text-start w-full mx-auto">
              Non-stop complaints from all
            </p>
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs md:mt-36 sm:mt-24 mt-16 max-w-[639px] text-start mx:ml-24 xs:ml-6 w-full  ">
              Burnout/Overwhelmed
            </p>
          </div>
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma w-full max-w-[636px] ">
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs text-center max-w-[540px] w-full mx:ml-24 xs:ml-16">
              Day job to pay the bills
            </p>
            <p className="3xl:text-[31px] md:text-xl sm:text-lg xs:text-base text-sm mb-[60px] lg:mt-[200px] sm:mt-36 mt-20 xl:max-w-[391px] xl:text-center text-end w-full mx-auto">
              Coding for free
            </p>
            <p className="3xl:text-[31px]  md:text-xl sm:text-lg xs:text-base text-sm xl:mt-[220px] mx:mt-20 mt-10 xl:text-start text-end xl:max-w-[471px] w-full ">
              No say in governance
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mx:gap-8 sm:gap-4 gap-3 3xl:max-w-[1290px] max-w-[980px] w-full mx-auto relative 3xl:pt-14 pt-20">
          <div className="flex items-center justify-center 2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma mx:max-w-[319px] 3xl:min-w-[319px] relative z-10 bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit">
            {props.subtittle1}
          </div>
          <img className="absolute -z-10 w-full h-[200%] -top-[30%] object-center" src={props.mainBg} alt="mainBg" />
          <img
            src={props.cartoonImg}
            alt="cartoonImg"
            className="3xl:max-w-[390px] 2xl:max-w-[320px] md:max-w-[300px] mx:max-w-[220px] sm:max-w-[150px] xs:max-w-[120px] max-w-[100px] w-full 3xl:min-h-[550px] mx:min-h-[400px] sm:min-h-[310px]  xs:min-h-[200px] min-h-[180px] h-full object-center z-10 relative"
          />

          <div className="mx:max-w-[319px] w-fit lg:space-y-[194px] mx:space-y-32 space-y-20 h-full relative z-10">
            <div className="flex items-center justify-center  2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit 3xl:min-w-[311px]">
              {props.subtittle2}
            </div>
            <div className="flex items-center justify-center 2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit 3xl:min-w-[311px]">
              {props.subtittle3}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
