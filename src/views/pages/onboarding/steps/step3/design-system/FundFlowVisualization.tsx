import React from "react";
import { DollarSign, GitBranch, TrendingUp, Users } from "lucide-react";

export const FundFlowVisualization: React.FC = () => {
  return (
    <div className="bg-brand-secondary-dark/50 rounded-2xl p-5 border border-brand-neutral-300/10">
      <h4 className="text-sm text-brand-neutral-700 mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-brand-primary" />
        <span>Your Impact</span>
      </h4>

      <div className="space-y-3">
        {/* Flow 1 */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-brand-neutral-800">Your Earnings</p>
              <p className="text-xs text-brand-neutral-600">From enterprise services</p>
            </div>
          </div>
          <div className="absolute left-5 top-10 w-px h-3 bg-gradient-to-b from-brand-accent to-transparent" />
        </div>

        {/* Flow 2 */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-brand-neutral-800">Project Common Pot</p>
              <p className="text-xs text-brand-neutral-600">Your project + deps</p>
            </div>
          </div>
          <div className="absolute left-5 top-10 w-px h-3 bg-gradient-to-b from-brand-primary to-transparent" />
        </div>

        {/* Flow 3 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-highlight to-brand-highlight-dark rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-brand-neutral-800">Invisible Work</p>
            <p className="text-xs text-brand-neutral-600">Ecosystem maintenance</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-brand-neutral-300/10">
        <div className="bg-brand-primary/10 rounded-lg p-2 text-center">
          <p className="text-xs text-brand-primary">Fund the entire OS ecosystem</p>
        </div>
      </div>
    </div>
  );
};
