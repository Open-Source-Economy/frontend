import React from "react";

import { Award, Heart, Users } from "lucide-react";
import { IndividualSupporterAvatar } from "./components/IndividualSupporterAvatar";
import { Button } from "../../../../components/ui/forms";
import { SponsorCard } from "./components/SponsorCard";
import type { IndividualSupporter, Sponsor, SponsorTier } from "./components/types";
import { isVisible } from "../../../../../ultils/featureVisibility";

const SPONSOR_TIER_ACCENT_COLORS = {
  Platinum: "var(--brand-tier-platinum)",
  Gold: "var(--brand-tier-gold)",
  Silver: "var(--brand-tier-silver)",
  Bronze: "var(--brand-tier-bronze)",
} as const;

const TIER_BASE_STYLES: Record<SponsorTier["tier"], Omit<SponsorTier, "tier" | "badge">> = {
  Platinum: {
    cardWidth: "w-full md:w-[400px]",
    cardPadding: "p-10",
    textSize: "text-2xl",
    descriptionSize: "text-base",
    descriptionLines: 3,
    accentColor: SPONSOR_TIER_ACCENT_COLORS.Platinum,
    iconType: "crown",
  },
  Gold: {
    cardWidth: "w-full md:w-[340px]",
    cardPadding: "p-8",
    textSize: "text-xl",
    descriptionSize: "text-sm",
    descriptionLines: 2,
    accentColor: SPONSOR_TIER_ACCENT_COLORS.Gold,
    iconType: "award",
  },
  Silver: {
    cardWidth: "w-full md:w-[280px]",
    cardPadding: "p-6",
    textSize: "text-lg",
    descriptionSize: "text-sm",
    descriptionLines: 2,
    accentColor: SPONSOR_TIER_ACCENT_COLORS.Silver,
    iconType: "star",
  },
  Bronze: {
    cardWidth: "w-full md:w-[220px]",
    cardPadding: "p-5",
    textSize: "text-base",
    accentColor: SPONSOR_TIER_ACCENT_COLORS.Bronze,
    iconType: "heart",
  },
};

type SponsorOverrides = Omit<Sponsor, keyof SponsorTier> & Partial<Omit<SponsorTier, "tier">>;

const createSponsor = (tier: SponsorTier["tier"], overrides: SponsorOverrides): Sponsor => ({
  tier,
  ...TIER_BASE_STYLES[tier],
  ...overrides,
});

interface PlatformSponsorsProps {
  className?: string;
  onBecomeSponsorClick?: () => void;
}

export function PlatformSponsors({ className = "" }: PlatformSponsorsProps) {
  // Platform sponsors with realistic companies supporting open source
  const sponsors: Sponsor[] = [
    // Platinum Tier - Largest, most prominent
    // createSponsor("Platinum", {
    //   name: "Vercel",
    //   domain: "vercel.com",
    //   badge: "Founding Sponsor",
    //   tagline: '"Empowering the open source ecosystem"',
    //   description: "Leading the charge in sustainable open source funding, helping connect enterprises with the maintainers they depend on.",
    //   ctaText: "Learn About Partnership",
    //   ctaUrl: "https://vercel.com",
    // }),
    // createSponsor("Platinum", {
    //   name: "GitHub",
    //   domain: "github.com",
    //   badge: "Founding Sponsor",
    //   tagline: '"Where the world builds software"',
    //   description: "Committed to supporting the maintainers and projects that power the software development ecosystem.",
    //   ctaText: "View Partnership",
    //   ctaUrl: "https://github.com",
    // }),

    // Gold Tier - Second tier prominence
    createSponsor("Gold", {
      name: "SwissBorg",
      domain: "swissborg.com",
      badge: "Founding Sponsor",
      tagline: "Great Scala-based ecosystem",
      description: "Europe’s #1 app for buying and selling crypto safely at low fees.",
      ctaText: "We are hiring",
      ctaUrl: "https://swissborg.com/careers",
    }),
    // createSponsor("Gold", {
    //   name: "Netlify",
    //   domain: "netlify.com",
    //   badge: "Premier Partner",
    //   tagline: "Powering modern web infrastructure",
    //   description: "Dedicated to supporting the open source projects that make the modern web possible.",
    //   ctaText: "Our Commitment",
    //   ctaUrl: "https://netlify.com",
    // }),
    // createSponsor("Gold", {
    //   name: "Shopify",
    //   domain: "shopify.com",
    //   badge: "Premier Partner",
    //   tagline: "Commerce for everyone",
    //   description: "Supporting the open source community that powers global commerce.",
    //   ctaText: "Partnership Details",
    //   ctaUrl: "https://shopify.com",
    // }),
    //
    // // Silver Tier - Third tier
    // createSponsor("Silver", {
    //   name: "Cloudflare",
    //   domain: "cloudflare.com",
    //   badge: "Corporate Sponsor",
    //   description: "Supporting infrastructure for a better Internet.",
    // }),
    // createSponsor("Silver", {
    //   name: "Twilio",
    //   domain: "twilio.com",
    //   badge: "Corporate Sponsor",
    //   description: "Building the future of communications with open source.",
    // }),
    // createSponsor("Silver", {
    //   name: "Supabase",
    //   domain: "supabase.com",
    //   badge: "Corporate Sponsor",
    //   description: "Open source Firebase alternative supporting open source.",
    // }),
    //
    // // Bronze Tier - Compact cards
    // createSponsor("Bronze", {
    //   name: "Linear",
    //   domain: "linear.app",
    // }),
    // createSponsor("Bronze", {
    //   name: "Render",
    //   domain: "render.com",
    // }),
    // createSponsor("Bronze", {
    //   name: "Railway",
    //   domain: "railway.app",
    // }),
  ];

  // Individual supporters
  const individualSupporters: IndividualSupporter[] = [
    { name: "Sarah Chen", initials: "SC", monthlyAmount: 50 },
    { name: "Michael Rodriguez", initials: "MR", monthlyAmount: 25 },
    { name: "Anonymous", initials: "A", isAnonymous: true, monthlyAmount: 100 },
    { name: "Emma Wilson", initials: "EW", monthlyAmount: 15 },
    { name: "David Kim", initials: "DK", monthlyAmount: 30 },
    { name: "Anonymous", initials: "A", isAnonymous: true, monthlyAmount: 75 },
    { name: "Lisa Anderson", initials: "LA", monthlyAmount: 20 },
    { name: "James Brown", initials: "JB", monthlyAmount: 40 },
  ];

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-brand-neutral-900 mb-4">Supported By Leading Organizations</h2>
            <p className="text-brand-neutral-600">These organizations are investing in the future of sustainable open source development</p>
          </div>

          {/* All Sponsors - Mixed Sizes for Visual Hierarchy */}
          <div className="flex flex-wrap justify-center items-start gap-8">
            {sponsors.map((sponsor, idx) => (
              <SponsorCard key={idx} sponsor={sponsor} />
            ))}
          </div>

          {/* Individual Supporters Section */}
          {individualSupporters.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-brand-neutral-900 mb-2">Individual Supporters</h3>
                <p className="text-brand-neutral-600">Community members making a difference</p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4">
                {individualSupporters.map((supporter, idx) => (
                  <IndividualSupporterAvatar
                    key={idx}
                    name={supporter.name}
                    initials={supporter.initials}
                    avatarUrl={supporter.avatarUrl}
                    isAnonymous={supporter.isAnonymous}
                    monthlyAmount={supporter.monthlyAmount}
                  />
                ))}
              </div>
            </div>
          )}

          {isVisible("becomeASponsor") && (
            <>
              {/*CTA Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-card-blue via-brand-card-blue-dark to-brand-secondary border-2 border-brand-neutral-300 rounded-3xl p-10 md:p-12">
                {/* Subtle glow effects */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-4xl mx-auto relative z-10">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 px-4 py-2 rounded-full mb-4">
                      <Heart className="h-4 w-4 text-brand-accent" />
                      <span className="text-brand-accent text-sm uppercase tracking-wider">Join Our Community</span>
                    </div>
                    <h3 className="text-brand-neutral-950 mb-4">Become a Sponsor</h3>
                    <p className="text-brand-neutral-600 text-lg max-w-2xl mx-auto">
                      Join these organizations in supporting the sustainable development of open source software. Your sponsorship directly enables maintainers
                      to dedicate time to the projects enterprises depend on.
                    </p>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="group bg-gradient-to-br from-brand-card-blue-light to-brand-card-blue border border-brand-neutral-300 rounded-2xl p-6 hover:border-brand-success/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-success/20 hover:scale-105">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div
                          className="p-4 bg-gradient-to-br from-brand-success/20 to-brand-success/5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{
                            boxShadow: "0 8px 24px -8px rgba(16, 185, 129, 0.4)",
                          }}
                        >
                          <Heart className="h-8 w-8 text-brand-success" />
                        </div>
                        <div>
                          <h4 className="text-brand-neutral-900 mb-2">Support Sustainability</h4>
                          <p className="text-brand-neutral-600 text-sm">Enable maintainers to focus on the projects your enterprise relies on</p>
                        </div>
                      </div>
                    </div>

                    <div className="group bg-gradient-to-br from-brand-card-blue-light to-brand-card-blue border border-brand-neutral-300 rounded-2xl p-6 hover:border-brand-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/20 hover:scale-105">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div
                          className="p-4 bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{
                            boxShadow: "0 8px 24px -8px rgba(255, 127, 80, 0.4)",
                          }}
                        >
                          <Award className="h-8 w-8 text-brand-accent" />
                        </div>
                        <div>
                          <h4 className="text-brand-neutral-900 mb-2">Brand Visibility</h4>
                          <p className="text-brand-neutral-600 text-sm">Showcase your commitment to open source across our platform</p>
                        </div>
                      </div>
                    </div>

                    <div className="group bg-gradient-to-br from-brand-card-blue-light to-brand-card-blue border border-brand-neutral-300 rounded-2xl p-6 hover:border-brand-highlight/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-highlight/20 hover:scale-105">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div
                          className="p-4 bg-gradient-to-br from-brand-highlight/20 to-brand-highlight/5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{
                            boxShadow: "0 8px 24px -8px rgba(218, 165, 32, 0.4)",
                          }}
                        >
                          <Users className="h-8 w-8 text-brand-highlight" />
                        </div>
                        <div>
                          <h4 className="text-brand-neutral-900 mb-2">Direct Access</h4>
                          <p className="text-brand-neutral-600 text-sm">Priority communication channels with maintainers and platform team</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button Section */}
                  <div className="text-center">
                    <Button size="lg" className="gap-2 px-8 py-6 text-lg shadow-2xl hover:shadow-brand-accent/40 transition-all duration-300 hover:scale-105">
                      <Heart className="h-5 w-5" />
                      Explore Sponsorship Tiers
                    </Button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-brand-neutral-500">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-neutral-400" />
                      <p className="text-sm">Sponsorship tiers from $500/month • Custom enterprise partnerships available</p>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
