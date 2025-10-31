import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ExternalLink, Github, Globe } from "lucide-react";
import { ProjectRowActions } from "./ProjectRowActions";
import { getAccessValue, getProjectDisplayName, getProjectDisplayUrl, getRoleLabel, isGitHubProject } from "../adapters";
import { MergeRightsTypeCompanion } from "src/ultils/companions";

interface ProjectCardProps {
  project: DeveloperProjectItemEntry;
  onEdit: (project: DeveloperProjectItemEntry) => void;
  onDelete: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const url = getProjectDisplayUrl(project);
  const displayName = getProjectDisplayName(project);
  const role = getRoleLabel(project);
  const access = getAccessValue(project);
  const accessLabel = MergeRightsTypeCompanion.label(access);
  const accessClassName = MergeRightsTypeCompanion.className(access);
  const isGithubProject = isGitHubProject(project);

  return (
    <div className="rounded-xl border border-brand-neutral-300/30 bg-brand-card-blue/20 p-4 space-y-3">
      {/* Project Name & Link */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isGithubProject ? (
              <Github className="w-4 h-4 text-brand-neutral-600 flex-shrink-0" />
            ) : (
              <Globe className="w-4 h-4 text-brand-neutral-600 flex-shrink-0" />
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-neutral-800 hover:text-brand-accent transition-colors group flex items-center gap-2 min-w-0"
              title={url}
            >
              <span className="truncate font-medium">{displayName}</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-neutral-500 group-hover:text-brand-accent flex-shrink-0 transition-colors" />
            </a>
          </div>
          <p className="text-xs text-brand-neutral-600 truncate">{url}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0">
          <ProjectRowActions project={project} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-neutral-300/20">
        {/* Role */}
        <div>
          <p className="text-xs text-brand-neutral-600 uppercase tracking-wider mb-1">Your Role</p>
          <p className="text-sm text-brand-neutral-700">{role}</p>
        </div>

        {/* Access Level */}
        <div>
          <p className="text-xs text-brand-neutral-600 uppercase tracking-wider mb-1">Access Level</p>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs ${accessClassName}`}>{accessLabel}</span>
        </div>
      </div>
    </div>
  );
}
