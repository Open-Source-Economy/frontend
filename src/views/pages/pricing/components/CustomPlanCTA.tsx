import React from "react";
import { Button } from "../ui/button";

export function CustomPlanCTA() {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <div className="bg-card rounded-xl p-8 border border-brand-neutral-300 hover:border-brand-accent/60 transition-colors shadow-lg">
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-neutral-200/50 border border-brand-accent/30 mb-4">
            <span className="text-brand-accent text-xs uppercase tracking-wider">Enterprise & Custom</span>
          </div>
          <h3 className="text-brand-neutral-900 mb-3">Need a Custom Plan?</h3>
          <p className="text-brand-neutral-600 mb-8">Unlock tailored solutions designed for your organization's unique needs</p>

          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-brand-neutral-200/30 rounded-lg p-4 border border-brand-neutral-300 hover:border-brand-accent/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-brand-neutral-900 mb-1">Brand Recognition Campaign</h4>
                  <p className="text-brand-neutral-600 text-xs">Amplify your company's presence in the open source community</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-neutral-200/30 rounded-lg p-4 border border-brand-neutral-300 hover:border-brand-accent/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-brand-neutral-900 mb-1">24/7 Operational Support</h4>
                  <p className="text-brand-neutral-600 text-xs">Dedicated support for your custom projects and initiatives</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-neutral-200/30 rounded-lg p-4 border border-brand-neutral-300 hover:border-brand-accent/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-brand-neutral-900 mb-1">Custom Billing Terms</h4>
                  <p className="text-brand-neutral-600 text-xs">Flexible credit amounts and payment schedules</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-neutral-200/30 rounded-lg p-4 border border-brand-neutral-300 hover:border-brand-accent/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-brand-neutral-900 mb-1">Unique Requirements</h4>
                  <p className="text-brand-neutral-600 text-xs">Whatever your organization needs, let's discuss it</p>
                </div>
              </div>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white uppercase tracking-wide">
            Request Custom Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
