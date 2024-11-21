import { PageWrapper } from "../../PageWrapper";
import { BaseURL, STAGE_FLAG } from "src/App";
import React from "react";
import { DigIntoDetails, FeaturesSection, HeroSection, VideoSection, Projects } from "src/views/pages/website/home/elements";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper baseURL={BaseURL.WEBSITE}>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        {STAGE_FLAG && <DigIntoDetails />}
        <Projects />
      </div>
    </PageWrapper>
  );
}
