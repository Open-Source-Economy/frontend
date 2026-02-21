import React from "react";
import { Zap, TrendingUp, Users } from "lucide-react";
import { CreditBenefitCard } from "./CreditBenefitCard";
import { FundDistribution } from "./FundDistribution";

export function HowCreditsWorkSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-brand-neutral-200 via-brand-secondary to-brand-neutral-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-brand-neutral-900 mb-4">How Service Credits Work</h2>
          <p className="text-brand-neutral-600 max-w-2xl mx-auto">
            Universal credits that work across any project. Flexible rates based on service type and maintainer expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <CreditBenefitCard icon={Zap} title="Universal Credits" description="Use credits across any project—allocate resources where you need them most." />
          <CreditBenefitCard
            icon={TrendingUp}
            title="Service-Based Rates"
            description="Bug fixes, features, consultancy, and live sessions—each with transparent credit rates."
          />
          <CreditBenefitCard
            icon={Users}
            title="Maintainer Expertise"
            description="Rates reflect experience and project complexity—browse projects for specific pricing."
          />
        </div>

        <FundDistribution />
      </div>
    </section>
  );
}
