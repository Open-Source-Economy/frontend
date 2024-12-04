import React from "react";
import ServiceBox from "./ServiceBox";
import { services } from "./Helper";

const Services = () => {
  return (
    <div className="mt-10 lg:mt-[70px] grid grid-cols-1 place-items-center w-full lg:grid-cols-2 !gap-5 xl:!gap-8 min-[1800px]:!gap-10 xl:px-8">
      {services.map((service, index) => (
        <ServiceBox key={index} data={service} />
      ))}
    </div>
  );
};

export default Services;
