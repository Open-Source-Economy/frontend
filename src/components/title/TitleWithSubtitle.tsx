import React from "react";

interface TitleWithSubTitleProps {
  title: string;
  subtitle: string;
}

export function TitleWithSubtitle(props: TitleWithSubTitleProps) {
  return (
    <>
      <h3 className="text-2xl font-medium  lg:text-3xl max-w-[586px] mx-auto xl:text-[33px] font-mdeium text-center 3xl:text-[40px] mt-20 sm:mt-14">
        {props.title}
      </h3>
      <h5 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[320px] 500:max-w-[500px] 3xl:max-w-[596px] mx-auto  opacity-70 !mt-3 xl:!mt-5">
        {props.subtitle}
      </h5>
    </>
  );
}
