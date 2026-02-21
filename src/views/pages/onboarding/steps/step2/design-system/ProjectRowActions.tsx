import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { Edit, Trash2 } from "lucide-react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";

interface ProjectRowActionsProps {
  project: DeveloperProjectItemEntry;
  onEdit: (project: DeveloperProjectItemEntry) => void;
  onDelete: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectRowActions(props: ProjectRowActionsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => props.onEdit(props.project)}
        className="h-9 w-9 p-0 text-brand-accent hover:text-brand-accent-light hover:bg-brand-accent/10 transition-all"
        title="Edit project"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => props.onDelete(props.project)}
        className="h-9 w-9 p-0 text-brand-error hover:text-brand-error-light hover:bg-brand-error/10 transition-all"
        title="Remove project"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
