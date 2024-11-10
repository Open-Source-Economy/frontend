import React from "react";
import deving from "../../assets/deving.png";
const CustomDevHero = () => {
  return (
    <section className="2xl:mt-[104px] xl:mt-20 lg:mt-16 mt-14 2xl:mb-[269px] xl:mb-[240px] lg:mb-[200px] md:mb-[150px] mb-[100px] w-full max-w-[1740px] !px-4 mx-auto">
      <h1 className="2xl:text-[54px] xl:text-5xl md:text-4xl sm:text-3xl text-2xl leading-[138%] text-white max-w-[800px] text-center mx-auto ff_michroma">
        As an open source dev. are you experiencing....
      </h1>
      <div className="group-text-bg">
        <div className="flex items-center w-full justify-between xl:mt-[95px] mt-16 max-w-[1220px] mx-auto gap-6">
          <div className="relative w-full flex items-center justify-center deving-bg">
            <img className=" w-full object-cover" src={deving} alt="deving" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDevHero;
