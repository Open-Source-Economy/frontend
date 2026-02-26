import React from "react";
import { ProjectItemType } from "@open-source-economy/api-types";
import { BulkValidationErrorType, BulkValidationResult } from "src/ultils/BulkProjectUrlParser";
import { ProjectItemTypeCompanion } from "src/ultils/companions";

interface BulkProjectsPreviewProps {
  validationResult: BulkValidationResult;
  selectedProjectType: ProjectItemType;
}

// Helper function to group valid projects by type
const groupProjectsByType = (validProjects: BulkValidationResult["validProjects"]) => {
  const repositories: string[] = [];
  const owners: string[] = [];
  const urls: string[] = [];

  validProjects.forEach((project) => {
    const sourceIdentifier = project.sourceIdentifier;

    if (
      typeof sourceIdentifier === "object" &&
      sourceIdentifier !== null &&
      "ownerId" in sourceIdentifier &&
      "name" in sourceIdentifier
    ) {
      repositories.push(`${sourceIdentifier.ownerId}/${sourceIdentifier.name}`);
    } else if (typeof sourceIdentifier === "string") {
      // For string-based identifiers, check the project type to distinguish owners from URLs
      if (project.projectType === ProjectItemType.GITHUB_OWNER) {
        owners.push(sourceIdentifier);
      } else if (project.projectType === ProjectItemType.URL) {
        urls.push(sourceIdentifier);
      } else {
        // Fallback: treat as URL
        urls.push(sourceIdentifier);
      }
    }
  });

  return { repositories, owners, urls };
};

// Helper function to extract errors by type
const extractErrorsByType = (errors: BulkValidationResult["errors"]) => {
  const duplicateError = errors.find((e) => e.type === BulkValidationErrorType.DUPLICATE);
  const conflictError = errors.find((e) => e.type === BulkValidationErrorType.CONFLICT);
  const typeMismatchError = errors.find((e) => e.type === BulkValidationErrorType.TYPE_MISMATCH);
  const invalidFormatError = errors.find((e) => e.type === BulkValidationErrorType.INVALID_FORMAT);

  return {
    duplicateNames: duplicateError?.displayNames || [],
    conflictNames: conflictError?.displayNames || [],
    typeMismatchNames: typeMismatchError?.displayNames || [],
    invalidFormatNames: invalidFormatError?.displayNames || [],
  };
};

// Helper function to get error explanation text
const getTypeErrorExplanation = (
  typeMismatchNames: string[],
  invalidFormatNames: string[],
  selectedProjectType: ProjectItemType
): string => {
  if (typeMismatchNames.length > 0) {
    const expectedLabel = ProjectItemTypeCompanion.label(selectedProjectType || ProjectItemType.URL);
    let explanation = `These URLs don't match the selected type (${expectedLabel})`;
    if (invalidFormatNames.length > 0) {
      explanation += ". Some URLs have invalid format";
    }
    return explanation;
  } else if (invalidFormatNames.length > 0) {
    return "These URLs have invalid format";
  }
  return "";
};

// Component for displaying a list of project chips
interface ProjectChipsProps {
  items: string[];
  variant: "accent" | "highlight" | "neutral" | "error";
  showTitle?: boolean;
}

function ProjectChips(props: ProjectChipsProps) {
  const showTitle = props.showTitle ?? false;

  const variantClasses = {
    accent: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
    highlight: "bg-brand-highlight/10 text-brand-highlight border-brand-highlight/20",
    neutral: "bg-brand-neutral-200 text-brand-neutral-700 border-brand-neutral-300",
    error: "bg-red-100 text-red-700 border-red-300",
  };

  const baseClasses = "inline-flex items-center px-2 py-1 rounded-md text-xs font-mono border";
  const truncateClasses = props.variant === "neutral" ? "max-w-full truncate" : "";

  return (
    <div className="flex flex-wrap gap-1.5">
      {props.items.map((item, idx) => (
        <span
          key={idx}
          className={`${baseClasses} ${variantClasses[props.variant]} ${truncateClasses}`}
          title={showTitle ? item : undefined}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

// Component for displaying a section of valid projects
interface ValidProjectsSectionProps {
  title: string;
  items: string[];
  variant: "accent" | "highlight" | "neutral";
}

function ValidProjectsSection(props: ValidProjectsSectionProps) {
  if (props.items.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-brand-neutral-600 uppercase tracking-wider">
        {props.title} ({props.items.length})
      </div>
      <ProjectChips items={props.items} variant={props.variant} showTitle={props.variant === "neutral"} />
    </div>
  );
}

// Component for displaying an error section
interface ErrorSectionProps {
  title: string;
  count: number;
  explanation?: string;
  items: string[];
}

function ErrorSection(props: ErrorSectionProps) {
  if (props.items.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-red-800">
        {props.title} ({props.count})
      </div>
      {props.explanation && <div className="text-xs text-red-700">{props.explanation}</div>}
      <ProjectChips items={props.items} variant="error" showTitle={true} />
    </div>
  );
}

export function BulkProjectsPreview(props: BulkProjectsPreviewProps) {
  const { repositories, owners, urls } = groupProjectsByType(props.validationResult.validProjects);
  const { duplicateNames, conflictNames, typeMismatchNames, invalidFormatNames } = extractErrorsByType(
    props.validationResult.errors
  );

  const invalidUrls = [...typeMismatchNames, ...invalidFormatNames];
  const hasErrors = invalidUrls.length > 0 || conflictNames.length > 0 || duplicateNames.length > 0;
  const typeErrorExplanation = getTypeErrorExplanation(
    typeMismatchNames,
    invalidFormatNames,
    props.selectedProjectType
  );

  const ownersTitle = props.selectedProjectType === ProjectItemType.GITHUB_OWNER ? "Organizations/Users" : "Owners";

  return (
    <div className="space-y-2">
      <ValidProjectsSection title="Repositories" items={repositories} variant="accent" />
      <ValidProjectsSection title={ownersTitle} items={owners} variant="highlight" />
      <ValidProjectsSection title="URLs" items={urls} variant="neutral" />

      {hasErrors && (
        <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm font-semibold text-red-900">Invalid URLs</div>

          <ErrorSection
            title="Wrong type or format"
            count={invalidUrls.length}
            explanation={typeErrorExplanation || undefined}
            items={invalidUrls}
          />

          <ErrorSection
            title="Already in your list"
            count={conflictNames.length}
            explanation="These projects already exist in your list. Please remove them. You can only add new projects."
            items={conflictNames}
          />

          <ErrorSection
            title="Duplicates"
            count={duplicateNames.length}
            explanation="These projects appear multiple times in your input"
            items={duplicateNames}
          />
        </div>
      )}
    </div>
  );
}
