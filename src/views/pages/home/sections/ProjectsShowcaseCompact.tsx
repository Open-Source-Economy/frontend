import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/views/components/ui/forms/button";
import { SectionHeader } from "src/views/components/ui/section/section-header";
import { ArrowRight } from "lucide-react";
import { ProjectItemWithDetails, ProjectItemSortField, SortOrder } from "@open-source-economy/api-types";
import { ProjectItemWithDetailsCompanion, ProjectStats } from "src/ultils/companions/ProjectItemWithDetails.companion";
import { ProjectCard } from "src/views/pages/projects/components/ProjectCard";
import { PlatformStats } from "src/views/pages/projects/components/PlatformStats";
import { ApiError } from "src/ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "src/ultils";
import { getBackendAPI } from "src/services";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { paths } from "src/paths";

interface ProjectsShowcaseCompactProps {
  title?: string;
  description?: string;
  maxProjects?: number;
  className?: string;
}

/** Semantic-only content (no Tailwind classes here) */
const projectsShowcaseContent = {
  hero: {
    title: "Featured Maintainers & Their Projects",
    description:
      "Meet the maintainers behind the open source technologies your business relies on. Each project is represented by the experts who build, maintain, and support it—available for enterprise collaboration under one contract.",
  },
  loading: {
    title: "Loading…",
  },
  error: {
    title: "Failed to load data",
  },
  cta: {
    browseAll: "Browse All Projects",
    requestCustom: "Request Custom Project",
    bottomTitleStart: "Ready to explore ",
    bottomTitleHighlight: "all projects",
    bottomTitleEnd: "?",
    bottomSubtitle: "Discover hundreds of open source projects with comprehensive filtering, search capabilities, and detailed maintainer insights.",
  },
} as const;

/* ---------- Small helpers (UI only) ---------- */

function LoadingBlock() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="p-6 bg-brand-neutral-50/50 border border-border rounded-lg">
          <p className="text-brand-neutral-700 font-semibold mb-2">{projectsShowcaseContent.loading.title}</p>
          <div className="flex justify-center">
            <svg
              className="animate-spin h-5 w-5 text-brand-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-label="Loading"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorBlock({ error, onRetry }: { error: ApiError; onRetry: () => void }) {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto">
        <ServerErrorAlert error={error} title={projectsShowcaseContent.error.title} showRetry onRetry={onRetry} />
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export function ProjectsShowcaseCompact(props: ProjectsShowcaseCompactProps) {
  const api = useMemo(() => getBackendAPI(), []);

  const title = props.title ?? projectsShowcaseContent.hero.title;
  const description = props.description ?? projectsShowcaseContent.hero.description;
  const maxProjects = props.maxProjects ?? 6;

  const [projectItems, setProjectItems] = useState<ProjectItemWithDetails[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const fetchProjectItems = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);

    const apiCall = async () => {
      const response = await api.getProjectItemsWithDetails(
        {},
        {
          sortBy: ProjectItemSortField.STARGAZERS,
          sortOrder: SortOrder.DESC,
          limit: maxProjects,
        },
      );
      if (response instanceof ApiError) throw response;
      return response as dto.GetProjectItemsWithDetailsResponse;
    };

    const onSuccess = (response: dto.GetProjectItemsWithDetailsResponse) => {
      setProjectItems(response.projectItems);
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  }, [api, maxProjects]);

  useEffect(() => {
    fetchProjectItems();
  }, [fetchProjectItems]);

  const stats: ProjectStats = useMemo(() => {
    if (!projectItems) {
      return { totalProjects: 0, totalStars: "0", totalForks: "0", totalMaintainers: 0 };
    }
    return ProjectItemWithDetailsCompanion.getProjectItemsStats(projectItems);
  }, [projectItems]);

  return (
    <section className={`py-16 md:py-24 transition-all duration-1000 ease-in-out ${props.className ?? ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionHeader title={title} description={description} />
        </div>

        {/* Loading State */}
        {isLoading && <LoadingBlock />}

        {/* Error State */}
        {apiError && !isLoading && <ErrorBlock error={apiError} onRetry={fetchProjectItems} />}

        {/* Projects Grid - Compact Version */}
        {!isLoading && !apiError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(projectItems || []).map(item => (
                <ProjectCard key={ProjectItemWithDetailsCompanion.getProjectId(item)} item={item} category="Featured" />
              ))}
            </div>

            {/* Call to Action with Stats */}
            <div className="text-center rounded-2xl p-8 border border-brand-accent/20">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-semibold">
                    {projectsShowcaseContent.cta.bottomTitleStart}
                    <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-highlight bg-clip-text text-transparent">
                      {projectsShowcaseContent.cta.bottomTitleHighlight}
                    </span>
                    {projectsShowcaseContent.cta.bottomTitleEnd}
                  </h3>
                  <p className="text-muted-foreground text-lg">{projectsShowcaseContent.cta.bottomSubtitle}</p>
                </div>

                {/* Stats Integration */}
                <PlatformStats projectStats={stats} variant="showcase" />

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to={paths.PROJECTS}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-accent to-brand-accent-dark hover:from-brand-accent-dark hover:to-brand-accent text-white shadow-lg"
                    >
                      {projectsShowcaseContent.cta.browseAll}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  {/*<Button*/}
                  {/*  size="lg"*/}
                  {/*  variant="outline"*/}
                  {/*  className="border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10"*/}
                  {/*  onClick={() => {*/}
                  {/*    // In a real app, this would navigate to a custom search or request page*/}
                  {/*    console.log("Request custom project");*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  {projectsShowcaseContent.cta.requestCustom}*/}
                  {/*</Button>*/}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
