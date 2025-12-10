import React from "react";
import { Link } from "react-router-dom";
import { DonationCard } from "./components/DonationCard";
import { ArrowRight, Briefcase, Code, Globe, Heart, Package, Target, TrendingUp, Users } from "lucide-react";
import { PageWrapper } from "../PageWrapper";
import { paths } from "src/paths";
import { isVisible } from "src/ultils/featureVisibility";

export function SponsorshipPage() {
  const fundingTiers = [
    {
      id: 1,
      title: "Foundation",
      icon: Target,
      goal: 500,
      color: "brand-success",
      covers: [
        "Server hosting & infrastructure",
        "Deployment & monitoring tools",
        "Business outreach tools (LinkedIn, email)",
        "Domain, SSL & essential services",
      ],
      impact: {
        projects: "~5 projects/month onboarded",
        contracts: "~€2K/month in new contracts",
        maintainers: "~10 maintainers connected with funding",
      },
    },
    {
      id: 2,
      title: "Scale",
      icon: Users,
      goal: 4000,
      color: "brand-accent",
      covers: [
        "Everything in Foundation tier",
        "First full-time team member (operations/biz dev)",
        "Enhanced platform features",
        "Dedicated maintainer support",
      ],
      impact: {
        projects: "~20 projects/month onboarded",
        contracts: "~€15K/month in new contracts",
        maintainers: "~50 maintainers connected with funding",
      },
      founder: {
        name: "Foundation Founder Name",
        role: "Founder & Executive Director",
        image:
          "https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmb3VuZGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0Njc0MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    },
    {
      id: 3,
      title: "Ecosystem",
      icon: Briefcase,
      goal: 10000,
      color: "brand-highlight",
      covers: [
        "Everything in Scale tier",
        "Expand to 2-3 team members",
        "Direct maintainer grants program",
        "Developer advocacy & ecosystem building",
        "Regional community support",
      ],
      impact: {
        projects: "~50 projects/month onboarded",
        contracts: "~€50K/month in new contracts",
        maintainers: "~150 maintainers funded monthly",
      },
    },
  ];

  const impactStats = [
    {
      icon: Code,
      value: "2,500+",
      label: "Maintainers Supported",
      description: "Active open source developers receiving funding",
    },
    {
      icon: Package,
      value: "10,000+",
      label: "Projects Funded",
      description: "Critical open source projects sustained",
    },
    {
      icon: Globe,
      value: "$2.5M+",
      label: "Distributed Annually",
      description: "Directly to maintainers and projects",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Goes to Developers",
      description: "Only 5% for platform operations",
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-navy overflow-x-hidden">
        <div className="w-full mx-auto px-4 pt-0 pb-8 max-w-[1400px]">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_440px] gap-8 items-start pt-16">
            {/* LEFT COLUMN - Scrollable Content */}
            <div className="space-y-0 min-w-0 order-2 md:order-1">
              {/* Hero & Mission Section */}
              <section className="relative border-b border-brand-neutral-300 pb-20">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 px-5 py-2.5 rounded-full mb-8 shadow-lg shadow-brand-accent/10">
                    <Heart className="h-4 w-4 text-brand-accent" />
                    <span className="text-brand-accent text-sm uppercase tracking-wider">Individual Support</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-brand-neutral-950 mb-6 leading-tight">Fund the Infrastructure for Sustainable Open Source</h1>

                  {/* Description */}
                  <p className="text-brand-neutral-600 text-xl leading-relaxed mb-10">
                    Help us build the platform that secures enterprise contracts for open source maintainers. Your donation supports Open Source Economy
                    operations, enabling us to connect more developers with sustainable funding.
                  </p>

                  {/* Trust Indicator */}
                  {/* Proverb Callout */}
                  <div className="relative mb-12 p-4 md:p-6 bg-gradient-to-br from-brand-accent/3 via-brand-highlight/2 to-transparent border border-brand-accent/5 rounded-2xl">
                    <div className="absolute top-0 left-6 md:left-10 -translate-y-1/2">
                      <div className="bg-brand-navy px-3 md:px-4 py-1.5 rounded-full border border-brand-accent/10">
                        <Heart className="h-4 w-4 md:h-5 md:w-5 text-brand-accent/40" />
                      </div>
                    </div>
                    <blockquote className="text-center pt-2">
                      <p className="text-lg md:text-xl text-brand-neutral-600/80 italic leading-relaxed">
                        "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime."
                      </p>
                    </blockquote>
                  </div>

                  {/* Section Divider */}
                  <div className="flex items-center gap-3 md:gap-4 mb-12 w-full">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-neutral-300 to-transparent min-w-0"></div>
                    <span className="text-xs md:text-sm uppercase tracking-wider text-brand-neutral-500 whitespace-nowrap">Our Approach</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-neutral-300 to-transparent min-w-0"></div>
                  </div>

                  {/* Mission Explanation */}
                  <div className="space-y-8 text-brand-neutral-600 text-lg leading-relaxed">
                    <p className="text-xl">
                      <strong className="text-brand-neutral-900">We're not here to beg for donations for open source projects.</strong> Instead, we're building
                      a sustainable system that allows maintainers to get funding for their open source work.
                    </p>

                    <p>
                      While FOSS development thrives as commons, its economic foundation remains largely privatized. The open-source services market—
                      <strong className="text-brand-neutral-800">$27B in 2022, projected to reach $44B by 2027</strong>—is controlled by private enterprises,
                      with disproportionately small amounts flowing back to the commons.
                    </p>

                    <p>
                      When funds do flow back, they only reach top-level visible projects, not the foundational dependencies maintained by volunteers. This
                      creates resource mismatches that disadvantage commons-based solutions, especially in user-facing domains where sustained support and
                      polish determine adoption.
                    </p>

                    <p className="text-xl">
                      <strong className="text-brand-neutral-900">Our nonprofit initiative introduces a new building block for the internet commons:</strong>{" "}
                      sustainable funding infrastructure that ensures maintainers at all levels—from visible projects to critical dependencies—can continue
                      their essential work.
                    </p>

                    {isVisible("sponsorshipMissionLink") && (
                      <div className="pt-6">
                        <Link
                          to={paths.MISSION}
                          className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent-hover transition-all duration-200 hover:gap-3 group cursor-pointer"
                        >
                          <span className="border-b border-brand-accent/30 group-hover:border-brand-accent-hover">Learn more about our mission</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/*/!* Monthly Funding Goals Section *!/*/}
              {/*<div className="py-16 border-b border-brand-neutral-300">*/}
              {/*  <MonthlyFundingGoals currentMonthlyDonations={currentMonthlyDonations} tiers={fundingTiers} />*/}
              {/*</div>*/}

              {/*/!* Impact Stats Section *!/*/}
              {/*<section className="relative py-16">*/}
              {/*  <div className="max-w-4xl">*/}
              {/*    <div className="mb-12">*/}
              {/*      <h2 className="text-brand-neutral-900 mb-4">Platform Impact</h2>*/}
              {/*      <p className="text-brand-neutral-600 text-lg">*/}
              {/*        Through enterprise contracts, we're creating sustainable funding for open source*/}
              {/*      </p>*/}
              {/*    </div>*/}

              {/*    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
              {/*      {impactStats.map((stat, idx) => {*/}
              {/*        const IconComponent = stat.icon;*/}
              {/*        return (*/}
              {/*          <Card key={idx} className="border-2 border-brand-neutral-300 bg-gradient-to-br from-brand-card-blue-light to-brand-card-blue text-center">*/}
              {/*            <CardContent className="p-6">*/}
              {/*              <IconComponent className="h-8 w-8 text-brand-accent mx-auto mb-3" />*/}
              {/*              <div className="text-4xl text-brand-neutral-950 mb-2">{stat.value}</div>*/}
              {/*              <div className="text-brand-neutral-900 mb-2">{stat.label}</div>*/}
              {/*              <p className="text-brand-neutral-600 text-sm">*/}
              {/*                {stat.description}*/}
              {/*              </p>*/}
              {/*            </CardContent>*/}
              {/*          </Card>*/}
              {/*        );*/}
              {/*      })}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</section>*/}
            </div>

            {/* RIGHT COLUMN - Sticky Donation Card */}
            <DonationCard className="md:sticky md:top-0 md:self-start w-full min-w-0 order-1 md:order-2 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto custom-scrollbar" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
