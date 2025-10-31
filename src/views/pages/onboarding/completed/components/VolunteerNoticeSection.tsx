import React from "react";
import { Heart } from "lucide-react";

/**
 * VolunteerNoticeSection - Notice about volunteer-powered team
 * Explains that the platform is run by volunteers
 */
export const VolunteerNoticeSection: React.FC = () => {
  return (
    <div className="mb-12 p-6 bg-gradient-to-br from-brand-highlight/5 to-brand-accent/5 border border-brand-accent/20 rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-brand-highlight to-brand-accent rounded-xl flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-brand-neutral-900 mb-1">Made with Love by Our Community</h3>
          <p className="text-sm text-brand-neutral-600">
            We're powered by passionate volunteers who believe in open source. We'll review your profile and get back to you soon—thanks for your patience!
          </p>
        </div>
      </div>
    </div>
  );
};
