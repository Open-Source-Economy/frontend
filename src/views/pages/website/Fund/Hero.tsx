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
        <div className="mx-auto mt-40 flex max-w-[1300px] flex-wrap justify-center gap-12 px-3 pb-20 max-[1024px]:!px-5">
          <Cards
            img={"https://avatars.githubusercontent.com/u/36803246?v=4"}
            // img={"https://avatars.githubusercontent.com/u/11135032?v=4"}
            description=" Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"
          />
          <Cards
            img={"https://avatars.githubusercontent.com/u/47359"}
            description=" Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"
          />
          <Cards
            img={"https://avatars.githubusercontent.com/u/17545605?v=4"}
            description="Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala"
          />
        </div>
      </div>
      {/* <img src={fundbgimg} className="absolute -top-[800px] left-0 h-full w-full object-contain 1500:top-0" alt="" /> */}
    </div>
  );
};

const Cards = ({ img, description }: { img: string; description: string }) => {
  return (
    <div className="flex w-[386px] flex-col items-center justify-between gap-y-3 rounded-[40px] bg-[#14233A] py-8 pb-4 pt-4 max-[540px]:w-full max-[490px]:pb-10">
      <div className="flex flex-col items-center justify-between">
        {/* <div className="grid size-[85px] place-items-center bg-[url('/src/assets/glass.svg')] bg-[length:100%_100%] pt-2">
          <img src={img} className="size-[60px] rounded-full object-contain" alt="" />
        </div> */}
        <div className="grid size-[85px] place-items-center overflow-hidden rounded-full border-2 border-gray-300 bg-[length:100%_100%] p-0">
          <img src={img} className="size-full object-cover object-center" alt="" />
        </div>
        {/* <div className=""> */}
        <div className="max-[860px]:min-h-[150px]">
          <h4 className="font-mich mt-3 text-3xl max-[540px]:!text-2xl">
            <Link to={"/"} className="text-secondary duration-300 hover:underline">
              Apache
            </Link>
            /
            <Link to={"/"} className="duration-300 hover:underline">
              Pekko
            </Link>
          </h4>
          <p className="my-2 mt-3 px-4 text-lg font-normal text-white opacity-85 max-[540px]:text-base">{description}</p>
        </div>
      </div>
      {/* <DeveloperButton title="FUND" className="mt-2 h-[48px] w-[214px]" path="/developer" /> */}
      <Button variant="SECONDARY_DEVELOPER" size="MEDIUM" asChild className="w-full" parentClassName="w-full max-w-[214px]">
        <Link to="/developer">
          <span className="relative z-20">FUND</span>
        </Link>
      </Button>
    </div>
  );
};

export default Hero;
