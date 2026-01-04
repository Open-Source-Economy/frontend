import React from "react";
import { ProjectItemType } from "@open-source-economy/api-types";
import { FormField } from "src/views/components/ui/forms/form-field";
import { ValidationError } from "src/views/components/ui/forms/validation-requirements";
import { ExternalLink } from "lucide-react";
import { Input } from "src/views/components/ui/forms";

interface ProjectUrlInputProps {
  projectType: ProjectItemType;
  value: string;
  onChange: (value: string) => void;
  error?: string | ValidationError;
}

const getUrlConfig = (projectType: ProjectItemType) => {
  switch (projectType) {
    case ProjectItemType.GITHUB_REPOSITORY:
      return {
        label: "GitHub Repository URL",
        placeholder: "https://github.com/username/repository",
        hint: "e.g., https://github.com/facebook/react",
      };
    case ProjectItemType.GITHUB_OWNER:
      return {
        label: "GitHub Organization URL",
        placeholder: "https://github.com/organization",
        hint: "e.g., https://github.com/nodejs",
      };
    default:
      return {
        label: "Project URL",
        placeholder: "https://...",
        hint: "Any public URL to your project",
      };
  }
};

export function ProjectUrlInput({ projectType, value, onChange, error }: ProjectUrlInputProps) {
  const config = getUrlConfig(projectType);
  const validationError: ValidationError | undefined = typeof error === "string" ? { error } : error;

  return (
    <FormField label={config.label} required error={validationError} hint={config.hint}>
      <div className="relative">
        <Input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={config.placeholder}
          className="pr-10"
          variant={error ? "error" : "default"}
        />
        {value && (
          <a
            href={value}
            target="_blank" // TODO: lolo
            rel="noopener noreferrer"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-accent hover:text-brand-accent-dark transition-colors z-10"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </FormField>
  );
}
