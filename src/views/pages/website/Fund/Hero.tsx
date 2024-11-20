import { Link } from "react-router-dom";
import { Button } from "src/components/elements/Button";

const Hero = () => {
  return (
    <div className="relative min-h-screen py-10">
      <div className="relative z-20 w-full bg-[url('/src/assets/fund.png')] bg-no-repeat py-32 text-center 300:!bg-[position:50%_-300px] 700:!bg-[position:50%_-220px] 1300:!bg-auto 1300:!bg-[position:50%_60%]">
        <h1 className="font-mich text-4xl md:text-5xl lg:text-6xl">
          Fund an
          <span className="ml-3 text-primary-developer">Issue</span>
        </h1>
        TODO
        <div className="mx-auto mt-40 flex max-w-[1300px] flex-wrap justify-center gap-12 px-3 pb-20 max-[1024px]:!px-5">
          {/*<Cards*/}
          {/*  img={"https://avatars.githubusercontent.com/u/36803246?v=4"}*/}
          {/*  // img={"https://avatars.githubusercontent.com/u/11135032?v=4"}*/}
          {/*  description=" Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"*/}
          {/*/>*/}
          {/*<Cards*/}
          {/*  img={"https://avatars.githubusercontent.com/u/47359"}*/}
          {/*  description=" Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"*/}
          {/*/>*/}
          {/*<Cards*/}
          {/*  img={"https://avatars.githubusercontent.com/u/17545605?v=4"}*/}
          {/*  description="Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
};

const Cards = ({ img, description }: { img: string; description: string }) => {};

export default Hero;
