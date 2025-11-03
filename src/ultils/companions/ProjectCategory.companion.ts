import { ProjectCategory } from "@open-source-economy/api-types";

/**
 * Frontend companion utilities for ProjectCategory
 */
export namespace ProjectCategoryCompanion {
  /**
   * Convert category enum value to human-readable label
   */
  export function toLabel(category: ProjectCategory): string {
    const labels: Record<ProjectCategory, string> = {
      [ProjectCategory.ProgrammingLanguage]: "Programming Language",
      [ProjectCategory.Runtime]: "Runtime",
      [ProjectCategory.Frontend]: "Frontend",
      [ProjectCategory.Backend]: "Backend",
      [ProjectCategory.Mobile]: "Mobile",
      [ProjectCategory.Desktop]: "Desktop",
      [ProjectCategory.Database]: "Database",
      [ProjectCategory.MachineLearning]: "Machine Learning",
      [ProjectCategory.DataProcessing]: "Data Processing",
      [ProjectCategory.Hardware]: "Hardware",
      [ProjectCategory.Infrastructure]: "Infrastructure",
      [ProjectCategory.MonitoringObservability]: "Monitoring & Observability",
      [ProjectCategory.ApiNetworking]: "API & Networking",
      [ProjectCategory.BuildTools]: "Build Tools",
      [ProjectCategory.Testing]: "Testing",
      [ProjectCategory.Documentation]: "Documentation",
      [ProjectCategory.Security]: "Security",
      [ProjectCategory.Library]: "Library",
    };
    return labels[category];
  }
}
