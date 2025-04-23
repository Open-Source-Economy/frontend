import React from "react";

interface DividerTitleProps {
  title: string;
  subtitle?: string;
}

export function DividerTitle(props: DividerTitleProps) {
  return (
    <div className="!px-4 xl:!px-0 max-w-[1164px] 2xl:max-w-[1250px] 3xl:max-w-[1440px] mx-auto flex flex-col justify-center items-center">
      <h2 className="section-heading lg:!pb-8 w-fit relative mb-6 md:mb-8 lg:mb-10 3xl:mb-14">
        {props.title}
        <span className="absolute w-[80%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
      </h2>
    </div>
  );
}
