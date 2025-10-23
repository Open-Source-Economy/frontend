import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { FileText, Leaf } from "lucide-react";
import { HeroSection } from "src/views/pages/home/sections/hero/HeroSection";
import { WhatIsOpenSourceEconomy } from "src/views/pages/home/sections/WhatIsOpenSourceEconomy";
import { HowItWorksSimple } from "src/views/pages/home/sections/HowItWorksSimple";
import { WinWinWinPartnership } from "src/views/pages/home/sections/WinWinWinPartnership";
import { ProjectsShowcaseCompact } from "src/views/pages/home/sections/ProjectsShowcaseCompact";
import { UniqueSellingPoints } from "src/views/pages/home/sections/UniqueSellingPoints";
import { laurianeCalLink } from "src/views/v1/data";

interface HomeProps {}

export function HomePage(props: HomeProps) {
  return (
    <PageWrapper>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-neutral-100 via-brand-secondary to-brand-secondary-dark">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-highlight/15 rounded-full blur-3xl opacity-50" />
        <HeroSection
          badge="Sustainable Open Source Partnerships"
          headline="Connect with Maintainers Who Power Your Stack"
          description="Get the services you need (support, advisory, bug fixes, and more) directly from core maintainers, under a single enterprise contract. Empower your team while sustaining the open source projects you rely on."
          actions={[
            { text: "Schedule Demo", variant: "default" as const, icon: true, href: laurianeCalLink, external: true },
            // { text: "Schedule Demo", variant: "outline" as const },
          ]}
          trustIndicators={[
            { icon: Leaf, text: "Ethical and Transparent" },
            { icon: FileText, text: "NDAs & SLAs Available" },
            // { icon: CheckCircle, text: "SLAs" },
            // { icon: Globe2, text: "Global Maintainer Network" },
            // { icon: Headphones, text: "Dedicated Support Channels" }
          ]}
          layout={"photo"}
        />
      </section>

      {/* What is Open Source Economy - Educational Foundation */}
      <WhatIsOpenSourceEconomy className="bg-gradient-to-br from-brand-secondary-dark via-brand-neutral-100 to-brand-card-blue" />

      {/* How It Works Simple - Process Overview with Navy Base */}
      <HowItWorksSimple className="bg-gradient-to-b from-brand-card-blue via-brand-secondary to-brand-neutral-200" headerVisibility="normal" />

      {/* Win-Win-Win Partnership - Value Proposition */}
      <WinWinWinPartnership className="bg-gradient-to-br from-brand-neutral-200 via-brand-secondary to-brand-card-blue-dark" />

      {/*/!* Fund Distribution - Transparency with Semantic Green Accents *!/*/}
      {/*<div className="relative overflow-hidden bg-gradient-to-b from-brand-card-blue-dark via-brand-secondary to-brand-neutral-100">*/}
      {/*  <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-success/15 rounded-full blur-3xl opacity-40" />*/}
      {/*  <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-success/10 rounded-full blur-2xl opacity-30" />*/}
      {/*  <FundDistributionMinimal />*/}
      {/*</div>*/}

      {/* Featured Projects - Portfolio Showcase with Deep Navy */}
      <ProjectsShowcaseCompact
        // onNavigateToProjects={() => setCurrentPage('projects')}
        // onViewProject={(slug) => {
        //   setCurrentProjectSlug(slug);
        //   setCurrentPage('project-detail');
        // }}
        className="bg-gradient-to-br from-brand-neutral-100 via-brand-secondary-dark to-brand-card-blue"
      />

      {/* Unique Selling Points - Differentiation with Warm Accents */}
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-secondary-dark via-brand-neutral-100 to-brand-card-blue">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-accent/8 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-brand-highlight/8 rounded-full blur-3xl opacity-40" />
        <UniqueSellingPoints />
      </div>

      {/* Transform CTA - Primary Conversion with Warm Brand Glow */}
      {/*<div className="relative overflow-hidden bg-gradient-to-br from-brand-secondary-dark via-brand-neutral-100 to-brand-card-blue">*/}
      {/*  <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl opacity-50" />*/}
      {/*  <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-highlight/20 rounded-full blur-3xl opacity-50" />*/}
      {/*  <TransformCTASection*/}
      {/*  // onGetStarted={() => setCurrentPage('role-selection')}*/}
      {/*  // onScheduleDemo={() => setCurrentPage('contact')}*/}
      {/*  />*/}
      {/*</div>*/}
    </PageWrapper>
  );
}
