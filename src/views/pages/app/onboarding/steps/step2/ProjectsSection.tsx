import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { AddProjectButton } from "./AddProjectButton";
import { ProjectListTable } from "./ProjectListTable";

interface ProjectsSectionProps {
  projects: DeveloperProjectItemEntry[];
  onAddProject: () => void;
  onEditProject: (project: DeveloperProjectItemEntry) => void;
  onShowDeleteModal: (project: DeveloperProjectItemEntry) => void;
  isLoading: boolean;
}

export function ProjectsSection(props: ProjectsSectionProps) {
  if (props.projects.length === 0) {
    return <AddProjectButton onClick={props.onAddProject} disabled={props.isLoading} />;
  }

  return (
    <div className="flex flex-col items-start self-stretch">
      {/* Project List Table */}
      {/*<ProjectListTable projects={props.projects} onEditProject={props.onEditProject} onDeleteProject={props.onShowDeleteModal} />*/}

      {/* Add Project Button */}
      <div className="flex p-3 justify-center items-center gap-2.5 self-stretch bg-[#14233A] rounded-b-[30px]">
        <AddProjectButton onClick={props.onAddProject} disabled={props.isLoading} />
      </div>
    </div>
  );
}
