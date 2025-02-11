import { PageWrapper } from "../../PageWrapper";

import React from "react";
import { DigIntoDetails, FeaturesSection, HeroSection, HowItWorks, Projects, VideoSection } from "src/views/pages/website/home/elements";
import { config, Env } from "src/ultils";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        <HowItWorks />
        {config.env !== Env.Production && <DigIntoDetails />}
        <Projects />
      </div>
    </PageWrapper>
  );
}
