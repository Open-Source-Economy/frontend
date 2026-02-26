import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "src/views/auth/AuthContext";
import { paths } from "../../../../paths";
import { CTASection, HeroSection, MissionSection, PartnershipSection, WhyJoinSection } from "./components";
import { PageWrapper } from "../../PageWrapper";

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    if (auth.authInfo) {
      navigate({ to: paths.DEVELOPER_ONBOARDING as string });
    } else {
      auth.loginWithGitHub();
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-secondary">
        <HeroSection onGitHubSignIn={handleGitHubSignIn} />
        <MissionSection />
        <PartnershipSection />
        <WhyJoinSection />
        <CTASection onGitHubSignIn={handleGitHubSignIn} />
      </div>
    </PageWrapper>
  );
}
