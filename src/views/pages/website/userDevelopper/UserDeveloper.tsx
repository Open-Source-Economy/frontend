import React, { ReactNode, useEffect, useState } from "react";
import bg2 from "src/assets/bgimg.png";
import bg from "src/assets/bg.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { PageWrapper } from "../../PageWrapper";
import { Solution, SolutionProps } from "./elements/Solution";
import { Problem } from "./elements/Problem";
import { Audience } from "../../../Audience";
import { InterestForm } from "src/views/pages/website/userDevelopper/elements/InterestForm";

export interface UserDeveloperProps {
  audience: Audience;
  problemTitle: string | ReactNode;
  primaryProblemsSrc: string;
  secondaryProblemsSrc: string;
  solutions: SolutionProps[];
  maxWidth?: string | number;
}

export function UserDeveloper(props: UserDeveloperProps) {
  const [bgSize, setBgSize] = useState("70%");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 2500 && window.innerWidth <= 7000) {
        setBgSize("30%");
      } else {
        setBgSize("60%");
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageWrapper>
      <div className="">
        <div className="flex flex-col lg:mb-20 lg:mt-20 2xl:mt-[104px] my-8 items-center justify-center text-center px-4 md:px-8 lg:px-16">
          <Problem title={props.problemTitle} primarySrc={props.primaryProblemsSrc} secondarySrc={props.secondaryProblemsSrc} />
        </div>

        <div
          className="bg-no-repeat bg-bottom "
          data-aos="fade-in"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundPositionY: "center",
            backgroundSize: "contain",
          }}
        >
          <div data-aos="fade-in" className="2xl:px-20 lg:px-52 container">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[70px] 2xl:text-[74px] xl:leading-[104.054%] ff_michroma">
              No BS. <br />
              <span className="text-lg md:text-xl lg:text-2xl xl:text-[45px] 2xl:text-[54px] ">Here’s our solution.</span>
            </h1>
          </div>

          <div>
            <div
              style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: "right",
                backgroundSize: bgSize,
              }}
              className="bg-no-repeat py-5"
            >
              <div data-aos="fade-in" data-aos-duration="35000" className="px-4 mt-12 2xl:mt-[96px] flex flex-col justify-center items-center max-w-full">
                {props.solutions.map((solution, index) => (
                  <Solution key={index} {...solution} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:py-[197px] md:py-16" data-aos="fade-in" data-aos-duration="25000">
            <h1
              data-aos="fade-in"
              data-aos-duration="25000"
              className="text-2xl md:text-[32px] lg:text-4xl xl:text-5xl ff_michroma !leading-normal text-center px-3 md:px-0"
            >
              The future of open source is here <br className="hidden md:block" /> JOIN THE MOVEMENT.{" "}
            </h1>

            <InterestForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
