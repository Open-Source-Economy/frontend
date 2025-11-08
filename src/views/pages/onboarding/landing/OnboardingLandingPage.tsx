import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/views/auth/AuthContext";
import { paths } from "../../../../paths";
import { CTASection, HeroSection, MissionSection, PartnershipSection, WhyJoinSection } from "./components";
import { PageWrapper } from "../../PageWrapper";

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    if (auth.authInfo?.authenticatedUser) {
      navigate(paths.DEVELOPER_ONBOARDING);
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
