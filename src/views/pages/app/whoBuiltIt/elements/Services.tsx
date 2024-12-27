import React from "react";
import ServiceBox from "./ServiceBox";
import rightLinear from "src/assets/right-linear-bg.png";
import { services } from "./Helper";
import leftlinear from "src/assets/left-linear-bg.png";

const Services = () => {
  return (
    <>
      <img src={leftlinear} alt="Left Linear Background" className="absolute opacity-10 pointer-events-none object-cover left-0 z-0 top-[24%] xl:top-[14%]" />
      <img
        src={rightLinear}
        alt="Right Linear backgroun"
        className="absolute pointer-events-none object-cover opacity-90 right-0 max-w-[671px] -z-10 top-[24%]"
      />
      <div className="max-w-[1164px] relative 2xl:max-w-[1250px] 3xl:max-w-[1376px] !px-4 mx-auto pb-12 lg:pt-10 grid grid-cols-1 place-items-center w-full lg:grid-cols-2 !gap-5 xl:!gap-8 3xl:!gap-10 xl:px-8">
        {services.map((service, index) => (
          <ServiceBox key={index} data={service} />
        ))}
      </div>
    </>
  );
};

export default Services;
