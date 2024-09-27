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
}

export function Solution(props: SolutionProps) {
  return (
    <div data-aos="fade-in" data-aos-duration="35000" className="grid grid-cols-1 md:grid-cols-2 max-w-full mb-24 gap-12 items-center ml-4 md:mr-40">
      <div className="justify-self-end">
        <SolutionImage image={props.image} starPosition={props.starPosition} />
      </div>

      <div className="" data-aos="fade-in" data-aos-duration="35000">
        <div className="px-2">
          {props.comingSoon && <h4 className="text-gray-300 text-[14px] xl:text-[18px]">COMING SOON</h4>}
          <h4 className={`${textColorVariants[props.audience]} mt-2 text-xl lg:text-4xl xl:text-5xl`}>{props.title}</h4>
          <h5 className="md:text-lg xl:text-[20px] text-md mt-3 text-gray-300">{props.subTitle}</h5>
          <p className={"text-[12px] xl:text-[15px] text-gray-300 mt-6"}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
