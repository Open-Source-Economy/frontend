// ServiceBox.tsx
import React from "react";
import check from "src/assets/checkmark.png";

type ServiceBoxProps = {
  data: {
    title: string;
    icon: React.ReactNode;
    items: string[];
    buttonText?: string;
  };
};

const ServiceBox: React.FC<ServiceBoxProps> = ({ data }) => (
  <div className="rounded-2xl cursor-pointer service-card group 3xl:rounded-[35px] sm:min-w-[470px] w-full sm:max-w-[668px] bg-[rgba(20,35,58,0.79)] backdrop-blur-[35px] !px-4 !pt-4 !pb-7">
    <div className="flex items-center gap-2.5 md:gap-4 leading-[100%] bg-[#0A1930] !p-4 lg:!p-6 3xl:!p-9 rounded-xl xl:rounded-[25px] font-michroma text-white">
      <span className="max-w-11 sm:!max-w-12 lg:!min-h-12 flex justify-center items-center min-h-10 lg:!max-w-14 3xl:!max-w-[75px] object-cover">
        {data.icon}
      </span>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] min-[1880px]:text-[35px]">{data.title}</h1>
    </div>
    <ul className="!mt-5 sm:!mt-8 space-y-4 3xl:space-y-6">
      {data.items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 !px-4 xl:!px-10">
          <img src={check} className="3xl:w-7 h-5 w-5 3xl:h-7" alt="checkmark" />
          <h2 className="montserrat text-base sm:text-xl 3xl:text-2xl font-normal text-start">{item}</h2>
        </div>
      ))}
    </ul>

    <div className="relative !mt-7 lg:!mt-10 3xl:!mt-12 md:!px-4 xl:!px-5">
      {data.buttonText && (
        // <button className="h-11 w-full rounded-[18px] bg-[#1a2a3f] lg:h-14 3xl:h-[61px] min-w-[210px] transition-all ease-linear duration-300 lg:text-lg 3xl:text-2xl text-base group-hover:bg-gradient-custom">
        //   <span className="relative z-20 w-full text-white">{data.buttonText}</span>
        // </button>

        <button className="relative w-full min-w-[210px] rounded-xl lg:rounded-[18px] h-14 text-lg 3xl:h-[61px] 3xl:text-2xl before:absolute before:inset-0 before:rounded-[18px] before:transition-opacity before:duration-300 before:ease-linear hover:before:opacity-0 bg-gradient-custom">
          <span className="absolute inset-0 scale-[101%] rounded-xl lg:rounded-[18px] bg-[#1a2a3f] transition-opacity duration-300 ease-linear group-hover:opacity-0" />
          <span className="relative z-20 text-white">{data.buttonText}</span>
        </button>
      )}
    </div>
  </div>
);

export default ServiceBox;
