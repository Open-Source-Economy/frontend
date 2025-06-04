import { PageWrapper } from "../../PageWrapper";

import React from "react";
import { DigIntoDetails, Gateway, HeroSection, Projects } from "src/views/pages/app/home/elements";
import { config, Env } from "src/ultils";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <Gateway />
        {config.env !== Env.Production && <DigIntoDetails />}

        <div className="pt-[40px] lg:pt-[100px] max-[540px]:pt-12"></div>
        <Projects />
        <div className="mt-[130px] lg:mt-[230px]"></div>
        {/*<VideoSection />*/}
        {/*<div className="mb-[30px] lg:mb-[200px]"> </div>*/}
      </div>
    </PageWrapper>
  );
}
