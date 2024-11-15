import React from "react";
import star from "src/assets/star.png";

interface SolutionImageProps {
  image: string;
  starPosition: string;
}

export function SolutionImage(props: SolutionImageProps) {
  return (
    <div className="bg-[#14233A] flex items-center justify-center relative rounded-[30px] transition-shadow duration-300 hover:shadow-xl group 2xl:h-[424px] lg:h-[370px] max-sm:h-[250px] max-sm:w-[75%] !w-full mx-auto sm:max-h-full xs:p-12 p-10">
      <div className="relative sm:max-w-[300px] max-w-[220px] lg:h-[270px] sm:h-[230px] h-[200px] w-full mx-auto flex items-center justify-center">
        <img src={props.image} className={"object-cover h-full"} alt="" />
        <img src={star} className={`absolute object-cover transition-transform duration-300 group-hover:rotate-90 ${props.starPosition}`} alt="" />
      </div>
    </div>
  );
}
