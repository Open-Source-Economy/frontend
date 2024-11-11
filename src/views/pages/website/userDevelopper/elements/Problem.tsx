import React, { ReactNode, useEffect, useState } from "react";
import img1 from "src/assets/devimg.png";

interface ProblemProps {
  title: string | ReactNode;
  primarySrc: string;
  secondarySrc: string;
}

export function Problem(props: ProblemProps) {
  useEffect(() => {
    // Handle scroll event
  }, []);

  return (
    <>
      <h1 className="text-md md:text-3xl lg:text-4xl xl:text-[60px] xl:leading-[65px] text-white ff_michroma">{props.title}</h1>
      <div className="relative">
        <div>
          <img src={img1} alt="" className="md:w-[65%] px-5 mx-auto h-full" />
        </div>

        <img id="bgImage" src={props.secondarySrc} alt="Background" className={`animated-image `} />

        {/* TODO: to clean */}
        <style>{`
              .animated-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                position: absolute;
                top: -10px;
                left: 0;
                right: 0;
                transition: transform 3s ease, opacity 1s ease;
                opacity: 0;
                transform: translateX(5%);
              }

              
            `}</style>
        <img src={props.primarySrc} alt="" className="w-[100%] object-contain h-full absolute top-0 left-0 right-0" />
      </div>
    </>
  );
}
