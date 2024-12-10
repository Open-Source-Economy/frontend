import offerLeftLinear from "src/assets/offer-linear.webp";
import rightLinear from "src/assets/right-linear-bg.png";
import { Button } from "src/components";
import WhatWeOfferCard from "./WhatWeOfferCard";
import { whatWeOfferData } from "../whoBuiltIt/Helper";

const WhatWeOffer = () => {
  return (
    <section className="relative pt-10">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px] -z-10 top-[20%]" />
      <img src={offerLeftLinear} alt="" className="absolute max-w-[970px] w-full -z-10 pointer-events-none left-[-2%] -top-[15%] xl:-top-[26%] " />
      <div className="!px-4 xl:!px-0 xl:max-w-[90%] 2xl:max-w-[80%] 3xl:max-w-[1440px] mx-auto relative z-20 ">
        <div className="grid lg:place-items-start  place-items-center grid-cols-1 lg:grid-cols-2  !gap-5 3xl:!gap-10">
          {whatWeOfferData.map((card, index) => (
            <WhatWeOfferCard key={index} card={card} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 xl:mt-14 3xl:mt-16">
          <Button audience="ALL" level="PRIMARY" size="LARGE" asChild>
            <span>Book a Metting</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
