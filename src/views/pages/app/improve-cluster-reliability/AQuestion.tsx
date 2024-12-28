import { Link } from "react-router-dom";
import { Button } from "src/components";
import { LeftLinear, TelephoneIcon } from "src/Utils/Icons";

const AQuestion = () => {
  return (
    <section className="!px-4 pb-16 3xl:pb-24 relative">
      <div
        className="bg-sunset-glow-gradient hidden lg:block w-f
       !max-w-[490px] w-full min-h-[600px] h-full xl:min-h-[906px] max-h-[906px] absolute right-0 3xl:right-[5%] -top-[50%] 3xl:-top-[80%] blur-[125px] -z-10 opacity-30 shrink-0 pointer-events-none !-rotate-[120deg] rounded-full"
      ></div>
      <div className="bg-gradient-to-l from-[#5935A1] to-[#AC3556] min-h-[1056px] max-w-[364px] w-full h-full absolute right-[3%] 3xl:right-[11%] -top-[60%] 3xl:-top-[90%] blur-[125px] -z-0 opacity-50 shrink-0 pointer-events-none -rotate-[41.351deg] rounded-[1057px]"></div>
      <span className="absolute -left-[10%] top-[70%] lg:-top-[80%] -z-10">
        <LeftLinear />
      </span>{" "}
      <h2 className="section-heading relative z-20 !pb-3 lg:!pb-8 max-w-[386px] md:max-w-[470px] w-full mx-auto lg:max-w-full mb-7">
        <span className="absolute w-[40%] sm:w-[10%] h-1 lg:h-[6px] left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        A question?
      </h2>
      <p className="font-montserrat text-base relative z-20 max-w-[800px] opacity-80 2xl:max-w-[910px] text-center 3xl:max-w-[1067px] mx-auto sm:text-xl font-medium 3xl:text-2xl mt-8">
        Distributed systems like Pekko are inherently complex. Achieving consistent behavior, preventing cascading failures, and avoiding regressions requires
        specialized expertise and dedicated resources.
      </p>
      <div className="flex justify-center z-20 relative flex-wrap items-center !gap-4 !mt-5 md:!mt-7 xl:mt-11">
        <Button audience="USER" level={"SECONDARY"} size={"LARGE"} asChild>
          <Link to="#">FAQ</Link>
        </Button>{" "}
        <Button audience="ALL" level="PRIMARY" size="LARGE" className="!capitalize" icon={<TelephoneIcon />}>
          Book a Call
        </Button>
      </div>
    </section>
  );
};

export default AQuestion;
