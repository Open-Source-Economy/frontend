import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { ActionsSection, NextStepsSection, SuccessHeroSection, VolunteerNoticeSection } from "src/views/pages/onboarding/completed/components";

export interface DevelopedOnboardingCompleteProps {}

/**
 * DevelopedOnboardingComplete - Displayed after successful onboarding submission
 * Modern, streamlined design with brand colors
 */
export default function DevelopedOnboardingComplete(_props: DevelopedOnboardingCompleteProps) {
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
