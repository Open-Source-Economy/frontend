import React from "react";
import { PageWrapper } from "../../PageWrapper";
import { ActionsSection, NextStepsSection, SuccessHeroSection, VolunteerNoticeSection } from "./components";

export interface DevelopedOnboardingCompleteProps {}

/**
 * DevelopedOnboardingComplete - Displayed after successful onboarding submission
 * Modern, streamlined design with brand colors
 */
export default function DevelopedOnboardingComplete(props: DevelopedOnboardingCompleteProps) {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <SuccessHeroSection />
            <VolunteerNoticeSection />
            <NextStepsSection />
            <ActionsSection />
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
