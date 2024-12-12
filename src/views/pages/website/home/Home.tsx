import { PageWrapper } from "../../PageWrapper";
import { BaseURL } from "src/App";
import React from "react";
import { DigIntoDetails, FeaturesSection, HeroSection, Projects, VideoSection } from "src/views/pages/website/home/elements";
import { config, Env } from "src/ultils";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper baseURL={BaseURL.WEBSITE}>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        {config.env !== Env.Production && <DigIntoDetails />}
        <Projects />
      </div>
    </PageWrapper>
  );
}
