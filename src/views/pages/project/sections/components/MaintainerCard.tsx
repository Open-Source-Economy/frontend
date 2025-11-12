import React, { useMemo } from "react";
import { BadgeCheck, Github, GitMerge, Sparkles, Twitter } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { ProjectDeveloperProfile } from "@open-source-economy/api-types";
import { ProjectDeveloperProfileCompanion } from "src/ultils/companions/ProjectDeveloperProfile.companion";
import { OwnerCompanion } from "src/ultils/companions/Owner.companion";
import { ExternalLink } from "../../../../components/ui/forms/ExternalLink";
import { getMaintainerTenure } from "../../data/maintainerTenure";
import { getMaintainerHighlight } from "../../data/maintainerHighlights";
import { getMaintainerDescription } from "../../data/maintainerDescriptions";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "../../../../../ultils/companions";

interface MaintainerCardProps {
  developer: ProjectDeveloperProfile;
  projectName: string;
}

export function MaintainerCard({ developer, projectName }: MaintainerCardProps) {
  const displayName = ProjectDeveloperProfileCompanion.getDisplayName(developer);
  const avatar = useMemo(() => ProjectDeveloperProfileCompanion.getAvatarUrl(developer), [developer]);
  const verified = ProjectDeveloperProfileCompanion.isVerified(developer);
  const yearsOnProject = getMaintainerTenure(developer.profileEntry?.owner?.id.login);
  const maintainerHighlight = getMaintainerHighlight(developer.profileEntry?.owner?.id.login);
  const maintainerDescription = getMaintainerDescription(developer.profileEntry?.owner?.id.login);
  const twitterUrl = OwnerCompanion.getTwitterUrl(developer.profileEntry?.owner);

  return (
    <div
      className="relative bg-gradient-to-br from-brand-card-blue via-brand-card-blue to-brand-card-blue-light/30 border border-brand-neutral-300/60 rounded-2xl p-6 hover:border-brand-accent/50 hover:shadow-xl hover:shadow-brand-accent/5 transition-all duration-300 group flex flex-col overflow-hidden backdrop-blur-sm"
      data-maintainer-card
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.02] via-transparent to-brand-highlight/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/*/!* Subtle grid pattern *!/*/}
      {/*<div*/}
      {/*  className="absolute inset-0 opacity-[0.015] pointer-events-none"*/}
      {/*  style={{*/}
      {/*    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",*/}
      {/*    backgroundSize: "16px 16px",*/}
      {/*  }}*/}
      {/*/>*/}

      {/*/!* Availability Badge - Top Right *!/*/}
      {/*<div className="absolute top-5 right-5 z-10">*/}
      {/*  {availableForConsulting ? (*/}
      {/*    <Badge className="bg-brand-success/10 text-brand-success border-brand-success/20 text-xs shadow-sm">*/}
      {/*      <Star className="mr-1 h-3 w-3" />*/}
      {/*      Available*/}
      {/*    </Badge>*/}
      {/*  ) : (*/}
      {/*    <Badge variant="secondary" className="bg-brand-neutral-200/50 text-brand-neutral-500 border-brand-neutral-400/30 text-xs">*/}
      {/*      Unavailable*/}
      {/*    </Badge>*/}
      {/*  )}*/}
      {/*</div>*/}

      <div className="flex gap-4 flex-1 relative z-[1]">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img src={avatar} alt={displayName} className="w-20 h-20 rounded-xl border border-brand-neutral-300 object-cover shadow-md" />
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
            <p className="text-brand-neutral-600 mb-2">{DeveloperRoleTypeCompanion.label(developer.project.developerProjectItem.roles[0])}</p>

            {/* Inline Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {yearsOnProject !== null && (
                <Badge variant="outline" className="text-xs text-brand-neutral-600 border-brand-neutral-400/30">
                  Contributing since {yearsOnProject} {yearsOnProject === 1 ? "year" : "years"}
                </Badge>
              )}

              {developer.project.developerProjectItem.mergeRights.length > 0 && (
                <Badge variant="outline" className="text-xs bg-brand-neutral-200/20 text-brand-neutral-600 border-brand-neutral-400/30">
                  <GitMerge className="mr-1 h-3 w-3" />
                  {MergeRightsTypeCompanion.label(developer.project.developerProjectItem.mergeRights[0])}
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

          {/*/!* Expertise Tags *!/*/}
          {/*<div className="mb-3 mt-auto">*/}
          {/*  <div className="flex flex-wrap gap-1.5">*/}
          {/*    <span className="text-brand-neutral-600 text-xs w-full mb-0.5">Expertise</span>*/}
          {/*    {(expertise.length > 0 ? expertise : ["Open Source"]).map(skill => (*/}
          {/*      <Badge key={skill} variant="outline" className="text-xs bg-brand-neutral-100/50">*/}
          {/*        {skill}*/}
          {/*      </Badge>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* Social Links */}
          <div className="flex gap-1.5">
            {developer.profileEntry?.owner?.htmlUrl && (
              <ExternalLink href={developer.profileEntry?.owner?.htmlUrl} aria-label="GitHub" underline={false} className="group/social">
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
