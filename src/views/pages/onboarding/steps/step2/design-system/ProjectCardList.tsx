import React from "react";
import * as dto from "@open-source-economy/api-types";
import { ProjectCard } from "src/views/pages/onboarding/steps/step2/design-system/ProjectCard";

interface ProjectCardListProps {
  projects: dto.DeveloperProjectItemEntry[];
  onEdit: (project: dto.DeveloperProjectItemEntry) => void;
  onDelete: (project: dto.DeveloperProjectItemEntry) => void;
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
