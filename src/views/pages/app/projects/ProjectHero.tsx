import React from "react";

const ProjectHero = () => {
  return (
    <>
      {" "}
      <section className="relative w-full !pt-10 px-4 xl:!pt-20">
        <h1 className="relative  text-center mx-auto min-[1800px]:!mt-[141px]  who-built-it-main-heading ">
          Apache/ <span className="bg-gradient-to-r from-[#FF518C] to-[#66319B]  text-transparent bg-clip-text">Pekko</span>
        </h1>
        <h5 className="font-montserrat text-base md:text-xl text-center max-w-[936px] mx-auto 2xl:text-2xl opacity-70 !mt-5">
          Build highly concurrent, distributed, and resilient message-driven{" "}
          <span className="relative !pb-3 lg:!pb-5">
            applications using Java/Scala{" "}
            <span className="absolute w-[53%] bottom-0 left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </h5>
        <h3 className="text-xl md:text-2xl font-medium lg:text-3xl max-w-[80%] md:max-w-[586px] mx-auto xl:text-[33px] font-mdeium text-center font-montserrat min-[1800px]:text-[40px] mt-10 sm:mt-12 md:mt-[60px] 2xl:mt-20">
          What do we offer?
        </h3>
        <h5 className="font-montserrat text-base md:text-xl text-center max-w-[596px] mx-auto 2xl:text-2xl opacity-70 !mt-3 xl:!mt-5">
          We're the experts who build, debug, and maintain it
        </h5>
      </section>
    </>
  );
};

export default ProjectHero;
