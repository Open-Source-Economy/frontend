import React from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * SuccessHeroSection - Hero section for the onboarding success page
 * Shows the success icon, title, and welcome message
 */
export const SuccessHeroSection: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-success to-brand-success-dark rounded-2xl mb-6 shadow-lg">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>

      <h1 className="mb-3">
        <span className="bg-gradient-to-r from-brand-accent via-brand-highlight to-brand-accent bg-clip-text text-transparent">
          You're In! Welcome Aboard 🎉
        </span>
      </h1>

      <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
        Thanks for taking the leap! We're excited to have you join the Open Source Economy community. Our team is reviewing your application and we'll reach out
        soon.
      </p>
    </div>
  );
};
