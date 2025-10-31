import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardListProps {
  projects: DeveloperProjectItemEntry[];
  onEdit: (project: DeveloperProjectItemEntry) => void;
  onDelete: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectCardList({ projects, onEdit, onDelete }: ProjectCardListProps) {
  return (
    <div className="md:hidden space-y-3">
      {projects.map(project => (
        <ProjectCard key={project.developerProjectItem.id.uuid} project={project} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
