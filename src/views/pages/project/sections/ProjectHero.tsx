import React, { useMemo } from "react";
import { Github } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/forms";
import { ExternalLink } from "../../../components/ui/forms/external-link";
import * as dto from "@open-source-economy/api-types";
import { ProjectItemDetailsCompanion } from "src/utils/companions/ProjectItemDetails.companion";
import { laurianeCalLink } from "../../../v1/data";

interface ProjectHeroProps {
  project: dto.ProjectItemDetails;
}

export function ProjectHero(props: ProjectHeroProps) {
  const displayName = useMemo(() => ProjectItemDetailsCompanion.getDisplayName(props.project), [props.project]);

  const description = useMemo(() => ProjectItemDetailsCompanion.getDescription(props.project), [props.project]);

  const githubUrl = useMemo(() => ProjectItemDetailsCompanion.getGithubUrl(props.project), [props.project]);

  const _formattedStats = useMemo(() => {
    return ProjectItemDetailsCompanion.getProjectItemsStats([props.project]);
  }, [props.project]);

  const language = props.project.repository?.language ?? null;

  return (
    <div className="bg-gradient-to-br from-brand-secondary via-brand-card-blue to-brand-secondary-dark border-b border-brand-neutral-300">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
