import React from "react";
import { Card, CardContent } from "../ui/card";
import { Briefcase, Code, Package, TrendingUp, Users } from "lucide-react";

interface FundingTier {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  goal: number;
  color: string;
  covers: string[];
  impact: {
    projects: string;
    contracts: string;
    maintainers: string;
  };
  founder?: {
    name: string;
    role: string;
    image: string;
  };
}

interface MonthlyFundingGoalsProps {
  currentMonthlyDonations: number;
  tiers: FundingTier[];
}

export function MonthlyFundingGoals({ currentMonthlyDonations, tiers }: MonthlyFundingGoalsProps) {
  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h2 className="text-brand-neutral-900 mb-4">Monthly Funding Goals</h2>
        <p className="text-brand-neutral-600 text-lg mb-6">Your monthly support enables us to grow our capacity and impact</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/30 rounded-lg">
          <TrendingUp className="h-4 w-4 text-brand-accent" />
          <span className="text-brand-neutral-800">
            Current: <strong className="text-brand-accent">€{currentMonthlyDonations}/month</strong> in recurring donations
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {tiers.map((tier, idx) => {
          const TierIcon = tier.icon;
          const progress = Math.min((currentMonthlyDonations / tier.goal) * 100, 100);
          const isActive = currentMonthlyDonations >= tier.goal;
          const isNext = !isActive && (idx === 0 || currentMonthlyDonations >= tiers[idx - 1].goal);

          return (
            <Card
              key={tier.id}
              className={`border-2 transition-all ${
                isActive
                  ? `border-${tier.color}/50 bg-gradient-to-br from-${tier.color}/10 to-${tier.color}/5`
                  : isNext
                    ? `border-${tier.color}/30 bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark`
                    : "border-brand-neutral-300/50 bg-brand-card-blue opacity-75"
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-${tier.color}/20 border border-${tier.color}/30 flex items-center justify-center`}>
                    <TierIcon className={`h-8 w-8 text-${tier.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-brand-neutral-900">
                            Tier {tier.id}: {tier.title}
                          </h3>
                          {isActive && (
                            <span className={`px-2 py-1 bg-${tier.color}/20 text-${tier.color} border border-${tier.color}/30 rounded-md text-xs`}>
                              ✓ Unlocked
                            </span>
                          )}
                          {isNext && (
                            <span className="px-2 py-1 bg-brand-accent/20 text-brand-accent border border-brand-accent/30 rounded-md text-xs">→ Next Goal</span>
                          )}
                        </div>
                        <p className="text-brand-neutral-600 mt-1">€{tier.goal.toLocaleString()}/month</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl text-${tier.color}`}>{progress.toFixed(0)}%</div>
                        <div className="text-xs text-brand-neutral-500">
                          €{currentMonthlyDonations} / €{tier.goal}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="h-3 bg-brand-neutral-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-${tier.color} transition-all duration-500 rounded-full`} style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    {/* Founder Section (if applicable) */}
                    {tier.founder && (
                      <div className="mb-6 p-4 bg-brand-card-blue/50 border border-brand-accent/20 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={tier.founder.image}
                            alt={tier.founder.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-brand-accent/30"
                          />
                          <div>
                            <div className="text-brand-neutral-900">{tier.founder.name}</div>
                            <div className="text-brand-neutral-600 text-sm">{tier.founder.role}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* What It Covers */}
                      <div>
                        <h4 className="text-brand-neutral-800 mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          What It Covers
                        </h4>
                        <ul className="space-y-2">
                          {tier.covers.map((item, i) => (
                            <li key={i} className="text-brand-neutral-600 text-sm flex items-start gap-2">
                              <span className={`text-${tier.color} mt-0.5`}>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="text-brand-neutral-800 mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Expected Impact
                        </h4>
                        <ul className="space-y-2">
                          <li className="text-brand-neutral-600 text-sm flex items-start gap-2">
                            <Code className={`h-4 w-4 text-${tier.color} mt-0.5 flex-shrink-0`} />
                            <span>{tier.impact.projects}</span>
                          </li>
                          <li className="text-brand-neutral-600 text-sm flex items-start gap-2">
                            <Briefcase className={`h-4 w-4 text-${tier.color} mt-0.5 flex-shrink-0`} />
                            <span>{tier.impact.contracts}</span>
                          </li>
                          <li className="text-brand-neutral-600 text-sm flex items-start gap-2">
                            <Users className={`h-4 w-4 text-${tier.color} mt-0.5 flex-shrink-0`} />
                            <span>{tier.impact.maintainers}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
