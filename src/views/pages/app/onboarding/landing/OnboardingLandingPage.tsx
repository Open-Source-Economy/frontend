import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/views/pages/authenticate/AuthContext";
import { paths } from "../../../../../paths";
import { PageWrapper } from "../../../PageWrapper";
import { HeroSection, VideoSection, SpiritSection, CTASection } from "./components";

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
      <div className="flex w-full min-h-screen px-0 py-0 pb-[50px] md:pb-[100px] flex-col items-center gap-[50px] md:gap-[100px]">
        <HeroSection onGitHubSignIn={handleGitHubSignIn} />
        <VideoSection />
        <SpiritSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
