import React, { useMemo } from "react";
import { Github } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/forms";
import { ExternalLink } from "../../../components/ui/forms/external-link";
import type { ProjectItemDetails } from "@open-source-economy/api-types";
import { ProjectItemDetailsCompanion } from "src/ultils/companions/ProjectItemDetails.companion";
import { laurianeCalLink } from "../../../v1/data";

interface ProjectHeroProps {
  project: ProjectItemDetails;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const displayName = useMemo(() => ProjectItemDetailsCompanion.getDisplayName(project), [project]);

  const description = useMemo(() => ProjectItemDetailsCompanion.getDescription(project), [project]);

  const githubUrl = useMemo(() => ProjectItemDetailsCompanion.getGithubUrl(project), [project]);

  const formattedStats = useMemo(() => {
    return ProjectItemDetailsCompanion.getProjectItemsStats([project]);
  }, [project]);

  const language = project.repository?.language ?? null;

  return (
    <div className="bg-gradient-to-br from-brand-secondary via-brand-card-blue to-brand-secondary-dark border-b border-brand-neutral-300">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/*/!* Logo *!/*/}
          {/*{project.owner?.avatarUrl && (*/}
          {/*  <div className="flex-shrink-0">*/}
          {/*    <img*/}
          {/*      src={project.owner.avatarUrl}*/}
          {/*      alt={displayName ?? project.owner?.id?.login ?? "Project avatar"}*/}
          {/*      className="h-24 w-24 rounded-xl border border-brand-neutral-200 bg-white object-cover shadow-lg"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*)}*/}

          {/* Content */}
          <div className="flex-1">
            {/* Category Badges */}
            {language && (
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge key={language} variant="secondary">
                  {language}
                </Badge>
              </div>
            )}

            {/* Title & Tagline */}
            {displayName && <h1 className="text-brand-neutral-950 mb-3">{displayName}</h1>}
            {description && <p className="text-brand-neutral-600 mb-6 max-w-2xl">{description}</p>}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <ExternalLink href={laurianeCalLink} underline={false}>
                <Button size="lg">Schedule Consultation</Button>
              </ExternalLink>

              {/*<Button size="lg" variant="outline" asChild>*/}
              {/*  <Link to="#donation">Support This Project</Link>*/}
              {/*</Button>*/}

              {githubUrl && (
                <ExternalLink
                  href={githubUrl}
                  underline={false}
                  className="flex items-center gap-2 text-brand-neutral-500 hover:text-brand-neutral-700 transition-colors text-sm"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>View on GitHub</span>
                </ExternalLink>
              )}
              {/*{githubUrl && (*/}
              {/*  <ExternalLink*/}
              {/*    href={githubUrl}*/}
              {/*    underline={false}*/}
              {/*    className="flex items-center gap-2 text-brand-neutral-500 hover:text-brand-neutral-700 transition-colors text-sm"*/}
              {/*  >*/}
              {/*    <ExternalLinkIcon className="h-3.5 w-3.5" />*/}
              {/*    <span>Documentation</span>*/}
              {/*  </ExternalLink>*/}
              {/*)}*/}
            </div>

            {/*/!* Quick Stats *!/*/}
            {/*<div className="flex flex-wrap gap-6">*/}
            {/*  {formattedStats?.totalStars !== undefined && (*/}
            {/*    <div className="flex items-center gap-2 text-brand-neutral-700">*/}
            {/*      <Star className="h-4 w-4 text-brand-warning" />*/}
            {/*      <span>{formattedStats.totalStars}</span>*/}
            {/*    </div>*/}
            {/*  )}*/}

            {/*  /!* Future stats placeholders if needed*/}
            {/*  <div className="flex items-center gap-2 text-brand-neutral-700">*/}
            {/*    <Download className="h-4 w-4 text-brand-success" />*/}
            {/*    <span>{formattedForks}</span>*/}
            {/*  </div>*/}
            {/*  <div className="flex items-center gap-2 text-brand-neutral-700">*/}
            {/*    <Calendar className="h-4 w-4 text-brand-accent" />*/}
            {/*    <span>{versionLabel}</span>*/}
            {/*  </div>*/}
            {/*  <div className="flex items-center gap-2 text-brand-neutral-700">*/}
            {/*    <Scale className="h-4 w-4 text-brand-highlight" />*/}
            {/*    <span>{licenseLabel}</span>*/}
            {/*  </div>*/}
            {/*  *!/*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
