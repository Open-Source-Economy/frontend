import React, { ReactNode } from "react";
import { SolutionImage } from "./SolutionImage";
import { Audience, textColorVariants } from "../../../../Audience";

export interface SolutionProps {
  audience: Audience;
  image: string;
  starPosition: string;
  comingSoon?: boolean;
  title: string;
  subTitle: string | ReactNode;
  text: ReactNode;
  comming: ReactNode;
}

export function Solution(props: SolutionProps) {
  return (
    <div className="flex sm:flex-row flex-col justify-between 2xl:mb-[101px] mb-20 gap-6 items-center w-full 3xl:max-w-[1181px] xl:max-w-[1024px] md:max-w-[768px] max-w-[640px] mx-auto">
      <div className="2xl:max-w-[456px] sm:max-w-[400px] max-h-[424px] w-full ">
        <SolutionImage image={props.image} starPosition={props.starPosition} />
      </div>
      <div className=" 2xl:max-w-[633px] max-w-[550px] w-full sm:text-start text-center">
        <div className="text-gray-300 text-[14px] xl:text-base">{props.comming}</div>
        <h4 className={`${textColorVariants[props.audience]} text-xl md:text-3xl lg:text-4xl xl:text-[45px] ff_michroma`}>{props.title}</h4>
        <h5 className="md:text-lg xl:text-[20px] 2xl:text-[28px] text-base !mt-4 text-gray-300 ff_michroma leading-[130%]">{props.subTitle}</h5>
        <p className={"text-[12px] xl:text-[15px] 2xl:text-[21px] text-white leading-[150%] font-montserrat"}>{props.text}</p>
      </div>
    </div>
  );
}
