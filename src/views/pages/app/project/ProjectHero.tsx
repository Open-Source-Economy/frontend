import React from "react";
import hero from "src/assets/project.webp";
import whoBuiltHero from "src/assets/Rectangle.png";

const ProjectHero = () => {
  return (
    <>
      {" "}
      <section className="relative w-full !pt-10 px-4 xl:!pt-20 flex flex-col items-center">
        {" "}
        {/* ================== HERO LINEAR BG ================== */}
        <img
          src={whoBuiltHero}
          alt=""
          className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] object-contain -translate-x-1/2 left-1/2 -z-10 top-[4%] opacity-40 md:opacity-30"
        />
        <img src={hero} alt="" className="w-16 md:h-20 md:w-20 3xl:max-w-[109px] h-16 3xl:max-h-[109px]" />
        <h1 className="relative text-center mx-auto  main-heading !mt-3">
          Apache/<span className="bg-gradient-to-r from-[#FF518C] to-[#66319B]  text-transparent bg-clip-text">Pekko</span>
        </h1>
        <h5 className="font-montserrat text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[936px] mx-auto opacity-70 !mt-4">
          Build highly concurrent, distributed, and resilient message-driven{" "}
          <span className="relative w-fit block mx-auto !pb-3 lg:!pb-5">
            applications using Java/Scala{" "}
            <span className="absolute w-[53%] bottom-0 left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </h5>
        <h3 className="text-xl md:text-2xl font-medium lg:text-3xl max-w-[80%] md:max-w-[586px] mx-auto xl:text-[33px] font-mdeium text-center font-montserrat 3xl:text-[40px] mt-14">
          What do we offer?
        </h3>
        <h5 className="font-montserrat text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[500px] 3xl:max-w-[596px] mx-auto  opacity-70 !mt-3 xl:!mt-5">
          We're the experts who build, debug, and maintain it
        </h5>
      </section>
    </>
  );
};

export default ProjectHero;
