import React from "react";
import { Button } from "../elements";
import notFound from "src/assets/404.webp";
import hero from "src/assets/Rectangle.png";
import { MascotIcon } from "src/Utils/Icons";
import faq from "src/assets/faq-bg.webp";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col !bg-secondary relative overflow-hidden">
      <img src={faq} className="absolute hidden xl:block max-w-[870px] max-h-[800px] w-full -left-[20%] -top-[15%]" alt="" />
      <img
        src={faq}
        className="absolute xl:-right-[18%] 3xl:-right-[10%] hidden xl:block max-w-[870px] max-h-[800px] w-full xl:-bottom-[28%] 3xl:-bottom-[17%]"
        alt=""
      />
      <div className="rounded-full xl:bg-[rgba(14,31,53,0.11)] backdrop-blur-[7.5px] xl:shadow-[5px_8px_10px_0px_rgba(255,255,255,0.08)_inset] max-w-[90%] 2xl:max-w-[47vw] xl:max-w-[53vw] w-full max-h-[90vw] xl:max-h-[53vw] 2xl:max-h-[47vw] h-full flex justify-center items-center flex-col relative">
        <img src={hero} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 -z-10 pointer-events-none" alt="" />
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-montserrat">Oops</h3>
        <div className="relative flex justify-center items-center mt-10 md:mt-14">
          <img src={notFound} alt="" className="lg:max-w-[720px] w-[75%] " />
          <span className="absolute top-[10%] xl:top-[14%] left-[51%] -translate-x-1/2 max-w-[20%] xl:max-w-[120px]  w-full">
            <MascotIcon />
          </span>
        </div>
        <h5 className="sm:text-lg md:text-xl 2xl:text-[22px] 3xl:text-[25px]">We're sorry,</h5>
        <h5 className="sm:text-lg md:text-xl 2xl:text-[22px] 3xl:text-[25px] font-montserrat opacity-90  text-center !mt-5">
          The page you were looking for doesn't exist anymore.
        </h5>
        <Button audience="ALL" level="PRIMARY" size="MEDIUM" className="mt-10" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
