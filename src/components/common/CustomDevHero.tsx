import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface CustomDevHeroProps {
  heading: string;
  className: string;
  headingClassName: string;
  imgPath: string;
  bgImgPath: string;
}

const CustomDevHero: React.FC<CustomDevHeroProps> = ({ heading, className, imgPath, headingClassName, bgImgPath }) => {
  const mainText = useRef(null);
  const mainImage = useRef(null);
  useEffect(() => {
    if (mainText.current) {
      gsap.fromTo(
        mainText.current,
        { autoAlpha: 0, delay: 0.8 },
        {
          autoAlpha: 1,
          delay: 0.8,
        }
      );
      gsap.fromTo(
        mainImage.current,
        { autoAlpha: 0, delay: 0.9 },
        {
          autoAlpha: 1,
          delay: 0.9,
        }
      );
      gsap.fromTo(
        ".group-text-bg",
        { autoAlpha: 0, delay: 0.9 },
        {
          autoAlpha: 1,
          delay: 0.9,
        }
      );
      gsap.fromTo(
        mainText.current,
        { y: 70, delay: 0.8 },
        {
          y: 0,
          delay: 0.8,
          duration: 0.6,
          ease: "power3.out",
        }
      );
      gsap.fromTo(
        ".group-text-bg",
        {
          y: -100,
          scale: 0.5,
          delay: 0.8,
          duration: 0.6,
        },
        {
          y: 0,
          scale: 1,
          delay: 0.8,
          duration: 0.6,
        }
      );
      gsap.fromTo(
        mainImage.current,
        { y: 170, delay: 0.9 },
        {
          y: 0,
          delay: 0.9,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [mainText.current]);
  return (
    <section className="2xl:mt-[104px] xl:mt-20 lg:mt-16 mt-14 2xl:mb-[269px] xl:mb-[240px] lg:mb-[200px] md:mb-[150px] mb-[100px] w-full max-w-[1913px] !px-4 mx-auto">
      <h1
        ref={mainText}
        className={`2xl:text-[54px] xl:text-5xl md:text-4xl sm:text-3xl text-2xl leading-[138%] text-white text-center mx-auto ff_michroma ${headingClassName}`}
      >
        {heading}
      </h1>
      <div className="w-full relative">
        <img className={`object-cover w-full  ${className}`} src={bgImgPath} alt="imgPath" />
        <div className="flex items-center w-full justify-between xl:mt-[95px] mt-16 max-w-[1220px] mx-auto gap-6">
          <div ref={mainImage} className="relative w-full flex items-center justify-center deving-bg">
            <img className="w-full object-cover" src={imgPath} alt="deving" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDevHero;
