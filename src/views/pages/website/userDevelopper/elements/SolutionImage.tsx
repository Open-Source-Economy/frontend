import React from "react";
import star from "src/assets/star.png";

interface SolutionImageProps {
  image: string;
  starPosition: string;
}

export function SolutionImage(props: SolutionImageProps) {
  return (
    <div
      data-aos="fade-in"
      data-aos-duration="35000"
      className="bg-[#14233A] flex items-center justify-center relative rounded-[30px] py-4 px-4 lg:py-6 lg:px-6 xl:py-4 xl:px-8 transition-shadow duration-300 hover:shadow-xl group w-[250px] md:w-[300px]"
    >
      <img src={props.image} className="max-w-full max-h-full" alt="" />
      <img src={star} className={`absolute object-cover transition-transform duration-300 group-hover:rotate-90 ${props.starPosition}`} alt="" />
    </div>
  );
}
