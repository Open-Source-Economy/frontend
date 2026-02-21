import React from "react";
import { Leaf } from "lucide-react";
import { FundDistributionCard } from "./FundDistributionCard";

export function FundDistribution() {
  return (
    <div className="bg-gradient-to-br from-brand-accent/5 to-brand-highlight/5 rounded-lg p-8 border border-brand-accent/20">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-accent to-brand-highlight flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-brand-neutral-900 mb-2">Every Credit Fuels the Ecosystem</h3>
          <p className="text-sm text-brand-neutral-600">When you use credits, funds flow through the entire open source dependency chain.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FundDistributionCard percentage="60%" title="Direct Service" description="Pays the maintainer for your requested work" />
        <FundDistributionCard percentage="25%" title="Dependencies" description="Distributed to all project dependencies" />
        <FundDistributionCard percentage="15%" title="Ecosystem" description="Platform operations & OSS sustainability" />
      </div>
    </div>
  );
}
