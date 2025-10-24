import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PlatformStats } from "src/views/pages/projects/components/PlatformStats";
import { ProjectSearchBar } from "src/views/pages/projects/components/ProjectSearchBar";
import { ProjectCategorySection } from "src/views/pages/projects/sections/ProjectCategorySection";
import { PageWrapper } from "src/views/pages/PageWrapper";
import * as dto from "@open-source-economy/api-types";
import { ProjectCategory, ProjectItemWithDetails } from "@open-source-economy/api-types";
import { ProjectItemWithDetailsCompanion, ProjectStats } from "src/ultils/companions/ProjectItemWithDetails.companion";
import { NumberUtils } from "src/ultils/NumberUtils";
import { ApiError } from "src/ultils/error/ApiError";
import { handleApiCall } from "src/ultils";
import { getBackendAPI } from "src/services";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

// ------------------------------------
// Content (semantic only, no Tailwind)
// ------------------------------------
export const projectsPageContent = {
  hero: {
    title: "Meet the Maintainers Powering Open Source",
    subtitle:
      "Every project you see here is represented by its maintainers—the experts who keep it running. Connect, collaborate, and support them directly through Open Source Economy.",
  },
  loading: {
    spinnerAria: "Loading…",
    text: "Loading projects...",
  },
  error: {
    title: "Error loading data",
    fallback: "An unexpected error occurred",
  },
  search: {
    placeholder: "Search projects...",
  },
  results: {
    nonePrefix: "No projects found",
    matching: "matching",
    inLabel: "in",
    projectSingular: "project",
    projectPlural: "projects",
  },
  sections: {
    statsDividerLabel: "Platform statistics",
  },
} as const;

// ------------------------------------
// Helpers & mappings (logic only)
// ------------------------------------
const CATEGORY_KEYWORDS: Record<ProjectCategory, string[]> = {
  [ProjectCategory.FrontendFramework]: ["react", "vue", "angular", "svelte"],
  [ProjectCategory.Infrastructure]: ["kubernetes", "docker", "terraform", "ansible"],
  [ProjectCategory.MachineLearning]: ["tensorflow", "pytorch", "scikit-learn"],
  [ProjectCategory.Database]: ["postgresql", "redis", "mongodb", "elasticsearch"],
  [ProjectCategory.Runtime]: ["node", "deno"],
  [ProjectCategory.ProgrammingLanguage]: ["rust", "python", "go"],
  [ProjectCategory.Security]: ["openssl", "oauth2-proxy"],
  // Fallbacks handled below
};

function getProjectCategory(item: ProjectItemWithDetails): ProjectCategory | null {
  const repoName = item.repository?.id.name.toLowerCase() || "";
  const projectId = ProjectItemWithDetailsCompanion.getProjectId(item);

  if (projectId === "linux-foundation") return ProjectCategory.Infrastructure; // URL-type special case

  for (const [cat, list] of Object.entries(CATEGORY_KEYWORDS) as [ProjectCategory, string[]][]) {
    if (list.includes(repoName)) return cat;
  }
  return null; // No category assigned
}

// ------------------------------------
// Component
// ------------------------------------
export function ProjectsPage(_: {}) {
  const api = useMemo(() => getBackendAPI(), []);

  const [projectItems, setProjectItems] = useState<ProjectItemWithDetails[] | null>(null);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);

  const fetchProjectItems = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);

    const apiCall = async () => {
      const response = await api.getProjectItemsWithDetails(
        {},
        {
          // Request all projects grouped by type
        },
      );
      if (response instanceof ApiError) throw response;
      return response as dto.GetProjectItemsWithDetailsResponse;
    };

    const onSuccess = (response: dto.GetProjectItemsWithDetailsResponse) => {
      // Combine all types and sort by popularity
      const allProjects = [...response.repositories, ...response.owners, ...response.urls];

      // Sort by popularity: repositories by stars, owners by followers, URLs last
      allProjects.sort((a, b) => {
        const aPopularity = a.repository?.stargazersCount ?? a.owner?.followers ?? 0;
        const bPopularity = b.repository?.stargazersCount ?? b.owner?.followers ?? 0;
        return bPopularity - aPopularity; // Descending order
      });

      setProjectItems(allProjects);

      // Use stats from API response and format numbers
      setStats({
        totalProjects: response.stats.totalProjects,
        totalMaintainers: response.stats.totalMaintainers,
        totalStars: NumberUtils.formatCompactNumber(response.stats.totalStars),
        totalForks: NumberUtils.formatCompactNumber(response.stats.totalForks),
      });
    };

    await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
  }, [api]);

  useEffect(() => {
    fetchProjectItems();
  }, [fetchProjectItems]);

  // Filter + group
  const filteredProjects = useMemo(() => {
    if (!projectItems) return {} as Record<string, ProjectItemWithDetails[]>;

    let projects = projectItems;

    if (searchQuery) {
      projects = ProjectItemWithDetailsCompanion.searchProjectItems(projectItems, searchQuery);
    }

    if (selectedCategory) {
      projects = projects.filter(item => getProjectCategory(item) === selectedCategory);
    }

    return projects.reduce(
      (acc, item) => {
        const category = getProjectCategory(item);
        const categoryKey = category ?? "Uncategorized";
        if (!acc[categoryKey]) acc[categoryKey] = [] as ProjectItemWithDetails[];
        acc[categoryKey].push(item);
        return acc;
      },
      {} as Record<string, ProjectItemWithDetails[]>,
    );
  }, [projectItems, searchQuery, selectedCategory]);

  const totalResults = useMemo(() => Object.values(filteredProjects).reduce((sum, arr) => sum + arr.length, 0), [filteredProjects]);

  const hasResults = Object.keys(filteredProjects).length > 0;

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-4 text-foreground">{projectsPageContent.hero.title}</h1>
            <p className="text-muted-foreground mb-8">{projectsPageContent.hero.subtitle}</p>
            <div className="pt-8 border-t border-border">
              <PlatformStats projectStats={stats ?? { totalProjects: 0, totalStars: "0", totalForks: "0", totalMaintainers: 0 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Loading */}
      {isLoading && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="text-center" role="status" aria-label={projectsPageContent.loading.spinnerAria}>
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent" />
                <p className="mt-4 text-muted-foreground">{projectsPageContent.loading.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {apiError && !isLoading && (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <ServerErrorAlert error={apiError} title={projectsPageContent.error.title} showRetry={true} onRetry={fetchProjectItems} />
          </div>
        </div>
      )}

      {/* Search + Filters + Results */}
      {!isLoading && !apiError && (
        <>
          <section className="py-8 border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start">
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <ProjectSearchBar value={searchQuery} onChange={setSearchQuery} placeholder={projectsPageContent.search.placeholder} />
                  </div>
                  {/*<div className="hidden lg:block w-px h-8 bg-border flex-shrink-0 mt-1" />*/}
                  {/*<div className="flex-1">*/}
                  {/*  <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />*/}
                  {/*</div>*/}
                </div>

                {(searchQuery || selectedCategory) && (
                  <div className="text-sm text-muted-foreground">
                    {hasResults ? (
                      <span>
                        {totalResults} {totalResults === 1 ? projectsPageContent.results.projectSingular : projectsPageContent.results.projectPlural}
                        {searchQuery && (
                          <span>
                            {" "}
                            {projectsPageContent.results.matching} &quot;{searchQuery}&quot;
                          </span>
                        )}
                        {selectedCategory && (
                          <span>
                            {" "}
                            {projectsPageContent.results.inLabel} {selectedCategory}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-brand-warning">
                        {projectsPageContent.results.nonePrefix}
                        {searchQuery && (
                          <span>
                            {" "}
                            {projectsPageContent.results.matching} &quot;{searchQuery}&quot;
                          </span>
                        )}
                        {selectedCategory && (
                          <span>
                            {" "}
                            {projectsPageContent.results.inLabel} {selectedCategory}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Projects by Category or Request CTA */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {hasResults ? (
                <div className="space-y-16">
                  {Object.entries(filteredProjects)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, projects]) => (
                      <ProjectCategorySection key={category} category={category} projects={projects} initialShowCount={4} />
                    ))}
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">{/*<RequestProjectSection searchQuery={searchQuery} selectedCategory={selectedCategory} />*/}</div>
              )}
            </div>
          </section>

          {/*/!* Bottom CTA *!/*/}
          {/*{hasResults && (*/}
          {/*  <section className="py-20 border-t border-border bg-gradient-to-br from-brand-card-blue via-brand-card-blue-light to-brand-accent/5">*/}
          {/*    <RequestProjectSection variant="fancy" />*/}
          {/*  </section>*/}
          {/*)}*/}
        </>
      )}
    </PageWrapper>
  );
}
