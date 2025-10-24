import React from "react";
import { Label } from "../../../components/ui/forms/label";
import { Input } from "../../../components/ui/forms/input";
import { FieldError } from "../../../components/ui/forms/field-error";
import { Plus, X } from "lucide-react";
import { ProjectEntry } from "../helpers/formHelpers";

interface MaintainerProjectListProps {
  projects: ProjectEntry[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ProjectEntry, value: string) => void;
  error?: string;
}

export function MaintainerProjectList({ projects, onAdd, onRemove, onUpdate, error }: MaintainerProjectListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>
          Your Open Source Project(s) <span className="text-brand-error">*</span>
        </Label>
        <button
          type="button"
          onClick={onAdd}
          className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brand-neutral-700">Project {index + 1}</span>
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-brand-error hover:text-brand-error-dark transition-colors p-1.5 hover:bg-brand-error/10 rounded-lg group"
                  aria-label="Remove project"
                >
                  <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`project-url-${index}`}>
                  Project URL <span className="text-brand-error">*</span>
                </Label>
                <Input
                  id={`project-url-${index}`}
                  type="url"
                  value={project.url}
                  onChange={e => onUpdate(index, "url", e.target.value)}
                  placeholder="https://github.com/yourname/project"
                  className={error && index === 0 ? "border-brand-error focus:border-brand-error" : ""}
                  data-error={error && index === 0}
                />
              </div>

              <div>
                <Label htmlFor={`project-role-${index}`}>
                  Your Role <span className="text-brand-error">*</span>
                </Label>
                <Input
                  id={`project-role-${index}`}
                  type="text"
                  value={project.role || ""}
                  onChange={e => onUpdate(index, "role", e.target.value)}
                  placeholder="e.g., Core Maintainer, Creator"
                />
              </div>
            </div>
          </div>
        ))}
        <FieldError error={error} />
      </div>
    </div>
  );
}
