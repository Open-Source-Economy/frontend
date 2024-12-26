import React from "react";
import { CheckIcon, LeftLinear, LinearCenter } from "src/Utils/Icons";
import useFunds from "src/assets/use-of-funds.webp";

const UseOfFunds = () => {
  const reliableData = [
    { id: 1, text: "Having the equivalent of 2 full-time developers" },
    { id: 2, text: "Setting up dedicated hardware to reproduce and fix bugs effectively." },
    {
      id: 3,
      text: (
        <>
          Addressing <span className="bg-gradient-custom text-transparent bg-clip-text inline-block">critical issues </span> (like Issue #578).
        </>
      ),
    },
    { id: 4, text: "Ongoing maintenance and keeping Pekko up-to-date" },
  ];
  return (
    <div className="relative pb-14 xl:pb-0">
      <span className="absolute -z-0 -translate-x-1/2 left-1/2 -top-1/2">
        <LinearCenter />
      </span>
      <span className="absolute h-full -left-[5%] -bottom-[25%]">
        <LeftLinear />
      </span>
      <section className="3xl:max-w-[1617px] relative z-20 !px-4 xl:max-w-[90%] 2xl:max-w-[1440px] mx-auto justify-center gap-14 flex items-center xl:flex-row flex-col-reverse 3xl:gap-[112px]">
        <div className="max-w-[590px] w-full xl:w-[47%] 3xl:max-w-[700px]">
          <h1 className="text-3xl 3xl:text-[40px] font-semibold font-montserrat sm:text-nowrap">
            <span className="relative pb-3 lg:pb-5">
              Use of the
              <span className="absolute sm:block hidden left-0 w-[90%] bottom-0 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            </span>{" "}
            Funds
          </h1>

          <ul className="space-y-4 mt-9">
            <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl mt-8">Your contribution will help us:</p>
            {reliableData.map((item, index) => (
              <div key={index} className="flex items-start gap-3 2xl:gap-5 3xl:gap-6 !px-4">
                <div className="3xl:w-7 h-5 min-w-5 3xl:h-7 mt-1.5">
                  <CheckIcon />
                </div>
                <h2 className="font-montserrat text-base sm:text-xl font-semibold 3xl:text-2xl">{item.text}</h2>
              </div>
            ))}
          </ul>
          <p className="font-montserrat text-base max-w-[620px] 3xl:max-w-[700px] sm:text-xl font-medium 3xl:text-2xl mt-8">
            Distributed systems like Pekko are inherently complex. Achieving consistent behavior, preventing cascading failures, and avoiding regressions
            requires specialized expertise and dedicated resources.
          </p>
        </div>

        {/* ======= Right Image ====  */}
        <div className="max-w-[590px] 3xl:max-w-[873px] xl:w-1/2  w-full !bg-secondary bg-opacity-30 rounded-full flex justify-center items-center  2xl:pl-4 2xl:pt-14 2xl:pr-24 p-10 2xl:pb-16 shadow-[5px_8px_10px_0px_rgba(255,255,255,0.08)_inset]">
          <img src={useFunds} alt="" className=" object-cover" />
        </div>
      </section>
    </div>
  );
};

export default UseOfFunds;
