import { Link } from "react-router-dom";
import { Button } from "src/components";
import { LeftLinear, TelephoneIcon } from "src/Utils/Icons";

const AQuestion = () => {
  return (
    <section className="px-4 mt-14 pb-16 relative">
      <div className="bg-sunset-glow-gradient max-w-[490px] w-full h-full min-h-[906px] max-h-[906px] absolute right-[10%] -top-[60%] blur-[125px] -z-10 opacity-35 shrink-0 pointer-events-none -rotate-[103deg] rounded-full"></div>
      <div className="bg-gradient-to-l from-[#5935A1] to-[#AC3556] min-h-[1056px] max-w-[364px] w-full h-full absolute right-[8%] -top-[68%] blur-[125px] -z-0 opacity-50 shrink-0 pointer-events-none -rotate-[41.351deg] rounded-[1057px]"></div>
      <span className="absolute -left-[10%] -top-[80%] -z-10">
        <LeftLinear />
      </span>{" "}
      <h2 className="section-heading relative z-20 lg:pb-6 max-w-[386px] md:max-w-[470px] w-full mx-auto lg:max-w-full mb-8">
        <span className="absolute w-[10%] h-[6px] hidden lg:block left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        A question?
      </h2>
      <p className="font-montserrat text-base max-w-[800px] 2xl:max-w-[910px] text-center 3xl:max-w-[1024px] mx-auto sm:text-xl font-medium 3xl:text-2xl mt-8">
        Distributed systems like Pekko are inherently complex. Achieving consistent behavior, preventing cascading failures, and avoiding regressions requires
        specialized expertise and dedicated resources.
      </p>
      <div className="flex justify-center z-20 relative flex-wrap items-center gap-4 mt-11">
        <Button audience="USER" level={"SECONDARY"} size={"LARGE"} asChild>
          <Link to="#">FAQ</Link>
        </Button>{" "}
        <button className="bg-gradient-to-r font-michroma relative overflow-hidden flex justify-center items-center gap-2 h-14 lg:h-16 3xl:text-lg from-[#FF7E4B]  via-[#FF518C] to-[#66319B] 3xl:h-[75px] min-w-[210px] hover:bg-transparent after:absolute after:w-[97%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100 after:duration-300 rounded-md">
          <span className="relative text-white z-30 flex gap-2 items-center">
            {" "}
            <TelephoneIcon /> Book a Call
          </span>
        </button>
      </div>
    </section>
  );
};

export default AQuestion;
