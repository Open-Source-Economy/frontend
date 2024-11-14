import React from "react";
import star from "src/assets/star.png";

interface SolutionImageProps {
  image: string;
  starPosition: string;
}

export function SolutionImage(props: SolutionImageProps) {
  return (
    <div className="bg-[#14233A] flex items-center justify-center relative rounded-[30px] transition-shadow duration-300 hover:shadow-xl group w-full 2xl:h-[424px] lg:h-[370px] max-sm:h-[250px] max-sm:w-[75%] mx-auto sm:max-h-full !sm:p-10 p-16">
      <img src={props.image} className={"object-contain "} alt="" />
      <img src={star} className={`absolute object-cover transition-transform duration-300 group-hover:rotate-90 ${props.starPosition}`} alt="" />
    </div>
  );
}
