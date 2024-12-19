import React from "react";
import { Audience, textColorVariants } from "../../views";

interface TitleProps {
  audience: Audience;
  whiteText: string;
  coloredText: string;
}

export function Title(props: TitleProps) {
  return (
    <h1 className="lg:text-[62px] text-[30px] font-michroma text-center font-medium text-white">
      {props.whiteText} <span className={`${textColorVariants[props.audience]}`}>{props.coloredText}</span>
    </h1>
  );
}
