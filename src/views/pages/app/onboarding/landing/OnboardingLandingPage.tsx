import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { paths } from "../../../../../paths";
import { PageWrapper } from "../../../PageWrapper";
import { CTASection, HeroSection, SpiritSection } from "./components";
import { VideoSection } from "../../../../components";

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    if (auth.authInfo?.user) {
      navigate(paths.DEV_ONBOARDING_START);
    } else {
      auth.loginWithGitHub(paths.DEV_ONBOARDING_START);
    }
  };

  return (
    <PageWrapper>
      <div className="flex max-[1100px]:bg-none w-full min-h-screen px-0 flex-col items-center gap-[50px] md:gap-[100px]">
        <div className="max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 py-[100px] md:py-[150px] space-y-[50px] md:space-y-[100px]">
          <HeroSection onGitHubSignIn={handleGitHubSignIn} />
          <VideoSection />
          <SpiritSection />
          <CTASection />
        </div>
      </div>
    </PageWrapper>
  );
}
