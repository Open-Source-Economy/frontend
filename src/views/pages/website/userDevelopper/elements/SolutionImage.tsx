import React from "react";
import star from "src/assets/star.png";

interface SolutionImageProps {
  image: string;
  starPosition: string;
}

export function SolutionImage(props: SolutionImageProps) {
  return (
    <div className="bg-[#14233A] flex items-center justify-center relative rounded-[30px]  transition-shadow duration-300 hover:shadow-xl group w-full 2xl:min-h-[424px] lg:min-h-[370px] min-h-[300px] sm:max-h-full h-full !p-10">
      <img src={props.image} className={"object-cover "} alt="" />
      <img src={star} className={`absolute object-cover transition-transform duration-300 group-hover:rotate-90 ${props.starPosition}`} alt="" />
    </div>
  );
}
