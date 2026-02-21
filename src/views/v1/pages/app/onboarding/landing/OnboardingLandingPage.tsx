import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "src/views/v1/pages/authenticate/AuthContext";
import { paths } from "../../../../../../paths";
import { PageWrapper } from "../../../PageWrapper";
import { CTASection, HeroSection, SpiritSection } from "./components";

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    if ((auth.authInfo as any)?.user) {
      navigate({ to: paths.DEVELOPER_ONBOARDING as string });
    } else {
      auth.loginWithGitHub(paths.DEVELOPER_ONBOARDING);
    }
  };

  return (
    <PageWrapper>
      <div className="flex max-[1100px]:bg-none w-full min-h-screen px-0 flex-col items-center gap-[50px] md:gap-[100px]">
        <div className="max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 py-[100px] md:py-[150px] space-y-[50px] md:space-y-[100px]">
          <HeroSection onGitHubSignIn={handleGitHubSignIn} />
          {/*<VideoSection />*/}
          <SpiritSection />
          <CTASection />
        </div>
      </div>
    </PageWrapper>
  );
}
