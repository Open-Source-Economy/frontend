import offerLeftLinear from "src/assets/offer-linear.webp";
import rightLinear from "src/assets/right-linear-bg.png";
import { Button } from "src/components";
import WhatWeOfferCard from "./WhatWeOfferCard";
import { whatWeOfferData } from "../../whoBuiltIt/elements/Helper";

const WhatWeOffer = () => {
  return (
    <section className="relative pt-6 xl:pt-10 pb-10 xl:pb-16">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px] -z-10 top-[20%]" />
      <img src={offerLeftLinear} alt="" className="absolute max-w-[970px] w-full -z-10 pointer-events-none left-[-2%]  top-0 md:!-top-[15%] xl:!-top-[26%] " />
      <div className="!px-4 max-w-[1164px] 2xl:max-w-[1250px] 3xl:max-w-[1440px] mx-auto relative z-20 ">
        <div className="grid lg:place-items-start  place-items-center grid-cols-1 900:grid-cols-2 !gap-5 3xl:!gap-10">
          {whatWeOfferData.map((card, index) => (
            <WhatWeOfferCard key={index} card={card} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-14 3xl:mt-16">
          <Button audience="ALL" level="PRIMARY" size="LARGE" className="cursor-pointer" asChild>
            <span>Book a Metting</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
