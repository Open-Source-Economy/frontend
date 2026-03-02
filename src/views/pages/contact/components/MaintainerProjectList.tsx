import React from "react";
import { Label } from "src/views/components/ui/forms/label";
import { Input } from "src/views/components/ui/forms/inputs/input";
import { FieldError } from "src/views/components/ui/forms/field-error";
import { Plus, X } from "lucide-react";
import { ProjectEntry } from "src/views/pages/contact/helpers/formHelpers";

interface MaintainerProjectListProps {
  projects: ProjectEntry[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof ProjectEntry, value: string) => void;
  error?: string;
}

export function MaintainerProjectList(props: MaintainerProjectListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>
          Your Open Source Project(s) <span className="text-brand-error">*</span>
        </Label>
        <button
          type="button"
          onClick={props.onAdd}
          className="text-brand-accent hover:text-brand-accent-dark transition-colors inline-flex items-center gap-1.5 group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {props.projects.map((project, index) => (
          <div
            key={index}
            className="bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-brand-neutral-700">Project {index + 1}</span>
              {props.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => props.onRemove(index)}
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
                  onChange={(e) => props.onUpdate(index, "url", e.target.value)}
                  placeholder="https://github.com/yourname/project"
                  className={props.error && index === 0 ? "border-brand-error focus:border-brand-error" : ""}
                  data-error={props.error && index === 0}
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
                  onChange={(e) => props.onUpdate(index, "role", e.target.value)}
                  placeholder="e.g., Core Maintainer, Creator"
                />
              </div>
            </div>
          </div>
        ))}
        <FieldError error={props.error} />
      </div>
    </div>
  );
}
