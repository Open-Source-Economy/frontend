import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { AddProjectButton } from "./AddProjectButton";

interface ProjectsSectionProps {
  projects: DeveloperProjectItemEntry[];
  onAddProject: () => void;
  onEditProject: (project: DeveloperProjectItemEntry) => void;
  onDeleteProject: (projectId: ProjectItemId) => void;
  isLoading: boolean;
}

export function ProjectsSection(props: ProjectsSectionProps) {
  if (props.projects.length === 0) {
    return (
      <AddProjectButton 
        onClick={props.onAddProject}
        disabled={props.isLoading}
      />
    );
  }

  // If there are projects, we could show them here in the future
  // For now, just show the Add Project button as per the Figma design
  return (
    <AddProjectButton 
      onClick={props.onAddProject}
      disabled={props.isLoading}
    />
  );
}
