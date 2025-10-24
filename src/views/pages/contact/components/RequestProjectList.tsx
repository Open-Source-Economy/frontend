import React from "react";
import { Label } from "../../../components/ui/forms/label";
import { Input } from "../../../components/ui/forms/input";
import { Plus, X } from "lucide-react";
import { ProjectEntry } from "../helpers/formHelpers";

interface RequestProjectListProps {
  projects: ProjectEntry[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ProjectEntry, value: string) => void;
}

export function RequestProjectList({ projects, onAdd, onRemove, onUpdate }: RequestProjectListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>
          Project URL(s) <span className="text-brand-error">*</span>
        </Label>
        <button
          type="button"
          onClick={onAdd}
          className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add Another</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <Label htmlFor={`project-url-${index}`} className="sr-only">
                Project URL {index + 1}
              </Label>
              <Input
                id={`project-url-${index}`}
                type="url"
                required
                value={project.url}
                onChange={e => onUpdate(index, "url", e.target.value)}
                placeholder="https://github.com/org/project"
              />
            </div>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-brand-error hover:text-brand-error-dark transition-colors p-2 hover:bg-brand-error/10 rounded-lg group"
                aria-label="Remove project"
              >
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
