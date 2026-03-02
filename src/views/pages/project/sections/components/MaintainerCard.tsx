import React, { useMemo } from "react";
import { BadgeCheck, Github, GitMerge, Sparkles, Twitter } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import * as dto from "@open-source-economy/api-types";
import { ProjectDeveloperProfileCompanion } from "src/utils/companions/ProjectDeveloperProfile.companion";
import { OwnerCompanion } from "src/utils/companions/Owner.companion";
import { ExternalLink } from "../../../../components/ui/forms/external-link";
import { getMaintainerTenure } from "../../data/maintainerTenure";
import { getMaintainerHighlight } from "../../data/maintainerHighlights";
import { getMaintainerDescription } from "../../data/maintainerDescriptions";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "../../../../../utils/companions";
import { StatusBadge } from "./StatusBadge";

interface MaintainerCardProps {
  developer: dto.ProjectDeveloperProfile;
  projectName: string;
}

export function MaintainerCard(props: MaintainerCardProps) {
  const displayName = ProjectDeveloperProfileCompanion.getDisplayName(props.developer);
  const avatar = useMemo(() => ProjectDeveloperProfileCompanion.getAvatarUrl(props.developer), [props.developer]);
  const verified = ProjectDeveloperProfileCompanion.isVerified(props.developer);
  const yearsOnProject = getMaintainerTenure(props.developer.profileEntry?.owner?.id?.login);
  const maintainerHighlight = getMaintainerHighlight(props.developer.profileEntry?.owner?.id?.login);
  const maintainerDescription = getMaintainerDescription(props.developer.profileEntry?.owner?.id?.login);
  const twitterUrl = OwnerCompanion.getTwitterUrl(props.developer.profileEntry?.owner);

  return (
    <div
      className="relative bg-gradient-to-br from-brand-card-blue via-brand-card-blue to-brand-card-blue-light/30 border border-brand-neutral-300/60 rounded-2xl p-6 hover:border-brand-accent/50 hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 group flex flex-col overflow-hidden backdrop-blur-sm"
      data-maintainer-card
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.02] via-transparent to-brand-highlight/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Availability Badge - Top Right */}
      <div className="absolute top-5 right-5 z-10">
        <StatusBadge settings={props.developer.settings} />
      </div>

      <div className="flex gap-4 flex-1 relative z-[1]">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={avatar}
              alt={displayName}
              className="w-20 h-20 rounded-xl border border-brand-neutral-300 object-cover shadow-md"
            />
            {verified && (
              <div className="absolute -top-1 -right-1 bg-brand-accent rounded-full p-1 shadow-lg shadow-brand-accent/30">
                <BadgeCheck className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-brand-neutral-900 mb-0.5">{displayName}</h3>
            <p className="text-brand-neutral-600 mb-2">
              {DeveloperRoleTypeCompanion.label(props.developer.project.developerProjectItem.roles[0])}
            </p>

            {/* Inline Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {yearsOnProject !== null && (
                <Badge variant="outline" className="text-xs text-brand-neutral-600 border-brand-neutral-400/30">
                  Contributing since {yearsOnProject} {yearsOnProject === 1 ? "year" : "years"}
                </Badge>
              )}

              {props.developer.project.developerProjectItem.mergeRights.length > 0 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-brand-neutral-200/20 text-brand-neutral-600 border-brand-neutral-400/30"
                >
                  <GitMerge className="mr-1 h-3 w-3" />
                  {MergeRightsTypeCompanion.label(props.developer.project.developerProjectItem.mergeRights[0])}
                </Badge>
              )}
            </div>
          </div>

          {/* Maintainer description */}
          {maintainerDescription && <p className="text-brand-neutral-700 mb-3">{maintainerDescription}</p>}

          {/* Highlight Fact */}
          {maintainerHighlight && (
            <div className="relative p-4 bg-brand-neutral-100/40 border border-brand-neutral-300/50 rounded-lg mb-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-brand-accent/10 flex-shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-brand-neutral-700 leading-relaxed">{maintainerHighlight}</p>
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="flex gap-1.5">
            {props.developer.profileEntry?.owner?.htmlUrl && (
              <ExternalLink
                href={props.developer.profileEntry?.owner?.htmlUrl}
                aria-label="GitHub"
                underline={false}
                className="group/social"
              >
                <Github className="h-3.5 w-3.5 transition-all duration-200 group-hover/social:text-brand-accent" />
              </ExternalLink>
            )}
            {twitterUrl && (
              <ExternalLink href={twitterUrl} aria-label="Twitter" underline={false} className="group/social">
                <Twitter className="h-3.5 w-3.5 transition-all duration-200 group-hover/social:text-brand-accent" />
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
