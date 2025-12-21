import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ExternalLink, Github, Globe } from "lucide-react";
import { ProjectRowActions } from "./ProjectRowActions";
import { getAccessValue, getProjectDisplayName, getProjectDisplayUrl, getRoleLabel, isGitHubProject } from "../adapters";
import { MergeRightsTypeCompanion, ProjectCategoryCompanion } from "src/ultils/companions";
import { Chip } from "src/views/components/ui/chip";

interface ProjectsTableProps {
  projects: DeveloperProjectItemEntry[];
  onEdit: (project: DeveloperProjectItemEntry) => void;
  onDelete: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectsTable({ projects, onEdit, onDelete }: ProjectsTableProps) {
  return (
    <div className="hidden md:block rounded-xl border border-brand-neutral-300/30 overflow-hidden bg-brand-card-blue/20">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-neutral-300/40 bg-brand-neutral-200/60">
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-brand-neutral-600">Project</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-brand-neutral-600">Ecosystems</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-brand-neutral-600">Your Role</th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-brand-neutral-600">Access Level</th>
              <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-brand-neutral-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-neutral-300/20">
            {projects.map(project => {
              const url = getProjectDisplayUrl(project);
              const displayName = getProjectDisplayName(project);
              const role = getRoleLabel(project);
              const access = getAccessValue(project);
              const accessLabel = MergeRightsTypeCompanion.label(access);
              const accessClassName = MergeRightsTypeCompanion.className(access);
              const isGithubProject = isGitHubProject(project);
              const ecosystems: string[] = [
                ...(project.developerProjectItem.customCategories || []),
                ...(project.developerProjectItem.predefinedCategories?.map(cat => ProjectCategoryCompanion.toLabel(cat)) || []),
              ];

              return (
                <tr key={project.developerProjectItem.id.uuid} className="hover:bg-brand-card-blue/40 transition-all duration-200">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        {isGithubProject ? (
                          <Github className="w-4 h-4 text-brand-neutral-600 flex-shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-brand-neutral-600 flex-shrink-0" />
                        )}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-neutral-800 hover:text-brand-accent transition-colors group flex items-center gap-2"
                          title={url}
                        >
                          <span className="truncate max-w-xs">{displayName}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-brand-neutral-500 group-hover:text-brand-accent flex-shrink-0 transition-colors" />
                        </a>
                      </div>
                      <span className="text-xs text-brand-neutral-600 truncate max-w-xs">{url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {ecosystems && ecosystems.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {ecosystems.map(ecosystem => (
                          <Chip key={ecosystem} size="md">
                            {ecosystem}
                          </Chip>
                        ))}
                      </div>
                    ) : (
                      <span className="text-brand-neutral-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-brand-neutral-700">{role}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md ${accessClassName}`}>{accessLabel}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end">
                      <ProjectRowActions project={project} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
