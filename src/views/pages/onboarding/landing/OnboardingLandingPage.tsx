import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "src/views/auth/AuthContext";

import {
  CTASection,
  HeroSection,
  MissionSection,
  PartnershipSection,
  WhyJoinSection,
} from "src/views/pages/onboarding/landing/components";
import { PageWrapper } from "src/views/pages/PageWrapper";

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
    if (auth.authInfo) {
      navigate({ to: "/developer-onboarding" as string });
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
