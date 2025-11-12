import React from "react";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Clock, ExternalLink, GitBranch, Heart, Sparkles, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "../../components/ui/forms";

interface HeroBisProps {
  projectName: string;
  totalPotBalance: number;
  monthlyContributions: number;
  monthlyDistributions: number;
  totalContributors: number;
  totalRecipients: number;
  activeRequests: number;
  fundedRequests: number;
}

export function HeroBis(props: HeroBisProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary-dark via-brand-neutral-100 to-brand-card-blue pt-24 pb-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-highlight/10 rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button className="inline-flex items-center gap-2 text-sm text-brand-neutral-600 hover:text-brand-neutral-800 mb-6 transition-colors">
            ← Back to Projects
          </button>

          <div className="flex items-start justify-between gap-8 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-accent-dark rounded-xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-brand-neutral-900 mb-1">{props.projectName} Common Pot</h1>
                  <p className="text-sm text-brand-neutral-600">Community-funded development pool</p>
                </div>
              </div>

              <p className="text-brand-neutral-700 max-w-2xl">
                The Common Pot is funded by service providers who earn from enterprise contracts. These funds support maintainers and contributors working on
                community-benefiting features that wouldn't otherwise be funded.
              </p>

              {/* Project Statistics */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-brand-neutral-600">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>220k stars</span>
                </div>

                <span className="text-brand-neutral-400">·</span>

                <div className="flex items-center gap-1.5">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>20M+ weekly</span>
                </div>

                <span className="text-brand-neutral-400">·</span>

                <div className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>v18.2.0</span>
                </div>

                <span className="text-brand-neutral-400">·</span>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MIT</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Button
                  // onClick={() => onNavItemClick('contact')}
                  className="bg-gradient-to-r from-brand-highlight to-brand-warning text-white hover:opacity-90"
                  size="lg"
                >
                  Schedule Consultation
                </Button>

                <Button
                  // onClick={() => onNavItemClick('sponsorship')}
                  variant="outline"
                  size="lg"
                  className="border-brand-neutral-300 text-brand-neutral-900 hover:bg-brand-card-blue-light"
                >
                  Support This Project
                </Button>

                <button
                  onClick={() => window.open("https://github.com/facebook/react", "_blank")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-neutral-600 hover:text-brand-neutral-700 transition-colors cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => window.open("https://react.dev", "_blank")}
                  className="inline-flex items-center gap-2 px-4 py-2 text-brand-neutral-700 hover:text-brand-neutral-900 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Documentation</span>
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-brand-neutral-600 mb-1">Current Balance</div>
              <div className="text-3xl text-brand-neutral-900">${props.totalPotBalance.toLocaleString()}</div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-brand-success">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+${props.monthlyContributions.toLocaleString()}/mo</span>
                </div>
                <span className="text-xs text-brand-neutral-500">·</span>
                <div className="flex items-center gap-1 text-xs text-brand-neutral-600">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-${props.monthlyDistributions.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-brand-card-blue/50 backdrop-blur-sm rounded-xl p-4 border border-brand-neutral-300/10">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-brand-accent" />
                <TrendingUp className="w-4 h-4 text-brand-success" />
              </div>
              <div className="text-2xl text-brand-neutral-900 mb-1">{props.totalContributors}</div>
              <div className="text-xs text-brand-neutral-600">Service Providers</div>
            </div>

            <div className="bg-brand-card-blue/50 backdrop-blur-sm rounded-xl p-4 border border-brand-neutral-300/10">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-5 h-5 text-brand-highlight" />
                <CheckCircle2 className="w-4 h-4 text-brand-success" />
              </div>
              <div className="text-2xl text-brand-neutral-900 mb-1">{props.totalRecipients}</div>
              <div className="text-xs text-brand-neutral-600">Active Recipients</div>
            </div>

            <div className="bg-brand-card-blue/50 backdrop-blur-sm rounded-xl p-4 border border-brand-neutral-300/10">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-brand-success" />
                <Clock className="w-4 h-4 text-brand-warning" />
              </div>
              <div className="text-2xl text-brand-neutral-900 mb-1">{props.activeRequests}</div>
              <div className="text-xs text-brand-neutral-600">Pending Requests</div>
            </div>

            <div className="bg-brand-card-blue/50 backdrop-blur-sm rounded-xl p-4 border border-brand-neutral-300/10">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-5 h-5 text-brand-success" />
                <Sparkles className="w-4 h-4 text-brand-accent" />
              </div>
              <div className="text-2xl text-brand-neutral-900 mb-1">{props.fundedRequests}</div>
              <div className="text-xs text-brand-neutral-600">Funded Projects</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
