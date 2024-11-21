import { PageWrapper } from "../../PageWrapper";
import { DigIntoDetails } from "./elements/dig-into-details-section";
import FeaturesSection from "./elements/feature-section";
import HeroSection from "./elements/hero-section";
import VideoSection from "./elements/video-section";
import { BaseURL, STAGE_FLAG } from "src/App";
import React from "react";
import { Projetcts } from "src/views/pages/website/home/elements/Projetcts";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper baseURL={BaseURL.WEBSITE}>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        {STAGE_FLAG && <DigIntoDetails />}
        <Projetcts />
      </div>
    </PageWrapper>
  );
}
