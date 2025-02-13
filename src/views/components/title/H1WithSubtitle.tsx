import React, { ReactNode } from "react";
import whoBuiltHero from "../../../assets/hero-bg.webp";

interface H1WithSubTitleProps {
  title: string | ReactNode;
  subtitle?: string;
  subSubtitle?: string;
}

export function H1WithSubtitle(props: H1WithSubTitleProps) {
  return (
    <>
      <section className="w-full pt-20 lg:!pt-32 3xl:!pt-[141px] pb-6 lg:pb-10 max-w-[1164px] relative 3xl:max-w-[1376px] !px-4 mx-auto">
        <img
          src={whoBuiltHero}
          alt=""
          className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] object-cover -translate-x-1/2 left-1/2 -z-10 top-[1%] opacity-40 md:opacity-30"
        />

        <h1 className="relative text-center mx-auto  main-heading">{props.title}</h1>
        <div className="main-heading max-w-[887px] mx-auto mt-2.5">
          <span className="relative block pb-3 lg:pb-5">
            <span className="absolute w-[30%] bottom-0 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </div>

        {props.subtitle && (
          <h3 className="text-[21px] md:text-2xl lg:text-3xl xl:text-[33px] text-center 3xl:text-[40px] mt-10 sm:mt-12 md:mt-[60px] max-w-[320px] 500:max-w-[470px]  sm:max-w-full mx-auto">
            {props.subtitle}
          </h3>
        )}
        {props.subSubtitle && (
          <h5 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center opacity-70 !mt-5 max-w-[320px] 500:max-w-[470px] sm:max-w-full mx-auto">
            {props.subSubtitle}
          </h5>
        )}
      </section>
    </>
  );
}
