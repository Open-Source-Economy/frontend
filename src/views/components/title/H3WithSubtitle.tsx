import React from "react";

interface H3WithSubTitleProps {
  title: string;
  subtitle: string;
  divider?: boolean;
}

export function H3WithSubtitle(props: H3WithSubTitleProps) {
  return (
    <>
      <h3 className="text-2xl font-medium  lg:text-3xl max-w-[586px] mx-auto xl:text-[33px] font-mdeium text-center 3xl:text-[40px] mt-20 sm:mt-14">
        {props.title}
      </h3>

      {props.subtitle && (
        <h5 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[320px] 500:max-w-[470px] md:max-w-[936px] mx-auto opacity-70 !mt-4">
          <span className="relative w-fit inline md:block mx-auto !pb-3 lg:!pb-5">
            {props.subtitle}
            {props.divider && (
              <span className="absolute w-[53%] bottom-0 hidden lg:block left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            )}
          </span>
        </h5>
      )}
    </>
  );
}
