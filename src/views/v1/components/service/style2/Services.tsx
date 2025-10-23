import React from "react";
import { ServiceCard } from "./ServiceCard";
import rightLinear from "src/assets/v1/right-linear-bg.webp";
import leftlinear from "src/assets/v1/left-linear-bg.webp";
import { ServiceType } from "@open-source-economy/api-types";

interface ServicesProps {
  buttonPaths?: { [key in ServiceType]?: string };
}

export function Services(props: ServicesProps) {
  const services = [ServiceType.DEVELOPMENT, ServiceType.SUPPORT, ServiceType.SECURITY_AND_COMPLIANCE, ServiceType.ADVISORY];

  return (
    <>
      <img src={leftlinear} alt="Left Linear Background" className="absolute opacity-10 pointer-events-none object-cover left-0 z-0 top-[24%] xl:top-[14%]" />
      <img
        src={rightLinear}
        alt="Right Linear backgroun"
        className="absolute pointer-events-none object-cover opacity-90 right-0 max-w-[671px] -z-10 top-[24%]"
      />
      <div className="max-w-[1164px] relative 2xl:max-w-[1250px] h-auto 3xl:max-w-[1376px] !px-4 mx-auto pb-12 lg:pt-10 grid grid-cols-1 place-items-center w-full lg:grid-cols-2 !gap-5 xl:!gap-8 3xl:!gap-10 xl:px-8">
        {services.map((serviceType, index) => (
          <ServiceCard key={index} serviceType={serviceType} to={props.buttonPaths?.[serviceType]} />
        ))}
      </div>
    </>
  );
}
