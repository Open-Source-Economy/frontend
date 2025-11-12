import React, { useMemo, useState } from "react";
import { Award, Calendar, Clock, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";

import { PageWrapper } from "../PageWrapper";
import { SectionHeader } from "../../components/ui/section/section-header";
import { ProjectHero } from "./sections/ProjectHero";
import { buttonVariants } from "../../components/ui/forms";
import { ExternalLink } from "../../components/ui/forms/ExternalLink";
import { MaintainersSection } from "./sections/MaintainersSection";
import { ProjectServiceOffering, ServiceCategoryCard, ServiceOffering } from "./components/ServiceCategoryCard";
import type * as dto from "@open-source-economy/api-types";
import { ServiceType } from "@open-source-economy/api-types";
import { LoadingState } from "../../components/ui/state/loading-state";
import { ServerErrorAlert } from "../../components/ui/state/ServerErrorAlert";
import { ProjectItemDetailsCompanion } from "src/ultils/companions/ProjectItemDetails.companion";
import { useProjectDetails } from "./hooks/useProjectDetails";
import { TrustIndicatorGroup, type TrustIndicatorItem } from "./components/TrustIndicators";
import { getProjectDisclaimer } from "./data/projectDisclaimers";
import { laurianeCalLink } from "../../v1/data";
import { cn } from "../../components/utils";
import { ServiceTypeCompanion } from "src/ultils/companions";
import { FundDistributionVisualization } from "./sections/FundDistributionVisualization";

type ServiceOfferingByCategory = Map<ServiceType, ServiceOffering[]>;

export function ProjectDetailPage() {
  const params = useParams<{ ownerParam?: string; repoParam?: string }>();
  const [showAllMaintainers, setShowAllMaintainers] = useState(false);
  const [expandedServiceCategories, setExpandedServiceCategories] = useState<Set<ServiceType>>(new Set());

  const owner = params.ownerParam;
  const repo = params.repoParam;

  const { developers, projectDetails, services, serviceOfferings, isLoading, apiError } = useProjectDetails(owner, repo);

  const serviceCategories = useMemo<ServiceOfferingByCategory>(() => {
    return buildServiceCategories(services, serviceOfferings);
  }, [services, serviceOfferings]);

  const projectName = useMemo(() => {
    const fallbackName = owner && repo ? `${owner}/${repo}` : owner ?? repo ?? "";

    if (!projectDetails) {
      return fallbackName;
    } else {
      return ProjectItemDetailsCompanion.getDisplayName(projectDetails) ?? fallbackName;
    }
  }, [projectDetails, owner, repo]);

  const ctaTrustIndicators = useMemo<TrustIndicatorItem[]>(() => {
    return [
      { icon: ShieldCheck, label: "NDA Available", tone: "accent" },
      { icon: Clock, label: "SLA Guarantees", tone: "accent" },
      { icon: Award, label: "Brand Recognition Benefits", tone: "accent" },
    ];
  }, []);

  const projectDisclaimer = useMemo(() => getProjectDisclaimer(projectDetails, projectName), [projectDetails, projectName]);

  const toggleServiceCategory = (categoryId: ServiceType) => {
    setExpandedServiceCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <PageWrapper>
      {/*/!* Back Button *!/*/}
      {/*<div className="container mx-auto px-4 py-6 max-w-6xl">*/}
      {/*  <Button asChild variant="ghost" className="text-brand-neutral-700 hover:text-brand-accent">*/}
      {/*    <Link to={paths.PROJECTS}>*/}
      {/*      <ArrowLeft className="mr-2 h-4 w-4" />*/}
      {/*      Back to Projects*/}
      {/*    </Link>*/}
      {/*  </Button>*/}
      {/*</div>*/}

      {/* Hero */}
      {projectDetails && <ProjectHero project={projectDetails} />}

      <div className="container mx-auto max-w-6xl px-4">
        {isLoading && (
          <div className="mb-4">
            <LoadingState variant="spinner" size="md" message="Loading latest project details..." />
          </div>
        )}

        {apiError && (
          <ServerErrorAlert
            error={apiError}
            title="Unable to load live project details right now."
            message="Please try again later or refresh the page."
            className="mb-4"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        {/* Maintainers */}
        <MaintainersSection
          developers={developers}
          projectName={projectName}
          showAllMaintainers={showAllMaintainers}
          onToggleShowAll={() => setShowAllMaintainers(prev => !prev)}
        />

        {/* Team Services */}
        <section id="consultation">
          <SectionHeader
            title="Professional Services from Expert Maintainers"
            description="Get enterprise-grade support directly from the team that built and maintains this project"
            spacing="lg"
            visibility="normal"
          />

          {/* Trust Indicators */}
          <TrustIndicatorGroup items={ctaTrustIndicators} variant="card" className="mb-8" />

          {/* Service Categories - Accordion Pattern */}
          <div className="space-y-4">
            {Array.from(serviceCategories.entries()).map(([category, offerings]) => {
              if (offerings.length === 0) {
                return null;
              }

              const categoryInfo = ServiceTypeCompanion.info(category);

              return (
                <ServiceCategoryCard
                  key={category}
                  categoryServiceTypeInfo={categoryInfo}
                  serviceOfferings={offerings}
                  isExpanded={expandedServiceCategories.has(category)}
                  onToggle={() => toggleServiceCategory(category)}
                />
              );
            })}
          </div>
        </section>

        {/* Get Started CTA */}
        <section
          id="donation"
          className="relative left-1/2 right-1/2 -mx-[50vw] w-screen py-20 border-t border-border bg-gradient-to-br from-brand-card-blue via-brand-card-blue-light to-brand-accent/5"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center bg-brand-card-blue-dark/50 border border-brand-accent/20 rounded-2xl p-16 shadow-lg shadow-brand-accent/10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-accent/10 border border-brand-accent/30 mb-8">
                <Calendar className="w-10 h-10 text-brand-accent" />
              </div>

              <h2 className="text-brand-neutral-950 mb-6">Work Directly with Expert Maintainers</h2>
              <p className="text-brand-neutral-700 mb-8 max-w-2xl mx-auto">
                Get expert guidance, custom development, and enterprise support tailored to your organization's needs. All services include flexible terms and
                transparent pricing.
              </p>

              {/* Trust Indicators */}
              <TrustIndicatorGroup items={ctaTrustIndicators} variant="badge" className="mb-12" />

              {/* Primary CTA */}
              <ExternalLink href={laurianeCalLink} underline={false} className={cn(buttonVariants({ size: "lg" }))}>
                Schedule a Consultation
              </ExternalLink>

              <p className="text-brand-neutral-600 text-sm mt-4">Discuss your needs and get a custom quote for your organization</p>
            </div>
          </div>
        </section>

        {/* Fund Distribution */}
        <section>
          <FundDistributionVisualization
            distribution={{
              serviceProvider: 55,
              openSourceEconomy: 20,
              project: 20,
              dependencies: 5,
            }}
            projectName={projectName}
          />
        </section>

        {projectDisclaimer && (
          <section className="bg-brand-card-blue border border-brand-neutral-300 rounded-xl p-6">
            <p className="text-brand-neutral-600 text-sm text-center max-w-4xl mx-auto">{projectDisclaimer}</p>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}

// TODO: probably to complicated, need to check what it does exactly
function buildServiceCategories(availableServices: dto.Service[], serviceOfferings: Record<string, ProjectServiceOffering[]>): ServiceOfferingByCategory {
  const offeringsByCategory: ServiceOfferingByCategory = new Map();
  if (availableServices.length === 0) {
    return offeringsByCategory;
  }

  for (const service of availableServices) {
    const serviceId = service.id.uuid;
    const offerings = serviceOfferings[serviceId] ?? [];
    if (offerings.length === 0) {
      continue;
    }

    const category = service.serviceType;
    const existing = offeringsByCategory.get(category);
    const entry: ServiceOffering = { service, offerings };

    if (existing) {
      existing.push(entry);
    } else {
      offeringsByCategory.set(category, [entry]);
    }
  }

  return offeringsByCategory;
}
