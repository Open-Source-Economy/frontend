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
      <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-[43px] 3xl:text-[54px] xl:leading-[138.889%] text-white font-michroma font-normal relative z-10 3xl:w-full w-fit">
        {props.title}
      </h1>
      <div className="max-w-[1740px] w-full mx-auto relative ">
        <div className="w-full absolute z-[-10] pointer-events-none flex justify-between mt-14">
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma max-w-[653px] w-full ">
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs max-w-[471px] w-full  mx-auto">Stable enough?</p>
            <p className="3xl:text-[28px] lg:text-xl md:text-lg sm:text-base text-sm mx:mt-[170px] mt-20 text-start max-w-[650px] mx-auto">
              Will my issues be fixed?
            </p>
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs 3xl:mt-[100px]  mx:mt-20 sm:mt-16 mt-10 mb-[57px] xl:max-w-[471px]  xl:text-center text-start w-full mx-auto">
              No eyes on my PR!
            </p>
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs md:mt-36 sm:mt-24 mt-16 max-w-[639px] text-start mx:ml-24 xs:ml-6 w-full  ">
              No influence <br /> over governance
            </p>
          </div>
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma w-full max-w-[636px] ">
            <p className="3xl:text-[23px] lg:text-lg md:text-base xs:text-sm text-xs text-center max-w-[540px] w-full mx:ml-24 xs:ml-16">No customer support</p>
            <p className="3xl:text-[31px] md:text-xl sm:text-lg xs:text-base text-sm mb-[60px] 3xl:mt-[350px] 2xl:mt-[300px] sm:mt-36 mt-20 xl:max-w-[391px] xl:text-center text-end w-full mx-auto">
              Security concerns?
            </p>
            <p className="3xl:text-[31px]  md:text-xl sm:text-lg xs:text-base text-sm xl:mt-[150px] mx:mt-20 mt-10 xl:text-start text-end xl:max-w-[471px] w-full ">
              No warranties,
              <br />
              no commitment
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mx:gap-8 sm:gap-4 gap-3 3xl:max-w-[1290px] max-w-[980px] w-full mx-auto relative 3xl:pt-14 pt-20">
          <div className="mx:max-w-[319px] w-fit lg:space-y-[194px] mx:space-y-32 space-y-20 h-full relative z-10">
            <div className="flex items-center justify-center  xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma bg-[#FF518C] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit">
              {props.subtittle2}
            </div>
            <div className="flex items-center justify-center xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma bg-[#FF518C] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit">
              {props.subtittle3}
            </div>
          </div>
          <img className="absolute -z-10 w-full h-[200%] -top-[30%] object-center" src={props.mainBg} alt="mainBg" />
          <img
            src={props.cartoonImg}
            alt="cartoonImg"
            className="3xl:max-w-[390px] 2xl:max-w-[320px] md:max-w-[300px] mx:max-w-[220px] sm:max-w-[150px] xs:max-w-[120px] max-w-[100px] w-full 3xl:min-h-[550px] mx:min-h-[400px] sm:min-h-[310px] xs:min-h-[200px] min-h-[180px] h-full object-center z-10 relative"
          />
          <div className="flex items-center justify-center xl:text-[23px] xl:text-lg lg:text-base mx:text-sm xs:text-xs text-[10px] font-michroma mx:max-w-[319px] relative z-10 bg-[#FF518C] lg:!p-[15px] xs:p-2 p-1 rounded-[10px] max-w-[319px] w-fit">
            {props.subtittle1}
          </div>
        </div>
      </div>
    </>
  );
}
