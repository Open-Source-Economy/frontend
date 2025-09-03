import sec2icon2 from "src/assets/icon/sec2img3.png";
import sec2icon1 from "src/assets/icon/sec2img.png";
import sec2icon3 from "src/assets/icon/sec2img2.png";
import { paths } from "src/paths";
import { Audience } from "../../../../../Audience";
import React from "react";
import { FeatureBox, FeatureBoxProps } from "./FeatureBox";

interface FeaturesSectionProps {}

export function FeaturesSection(props: FeaturesSectionProps) {
  const features: FeatureBoxProps[] = [
    {
      title: "Developers",
      audience: Audience.DEVELOPER,
      description: (
        <>
          Stop begging for donations! <br /> Fund your future. Have a Say
        </>
      ),
      buttonText: "Get Paid",
      buttonPath: paths.DEVELOPER_LANDING,
      icon: sec2icon1,
      imageClassName: "h-[150px] w-[150px] object-cover sm:h-[178x] sm:w-[177px]",
      starPosition: "absolute left-[10px] top-[48px] sm:left-[16px] sm:top-[43px]",
      delay: 0,
    },
    {
      title: "Enterprise",
      audience: Audience.USER,
      description: (
        <>
          Forget the far west! Secure your <br /> platform, secure your business
        </>
      ),
      buttonText: "Get Support",
      buttonPath: paths.USER,
      icon: sec2icon2,
      imageClassName: "aspect-square h-[160px] w-[170px] sm:!h-[203px] sm:!min-w-[216px]",
      starPosition: "absolute right-[40px] top-[35px] sm:right-[60px] sm:top-[50px]",
      delay: 200,
    },
    {
      title: "Get a Stake",
      audience: Audience.STAKEHOLDER,
      description: (
        <>
          Support, invest, or donate in <br /> projects to get a part of its <br />
          business, governance, and ecosystem.
        </>
      ),
      icon: sec2icon3,
      imageClassName: "aspect-square h-[150px] w-[150px] object-cover sm:!h-[200px] sm:!w-[200px]",
      starPosition: "absolute bottom-[5px] left-[60px]",
      comingSoon: true,
      delay: 400,
    },
  ];

  return (
    <div className="!z-[10] flex w-full items-center justify-center px-[30px] py-[40px] lg:py-[70px] min-[1279px]:px-0">
      <div className="z-[20] flex w-full max-w-[1250px] flex-wrap justify-center gap-6 1500:gap-[30px] min-[1600px]:max-w-[1305px]">
        {features.map((feature, index) => (
          <div key={feature.title} className={index === 2 ? "flex w-full items-center justify-center md:col-span-2" : ""}>
            <FeatureBox {...feature} />
          </div>
        ))}
      </div>
    </div>
  );
}
