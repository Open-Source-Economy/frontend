import { ProjectItemType } from "@open-source-economy/api-types";

export interface UrlConfig {
  label: string;
  placeholder: string;
  hint: string;
  bulkPlaceholder: string;
  bulkHint: string;
}

export function getUrlConfig(projectType: ProjectItemType | null): UrlConfig {
  if (!projectType) {
    return {
      label: "Project URL",
      placeholder: "https://...",
      hint: "Any public URL to your project",
      bulkPlaceholder:
        "https://example.com/project1, https://example.com/project2\nOr one per line:\nhttps://example.com/project1\nhttps://example.com/project2",
      bulkHint: "Enter project URLs separated by newlines, commas, semicolons, or multiple spaces.",
    };
  }

  switch (projectType) {
    case ProjectItemType.GITHUB_REPOSITORY:
      return {
        label: "GitHub Repository URL",
        placeholder: "https://github.com/username/repository",
        hint: "e.g., https://github.com/facebook/react",
        bulkPlaceholder: `https://github.com/facebook/react, https://github.com/vuejs/vue, https://github.com/angular/angular\nOr one per line:\nhttps://github.com/facebook/react\nhttps://github.com/vuejs/vue`,
        bulkHint: "Enter GitHub repository URLs separated by newlines, commas, semicolons, or multiple spaces.",
      };
    case ProjectItemType.GITHUB_OWNER:
      return {
        label: "GitHub Organization URL",
        placeholder: "https://github.com/organization",
        hint: "e.g., https://github.com/nodejs",
        bulkPlaceholder: `https://github.com/nodejs, https://github.com/facebook, https://github.com/google\nOr one per line:\nhttps://github.com/nodejs\nhttps://github.com/facebook`,
        bulkHint: "Enter GitHub organization URLs separated by newlines, commas, semicolons, or multiple spaces.",
      };
    default:
      return {
        label: "Project URL",
        placeholder: "https://...",
        hint: "Any public URL to your project",
        bulkPlaceholder: `https://example.com/project1, https://example.com/project2\nOr one per line:\nhttps://example.com/project1\nhttps://example.com/project2`,
        bulkHint: "Enter project URLs separated by newlines, commas, semicolons, or multiple spaces.",
      };
  }
}
