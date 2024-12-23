import React from "react";
import needHelp from "src/assets/whyneedhelp.webp";
import { CheckIcon } from "src/Utils/Icons";

const WhyDoWeNeedYourHelp = () => {
  const reliableData = [
    { id: 1, text: "Advanced expertise" },
    { id: 2, text: "Dedicated testing infrastructure" },
    { id: 3, text: "Significant time investment" },
    { id: 4, text: "Dedication" },
  ];
  return (
    <section className="3xl:max-w-[1617px] !px-4 xl:max-w-[90%] 2xl:max-w-[1440px]  mx-auto justify-center gap-14 flex items-center xl:flex-row flex-col 3xl:gap-[112px]">
      {/* ======= Left Image ====  */}
      <div className="max-w-[640px] 3xl:max-w-[666px] xl:w-[47%] w-full ">
        <img src={needHelp} alt="" className=" object-cover" />
      </div>
      <div className="max-w-[640px] xl:w-1/2 w-full 3xl:max-w-[728px]">
        <h1 className="text-3xl 3xl:text-[40px] font-semibold font-montserrat sm:text-nowrap">
          <span className="relative pb-3 lg:pb-5">
            Why Do We
            <span className="absolute sm:block hidden left-0 w-[90%] bottom-0 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
          Need Your Help?
        </h1>
        <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl mt-8">
          Apache Pekko is an independent open-source project powered by volunteers in their free time.
        </p>
        <ul className="space-y-4 mt-9">
          <h3 className="font-montserrat text-base sm:text-xl font-medium 3xl:text-[25px]">Ensuring a reliable Pekko cluster requires:</h3>
          {reliableData.map((item, index) => (
            <div key={index} className="flex items-center gap-3 !px-4">
              <div className="3xl:w-7 h-5 w-5 3xl:h-7">
                <CheckIcon />
              </div>
              <h2 className="font-montserrat text-base sm:text-xl font-semibold 3xl:text-2xl">{item.text}</h2>
            </div>
          ))}
        </ul>
        <p className="font-montserrat text-base max-w-[520px] 3xl:max-w-[628px] sm:text-xl font-medium 3xl:text-2xl mt-8">
          To make Pekko’s cluster reliability our top priority, we need your support.
        </p>
      </div>
    </section>
  );
};

export default WhyDoWeNeedYourHelp;
