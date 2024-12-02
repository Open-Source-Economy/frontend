// ServiceBox.tsx
import React from "react";
import check from "src/assets/checkmark.png";
import { Button } from "src/components";

type ServiceBoxProps = {
  data: {
    title: string;
    icon: React.ReactNode;
    items: string[];
    buttonText?: string;
  };
};

const ServiceBox: React.FC<ServiceBoxProps> = ({ data }) => (
  <div className="rounded-2xl xl:rounded-[35px] sm:min-w-[470px] w-full sm:max-w-[668px] bg-[rgba(20,35,58,0.79)] backdrop-blur-[35px] !px-4 !pt-4 !pb-7">
    <div className="text-xl md:text-2xl xl:text-[35px] flex items-center gap-3 leading-[100%] bg-[#0A1930] !p-4 xl:!p-9 rounded-xl xl:rounded-[25px] font-michroma text-white">
      <span> {data.icon}</span> <h1>{data.title}</h1>
    </div>
    <ul className="mt-8 space-y-6">
      {data.items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 !px-4 xl:!px-10">
          <img src={check} className="md:w-7 h-5 w-5 md:h-7" alt="checkmark" />
          <h2 className="montserrat text-xl md:text-2xl  font-normal text-start">{item}</h2>
        </div>
      ))}
    </ul>

    <div className="sm:!px-5">
      {data.buttonText && (
        <Button level="PRIMARY" size="LARGE" asChild>
          <span className="relative z-20 w-full !mt-7  md:!mt-12">{data.buttonText}</span>
        </Button>
      )}
    </div>
  </div>
);

export default ServiceBox;
