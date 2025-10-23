import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface ProblemProps {
  title: string | ReactNode;
  subTittle1: string | ReactNode;
  subTittle2: string | ReactNode;
  subTittle3: string | ReactNode;
  bgTextImg: string;
  mainBg: string;
  cartoonImg: string;
  primarySrc: string;
  secondarySrc: string;
}

export function Problem(props: ProblemProps) {
  const titleRef = useRef(null);
  const subtitlesRef = useRef<HTMLDivElement[]>([]);
  const cartoonImgRef = useRef(null);
  const mainBgRef = useRef(null);
  const textBlockRefs = useRef<HTMLParagraphElement[]>([]);
  const textBlockRefs2 = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    gsap.set([...textBlockRefs.current, ...textBlockRefs2.current], {
      opacity: 0,
      y: 0,
    });

    gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 2, ease: "power3.out" });

    gsap.fromTo(cartoonImgRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2, ease: "power3.out" });

    gsap.fromTo(
      subtitlesRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0,
        ease: "power2.out",
        delay: 0.5,
      },
    );

    gsap.fromTo(textBlockRefs.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power2.out", delay: 1.2 });

    gsap.fromTo(textBlockRefs2.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power2.out", delay: 1.2 });

    gsap.fromTo(
      [mainBgRef.current],
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.4)",
        delay: 1,
      },
    );

    // Scroll animations
    textBlockRefs.current.forEach(element => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 20%+=50",
            end: "top 20%-=50",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        })
        .to(element, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.inOut",
        });
    });

    textBlockRefs2.current.forEach(element => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 20%+=50",
            end: "top 20%-=50",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        })
        .to(element, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.inOut",
        });
    });
  }, []);

  return (
    <>
      <h1
        ref={titleRef}
        className="text-2xl md:text-3xl lg:text-4xl 2xl:text-[43px] 3xl:text-[54px] xl:leading-[138.889%] text-white font-michroma font-normal relative z-10 3xl:w-full w-fit"
      >
        {props.title}
      </h1>
      <div className="max-w-[1740px] w-full mx-auto relative ">
        <div className="w-full absolute z-[-10] pointer-events-none flex justify-between mt-16">
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma max-w-[653px] w-full ">
            <p
              ref={el => (textBlockRefs.current[0] = el!)}
              className="3xl:text-[23px] lg:text-lg md:text-base xs:text-[10px] text-[10px] max-sm:!-ml-6 max-w-[471px] w-full  mx-auto"
            >
              Financial Struggle
            </p>
            <p
              ref={el => (textBlockRefs.current[1] = el!)}
              className="3xl:text-[28px] lg:text-xl md:text-lg sm:text-base text-[10px] 3xl:mt-[140px] mx:mt-24 mt-20 text-start max-w-[471px] mx-auto"
            >
              Lack of resources
            </p>
            <p
              ref={el => (textBlockRefs.current[2] = el!)}
              className="3xl:text-[23px] lg:text-lg md:text-base xs:text-[10px] text-[10px] max-sm:leading-3 3xl:mt-[130px] mx:mt-36 sm:mt-16 mt-10 mb-[57px] xl:max-w-[471px]  xl:text-center text-start w-full mx-auto"
            >
              Non-stop complaints from all
            </p>
            <p
              ref={el => (textBlockRefs.current[3] = el!)}
              className="3xl:text-[23px] lg:text-lg md:text-base xs:text-[10px] text-xs md:mt-36 sm:mt-24 mt-16 max-w-[639px] text-start mx:ml-24 xs:ml-6 w-full  sm:block hidden"
            >
              Burnout/Overwhelmed
            </p>
          </div>
          <div className="text-[#ffffff1a] leading-[204.348%] font-michroma w-full max-w-[636px] ">
            <p
              ref={el => (textBlockRefs2.current[0] = el!)}
              className="3xl:text-[23px] lg:text-lg md:text-base xs:text-[10px] text-[10px] max-sm:!-mt-10 text-center max-w-[540px] w-full mx:ml-24 xs:ml-5"
            >
              Day job to pay the bills
            </p>
            <p
              ref={el => (textBlockRefs2.current[1] = el!)}
              className="3xl:text-[31px] md:text-xl sm:text-lg xs:text-[10px] text-[10px] mb-[60px] lg:mt-[200px] sm:mt-36 mt-20 xl:max-w-[391px] xl:text-center text-end w-full mx-auto"
            >
              Coding for free
            </p>
            <p
              ref={el => (textBlockRefs2.current[2] = el!)}
              className="3xl:text-[31px]  md:text-xl sm:text-lg xs:text-[10px] text-[10px] xl:mt-[220px] mx:mt-20 mt-10 xl:text-start text-end xl:max-w-[471px] w-full "
            >
              No say in governance
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mx:gap-8 sm:gap-4 gap-3 3xl:max-w-[1290px] max-w-[980px] w-full mx-auto relative 3xl:pt-14 sm:pt-20 pt-14">
          <div
            ref={el => (subtitlesRef.current[0] = el!)}
            className="flex items-center justify-center 2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm sm:text-[8px] xs:text-[8px] text-[8px] font-michroma mx:max-w-[319px] 3xl:min-w-[319px] relative z-10 bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 sm:rounded-[10px] rounded-md max-w-[319px] w-fit"
          >
            {props.subTittle1}
          </div>
          <div
            ref={mainBgRef}
            className="!opacity-[0.35] absolute left-[50%] -translate-x-1/2 box-gradient pointer-events-none z-[-10] w-[300px] h-[300px] sm:w-[650px] sm:h-[650px]"
          ></div>

          {/* <img ref={mainBgRef} className="absolute -z-10 w-full h-[200%] -top-[30%] object-center" src={props.mainBg} alt="mainBg" /> */}
          <img
            ref={cartoonImgRef}
            src={props.cartoonImg}
            alt="cartoonImg"
            className="3xl:max-w-[390px] 2xl:max-w-[320px] md:max-w-[300px] mx:max-w-[220px] sm:max-w-[150px] xs:max-w-[120px] max-w-[100px] w-full 3xl:min-h-[550px] mx:min-h-[400px] sm:min-h-[310px]  xs:min-h-[200px] min-h-[180px] h-full object-center z-10 relative"
          />
          <div ref={el => (subtitlesRef.current[1] = el!)} className="mx:max-w-[319px] w-fit lg:space-y-[194px] mx:space-y-32 space-y-20 h-full relative z-10">
            <div className="flex items-center justify-center  2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm sm:text-xs xs:text-[8px] text-[8px] font-michroma bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 sm:rounded-[10px] rounded-md max-w-[319px] w-fit 3xl:min-w-[311px]">
              {props.subTittle2}
            </div>
            <div className="flex items-center justify-center 2xl:text-[23px] xl:text-lg lg:text-base mx:text-sm sm:text-xs xs:text-[8px] text-[8px] font-michroma bg-[#FF7E4B] lg:!p-[15px] xs:p-2 p-1 sm:rounded-[10px] rounded-md max-w-[319px] w-fit 3xl:min-w-[311px]">
              {props.subTittle3}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
