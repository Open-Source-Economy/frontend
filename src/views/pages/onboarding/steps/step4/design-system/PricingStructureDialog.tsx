import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "src/views/components/ui/dialog";
import { DollarSign, TrendingUp, Users } from "lucide-react";

export const PricingStructureDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="text-xs text-brand-accent hover:text-brand-accent-light transition-colors underline">
          Learn more about pricing structure
        </button>
      </DialogTrigger>
      <DialogContent className="bg-brand-secondary-dark border border-brand-neutral-300/10 max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-brand-neutral-900">How Enterprise Pricing Works</DialogTitle>
          <DialogDescription className="text-brand-neutral-600">
            Transparent breakdown of how enterprise payments support you and the ecosystem
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 overflow-y-auto pr-2 -mr-2">
          {/* Enterprise Payment */}
          <div className="p-5 bg-[rgba(26,41,66,0)] rounded-lg border border-brand-neutral-300/40">
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-brand-neutral-300/30">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-brand-neutral-900">Pricing Structure</h4>
                  <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded text-xs">Example</span>
                </div>
                <p className="text-xs text-brand-neutral-600">
                  Here's how it works <strong className="text-brand-accent">if you set</strong> your service rate at $150/hr
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-brand-neutral-700">Enterprise Payment</span>
              <span className="text-brand-neutral-900">$200/hr</span>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 pl-3 border-l-2 border-brand-neutral-300/50">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                  <span className="text-sm text-brand-neutral-700">Your service rate</span>
                </div>
                <span className="text-sm text-brand-accent">$150 (75%)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-success"></div>
                  <span className="text-sm text-brand-neutral-700">Your project</span>
                </div>
                <span className="text-sm text-brand-success">$25 (12.5%)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-success"></div>
                  <span className="text-sm text-brand-neutral-700">Dependencies</span>
                </div>
                <span className="text-sm text-brand-success">$15 (7.5%)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-neutral-400"></div>
                  <span className="text-sm text-brand-neutral-700">Platform (non-profit)</span>
                </div>
                <span className="text-sm text-brand-neutral-600">$10 (5%)</span>
              </div>
            </div>

            {/* Collaborative Note */}
            <div className="mt-3 p-3 bg-brand-card-blue/50 rounded-lg border border-brand-success/20">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-brand-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-brand-neutral-700">
                    <strong className="text-brand-success">Note:</strong> Project and dependency distribution is decided collaboratively with you and other
                    maintainers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="relative p-4 bg-gradient-to-br from-brand-accent/8 via-brand-accent/5 to-transparent rounded-lg border-l-4 border-brand-accent overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-accent/15 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-brand-accent" />
                  </div>
                  <h5 className="text-sm text-brand-neutral-900">What You Set</h5>
                </div>
                <p className="text-xs text-brand-neutral-700 leading-relaxed">
                  Enter your <strong className="text-brand-accent">service rate</strong> — what you receive for your work.
                </p>
              </div>
            </div>

            <div className="relative p-4 bg-gradient-to-br from-brand-success/8 via-brand-success/5 to-transparent rounded-lg border-l-4 border-brand-success overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-success/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-success/15 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-brand-success" />
                  </div>
                  <h5 className="text-sm text-brand-neutral-900">Our Commitment</h5>
                </div>
                <p className="text-xs text-brand-neutral-700 leading-relaxed">
                  We maximize your rate with enterprises — when it increases, <strong className="text-brand-success">everyone benefits</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
