import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardListProps {
  projects: DeveloperProjectItemEntry[];
  onEdit: (project: DeveloperProjectItemEntry) => void;
  onDelete: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectCardList(props: ProjectCardListProps) {
  return (
    <div className="md:hidden space-y-3">
      {props.projects.map((project) => (
        <ProjectCard
          key={project.developerProjectItem.id}
          project={project}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}
