import { PageWrapper } from "../../PageWrapper";
import { DigIntoDetails } from "./elements/dig-into-details/dig-into-details-section";
import FeaturesSection from "./elements/features/feature-section";
import HeroSection from "./elements/hero-section/hero-section";
import VideoSection from "./elements/video-section/video-section";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <div className="boxlayer mt-[20px]">
        <HeroSection />
        <FeaturesSection />
        <VideoSection />
        <DigIntoDetails />
      </div>
    </PageWrapper>
  );
}
