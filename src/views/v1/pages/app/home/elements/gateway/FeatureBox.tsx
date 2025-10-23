import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/v1/components/elements/Button";
import startimg from "src/assets/v1/star.png";
import { Audience, textColorVariants } from "../../../../../../Audience";

export interface FeatureBoxProps {
  title: string;
  audience: Audience;
  description: string | ReactNode;
  buttonText?: string;
  buttonPath?: string;
  icon: string;
  imageClassName?: string;
  starPosition: string;
  delay?: number;
  comingSoon?: boolean;
}

export function FeatureBox(props: FeatureBoxProps) {
  return (
    <div
      data-aos="fade-left"
      data-aos-delay={props.delay}
      className="group flex w-full max-w-[550px] flex-col-reverse items-center justify-between gap-[20px] rounded-[30px] bg-[#14233A] px-[40px] py-[20px] max-[1279px]:max-w-[460px] max-[1279px]:py-12 max-[1024px]:max-w-[400px] lg:items-center lg:gap-0 lg:rounded-[50px] lg:px-[40px] lg:py-16 xl:flex-row 1500:max-w-[610px] min-[1600px]:px-[67px] min-[1600px]:py-[73px]"
    >
      <div className="max-[1200px]text-center relative w-fit flex-col items-center max-[1279px]:flex">
        {props.comingSoon && (
          <div className="absolute left-0 top-0 flex h-[102%] w-full items-center justify-start bg-[#14233A] opacity-0 duration-300 group-hover:!opacity-100">
            <h1 className="font-mich w-full text-[28px] font-[400] leading-[1.1] max-[1279px]:text-center lg:text-[45px]">
              Coming <br /> Soon
            </h1>
          </div>
        )}
        <h1 className="font-mich text-[28px] font-[400] lg:text-[36px]">
          {props.audience ? <span className={textColorVariants[props.audience]}>{props.title}</span> : props.title}
        </h1>
        <h2 className="font-most mt-[20px] w-full text-[16px] font-[400] leading-[1.5] max-[1279px]:text-center">{props.description}</h2>
        {props.buttonText && props.buttonPath && (
          <div className="mt-[42px]">
            <Button audience={props.audience} level="PRIMARY" size="MEDIUM" asChild>
              <Link to={props.buttonPath}>{props.buttonText}</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="relative">
        <img className={props.imageClassName} src={props.icon} alt={`${props.title} Icon`} />
        <div className={props.starPosition}>
          <img src={startimg} alt="" className="size-[45px] duration-300 group-hover:rotate-90" />
        </div>
      </div>
    </div>
  );
}
