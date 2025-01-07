import { LeftLinear, LinearCenter } from "src/Utils/Icons";
import useFunds from "src/assets/icon/useFunds.svg";
import ListItem from "./ListItem";

const UseOfFunds = () => {
  const reliableData = [
    { id: 1, text: "Having the equivalent of 2 full-time developers" },
    { id: 2, text: "Setting up dedicated hardware to reproduce and fix bugs effectively." },
    {
      id: 3,
      text: (
        <>
          Addressing{" "}
          <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#FF518C]  font-bold text-transparent bg-clip-text inline-block">
            critical issues{" "}
          </span>{" "}
          (like Issue #578).
        </>
      ),
    },
    { id: 4, text: "Ongoing maintenance and keeping Pekko up-to-date" },
  ];
  return (
    <div className="relative pb-14 xl:pb-0">
      <div className="hidden xl:block absolute -z-10 w-full h-full -translate-x-1/2 left-1/2 -top-1/2">{/* <LinearCenter /> */}</div>
      {/* <div className="absolute h-full -left-[5%] -bottom-[25%]">
        <LeftLinear />{" "}
      </div> */}
      <section className="3xl:max-w-[1613px] relative z-20 !px-4 xl:max-w-[90%] 2xl:max-w-[1370px] mx-auto justify-end gap-14 flex items-center xl:flex-row flex-col-reverse">
        <div className="max-w-[590px] 2xl:max-w-[580px] w-full 3xl:max-w-[700px]">
          <h1 className="text-2xl relative 2xl:text-[32px] w-fit 3xl:text-[40px] pb-3 lg:pb-5 3xl:!pb-7 font-semibold font-montserrat sm:text-nowrap">
            <span className="absolute sm:inline hidden left-0 w-[70%] bottom-0 h-[4px] 3xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            Use of the Funds
          </h1>

          <ul className="space-y-4 2xl:space-y-5 mt-4 xl:!mt-8 !text-left">
            <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl">Your contribution will help us:</p>
            {reliableData.map((item, index) => (
              <ListItem item={item} key={index} />
            ))}
          </ul>
          <p className="font-montserrat text-base max-w-[620px] 3xl:max-w-[700px] sm:text-xl font-medium 3xl:text-2xl mt-8">
            Distributed systems like Pekko are inherently complex. Achieving consistent behavior, preventing cascading failures, and avoiding regressions
            requires specialized expertise and dedicated resources.
          </p>
        </div>

        {/* ======= Right Image ====  */}
        <div className="max-w-[590px] 2xl:max-w-[680px] 3xl:max-w-[873px] w-full !bg-secondary !bg-opacity-30 rounded-full flex justify-center items-center  2xl:pl-4 2xl:pt-14 2xl:pr-24 p-10 2xl:pb-16 shadow-imgShadow">
          <img src={useFunds} alt="" className=" object-cover" />
        </div>
      </section>
    </div>
  );
};

export default UseOfFunds;
