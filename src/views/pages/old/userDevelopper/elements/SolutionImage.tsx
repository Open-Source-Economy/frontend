import React from "react";
import star from "src/assets/star.png";

interface SolutionImageProps {
  image: string;
  starPosition: string;
}

export function SolutionImage(props: SolutionImageProps) {
  return (
    <div className="bg-[#14233A] flex items-center justify-center relative rounded-[30px] transition-shadow duration-300 hover:shadow-xl group 2xl:h-[424px] lg:h-[370px] sm:h-[250px] sm:w-full sm:max-h-full w-[200px] h-[200px] mx-auto sm:p-12 p-9">
      <div className=" w-full mx-auto flex items-center justify-center relative">
        <img src={props.image} className={"object-cover relative sm:max-w-[300px] max-w-[220px] lg:h-[270px] sm:h-[230px] h-[150px]"} alt="" />
        <img src={star} className={`absolute object-cover transition-transform duration-300 group-hover:rotate-90 ${props.starPosition}`} alt="" />
      </div>
    </div>
  );
}
