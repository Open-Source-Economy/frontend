import * as dto from "@open-source-economy/api-types";

/**
 * Frontend companion utilities for ProjectCategory
 */
export namespace ProjectCategoryCompanion {
  /**
   * Convert category enum value to human-readable label
   */
  export function toLabel(category: dto.ProjectCategory): string {
    const labels: Record<dto.ProjectCategory, string> = {
      [dto.ProjectCategory.ProgrammingLanguage]: "Programming Language",
      [dto.ProjectCategory.Runtime]: "Runtime",
      [dto.ProjectCategory.Frontend]: "Frontend",
      [dto.ProjectCategory.Backend]: "Backend",
      [dto.ProjectCategory.Mobile]: "Mobile",
      [dto.ProjectCategory.Desktop]: "Desktop",
      [dto.ProjectCategory.Database]: "Database",
      [dto.ProjectCategory.MachineLearning]: "Machine Learning",
      [dto.ProjectCategory.DataProcessing]: "Data Processing",
      [dto.ProjectCategory.Hardware]: "Hardware",
      [dto.ProjectCategory.Infrastructure]: "Infrastructure",
      [dto.ProjectCategory.MonitoringObservability]: "Monitoring & Observability",
      [dto.ProjectCategory.ApiNetworking]: "API & Networking",
      [dto.ProjectCategory.BuildTools]: "Build Tools",
      [dto.ProjectCategory.Testing]: "Testing",
      [dto.ProjectCategory.Documentation]: "Documentation",
      [dto.ProjectCategory.Security]: "Security",
      [dto.ProjectCategory.Library]: "Library",
    };
    return labels[category];
  }
}
