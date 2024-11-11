import React, { useEffect, useRef } from "react";
import { userFeatures } from "../common/Helper";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const NoBsUser = () => {
  const headingTextRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      headingTextRef.current,
      { y: 170, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#solutions",
          start: "top 80%", // Starts the animation when the element is at the bottom of the viewport
          end: "top 70%", // Ends the animation when the element reaches the center of the viewport
          scrub: 2, // Smoothly scrubs the animation with the scroll
        },
      }
    );

    userFeatures.forEach(element => {
      gsap.fromTo(
        `.feature-${element.id}`,
        { y: 170, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.feature-${element.id}`,
            start: "top 80%", // Starts the animation when the element is at the bottom of the viewport
            end: "top 70%", // Ends the animation when the element reaches the center of the viewport
            scrub: 2, // Smoothly scrubs the animation with the scroll
          },
        }
      );
    });
  }, []);
  return (
    <section className="max-w-[1470px] mx-auto w-full !px-4">
      <div ref={headingTextRef}>
        <h2 className="xl:text-[74px] lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-white leading-[104.054%] ff_michroma">No Bs</h2>
        <p className="xl:text-[51px] lg:text-4xl md:text-3xl sm:text-2xl text-xl text-white leading-[104.054%] ff_michroma mt-3">Here’s our solution</p>
      </div>
      <div className="xl:space-y-[101px] lg:space-y-20 space-y-12 lg:mt-[147px] md:mt-[120px] sm:mt-20 mt-14 max-w-[1181px] w-full mx-auto">
        {userFeatures.map(feature => (
          <div key={feature.id} className={`flex sm:flex-row flex-col justify-between gap-4 lg:gap-10 xl:gap-[93px] feature-${feature.id}`}>
            <div className="lg:px-[63px] md:px-12 px-6 xl:py-28 lg:py-24 md:py-14 py-10 lg:max-w-[456px] sm:max-w-[350px] w-full shadow-c2 bg-[#14233A] rounded-[50px] gap-6 flex items-center justify-center max-h-[424px]">
              <img src={feature.imgPath} alt={feature.title} className="object-cover" />
            </div>
            <div className="flex flex-col justify-center lg:max-w-[633px] sm:max-w-[500px] w-full">
              <p className="text-[#E7E1EA] !md:text-base text-sm mb-2.5 ff_michroma">{feature.status}</p>
              <h3 className="text-[#FF518C] xl:text-[45px] lg:text-3xl sm:text-2xl text-xl leading-[130%] ff_michroma">{feature.title}</h3>
              <p className="text-white 2xl:!text-[28px] xl:text-xl sm:text-lg text-base leading-[130%] font-medium ff_michroma ms:mt-4 mt-3">
                {feature.subtitle}
              </p>
              <div className="lg:!mt-[35px] md:mt-4 mt-3 space-y-4 lg:h-[190px] h-full flex flex-col justify-between">
                <div className="space-y-1">
                  {feature.description.map((item, index) => (
                    <p key={index} className="text-white 2xl:text-[21px] xl:text-lg lg:text-base sm:text-sm text-xs leading-[150%]  font-montserrat">
                      {item}
                    </p>
                  ))}
                </div>
                <p className="text-white 2xl:text-[21px] xl:text-lg lg:text-base sm:text-sm text-xs leading-[150%] font-montserrat">{feature.subtitle2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoBsUser;
