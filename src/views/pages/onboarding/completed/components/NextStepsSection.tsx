import React from "react";
import { Clock, Send, Sparkles } from "lucide-react";
import { NextStepsCard } from "../NextStepsCard";

/**
 * NextStepsSection - "What's Next?" section for onboarding success page
 * Displays the three next steps after onboarding
 */
export const NextStepsSection: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-center text-brand-neutral-900 mb-8">What's Next?</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <NextStepsCard
          icon={Clock}
          title="We'll Review It"
          description="Our team will take a look at your details and make sure everything looks good."
          timeline="Usually 2-3 business days"
          brandColor="accent"
        />

        <NextStepsCard
          icon={Send}
          title="You'll Hear From Us"
          description="We'll send you an email with everything you need to get started!"
          timeline="Keep an eye on your inbox"
          brandColor="highlight"
        />

        <NextStepsCard
          icon={Sparkles}
          title="Start Your Journey"
          description="Connect with companies looking to support your projects and get funded!"
          timeline="The fun part begins"
          brandColor="success"
        />
      </div>
    </div>
  );
};
