import { DeveloperProjectItemEntry, ProjectItemType, SourceIdentifier } from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "./companions/SourceIdentifier.companion";
import { ProjectItemTypeCompanion } from "./companions/ProjectItemType.companion";

/**
 * Result of parsing a single URL from bulk input
 */
export interface ParsedProjectUrl {
  sourceIdentifier: SourceIdentifier;
  projectType: ProjectItemType;
  error?: string;
  detectedType?: ProjectItemType; // The type that was auto-detected (if different from expected)
}

/**
 * Result of parsing bulk URLs
 */
export interface BulkParseResult {
  validProjects: ParsedProjectUrl[];
  invalidProjects?: ParsedProjectUrl[]; // Full details about invalid projects
}

/**
 * Types of validation errors that can occur during bulk project parsing
 */
export enum BulkValidationErrorType {
  DUPLICATE = "DUPLICATE",
  INVALID_FORMAT = "INVALID_FORMAT",
  TYPE_MISMATCH = "TYPE_MISMATCH",
  CONFLICT = "CONFLICT",
}

/**
 * Represents a validation error with its type and affected projects
 */
export interface BulkValidationError {
  type: BulkValidationErrorType;
  sourceIdentifiers: SourceIdentifier[];
  displayNames: string[];
}

/**
 * Structured result of bulk validation with categorized errors
 */
export interface BulkValidationResult {
  validProjects: Array<{ sourceIdentifier: SourceIdentifier; projectType: ProjectItemType }>;
  errors: BulkValidationError[];
}

/**
 * Utility class for parsing and validating bulk project URLs
 * Handles bulk operations (extracting multiple URLs, parsing in bulk)
 * Single URL operations are delegated to SourceIdentifierCompanion
 */
export class BulkProjectUrlParser {
  /**
   * Helper to create a BulkValidationError from source identifiers
   */
  private static createValidationError(type: BulkValidationErrorType, sourceIdentifiers: SourceIdentifier[]): BulkValidationError {
    return {
      type,
      sourceIdentifiers,
      displayNames: sourceIdentifiers.map(si => SourceIdentifierCompanion.displayName(si)),
    };
  }

  /**
   * Helper to format error message with displayed items and remaining count
   */
  private static formatErrorMessage(displayed: string[], remaining: number, baseMessage: string): string {
    const itemsText = displayed.join(", ");
    const remainingText = remaining > 0 ? ` (${remaining} more)` : "";
    return `${baseMessage}: ${itemsText}${remainingText}`;
  }

  /**
   * Parses a single URL and returns its parsed information
   * Delegates to SourceIdentifierCompanion for single URL operations
   * @param url The URL to parse
   * @param expectedProjectType The expected project type (required)
   * @param allowShorthand Whether to allow shorthand URLs (default: false)
   * @returns ParsedProjectUrl object
   */
  static parseSingleUrl(url: string, expectedProjectType: ProjectItemType, allowShorthand: boolean = false): ParsedProjectUrl {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      return {
        sourceIdentifier: trimmedUrl,
        projectType: expectedProjectType,
        error: "URL cannot be empty",
      };
    }

    const sourceIdentifier = SourceIdentifierCompanion.fromUrlOrShorthand(trimmedUrl);
    const isValid = SourceIdentifierCompanion.validateUrlForType(trimmedUrl, expectedProjectType, allowShorthand);

    if (!isValid) {
      const detectedType = SourceIdentifierCompanion.detectProjectType(trimmedUrl);
      return {
        sourceIdentifier,
        projectType: expectedProjectType,
        detectedType: detectedType || undefined,
        error: this.getTypeMismatchError(trimmedUrl, expectedProjectType, detectedType),
      };
    }

    return {
      sourceIdentifier,
      projectType: expectedProjectType,
    };
  }

  /**
   * Parses bulk text input containing multiple URLs separated by various delimiters
   * Supports: newlines, commas, semicolons, and multiple spaces
   * @param bulkText The text containing URLs separated by various delimiters
   * @param expectedProjectType The expected project type (required)
   * @param allowShorthand Whether to allow shorthand URLs (default: false)
   * @returns BulkParseResult with parsed and validated URLs
   */
  static parseBulkUrls(bulkText: string, expectedProjectType: ProjectItemType, allowShorthand: boolean = false): BulkParseResult {
    // Extract URLs using the enhanced extraction method
    const urls = this.extractUrlsFromText(bulkText);

    const validProjects: ParsedProjectUrl[] = [];
    const invalidProjects: ParsedProjectUrl[] = [];

    urls.forEach(url => {
      const parsed = this.parseSingleUrl(url, expectedProjectType, allowShorthand);

      if (parsed.error) {
        invalidProjects.push(parsed);
      } else {
        validProjects.push(parsed);
      }
    });

    return {
      validProjects,
      invalidProjects,
    };
  }

  /**
   * Gets a descriptive error message for type mismatch
   * @param url The URL that failed validation
   * @param expectedType The expected project type
   * @param detectedType The type that was actually detected (if any)
   * @returns Error message string
   */
  private static getTypeMismatchError(url: string, expectedType: ProjectItemType, detectedType: ProjectItemType | null): string {
    const expectedLabel = ProjectItemTypeCompanion.label(expectedType);

    if (detectedType) {
      const detectedLabel = ProjectItemTypeCompanion.label(detectedType);
      return `This URL is a ${detectedLabel}, but you selected ${expectedLabel}. Please use ${expectedLabel} URLs only, or change the project type.`;
    }

    return `This URL is not a valid ${expectedLabel}. Please check the URL format.`;
  }

  /**
   * Formats validation errors for display with detailed information
   * @param invalidProjects Array of invalid parsed projects (with error details)
   * @param maxDisplay Maximum number of URLs to display in error message
   * @returns Formatted error message
   */
  static formatValidationError(invalidProjects: ParsedProjectUrl[], maxDisplay: number = 3): string {
    if (invalidProjects.length === 0) {
      return "";
    }

    const displayed = invalidProjects.slice(0, maxDisplay);
    const remaining = invalidProjects.length - maxDisplay;

    const typeMismatches = displayed.filter(p => p.detectedType && p.detectedType !== p.projectType);
    const invalidFormat = displayed.filter(p => !p.detectedType);

    const messages: string[] = [];

    if (typeMismatches.length > 0) {
      const expectedLabel = ProjectItemTypeCompanion.label(typeMismatches[0].projectType);
      const urls = typeMismatches.map(p => SourceIdentifierCompanion.displayName(p.sourceIdentifier));
      messages.push(this.formatErrorMessage(urls, remaining, `Some URLs don't match the selected type (${expectedLabel})`));
    }

    if (invalidFormat.length > 0) {
      const urls = invalidFormat.map(p => SourceIdentifierCompanion.displayName(p.sourceIdentifier));
      messages.push(this.formatErrorMessage(urls, 0, "Invalid URLs"));
    }

    if (remaining > 0 && typeMismatches.length === 0 && invalidFormat.length === 0) {
      messages.push(`(${remaining} more invalid URL${remaining > 1 ? "s" : ""})`);
    }

    return messages.join(". ");
  }

  /**
   * Extracts URLs from text and normalizes them for duplicate detection.
   * This is a public method that can be used to get all URLs from bulk input
   * for duplicate checking across both valid and invalid URLs.
   *
   * @param text The text containing URLs separated by various delimiters
   * @returns Array of extracted URL strings
   */
  static extractUrlsFromText(text: string): string[] {
    if (!text || text.trim().length === 0) {
      return [];
    }

    // Split by common separators: newlines, commas, semicolons, and spaces/tabs
    // This regex splits on:
    // - Newlines (\n)
    // - Commas (,)
    // - Semicolons (;)
    // - Spaces or tabs (1+ consecutive whitespace characters, but not newlines)
    const separators = /[\n,;]+|[ \t]+/;

    const urls = text
      .split(separators)
      .map(url => url.trim())
      .filter(url => url.length > 0);

    return urls;
  }

  /**
   * Validates bulk URLs and returns a structured result with categorized errors.
   * This function parses the input, detects duplicates, invalid formats, type mismatches, and conflicts.
   *
   * @param bulkText The text containing URLs separated by various delimiters
   * @param expectedProjectType The expected project type (required)
   * @param existingProjects Array of existing project entries to check for conflicts
   * @param excludeEntry Optional entry to exclude from conflict checks (e.g., when editing)
   * @param allowShorthand Whether to allow shorthand URLs (default: false)
   * @returns BulkValidationResult with valid projects and categorized errors
   */
  static validateBulkUrls(
    bulkText: string,
    expectedProjectType: ProjectItemType,
    existingProjects: DeveloperProjectItemEntry[] = [],
    excludeEntry?: DeveloperProjectItemEntry | null,
    allowShorthand: boolean = false,
  ): BulkValidationResult {
    const errors: BulkValidationError[] = [];

    // Parse bulk URLs
    const parseResult = this.parseBulkUrls(bulkText, expectedProjectType, allowShorthand);

    // Convert valid projects to the format expected by the component
    const validProjects = parseResult.validProjects.map(parsed => ({
      sourceIdentifier: parsed.sourceIdentifier,
      projectType: parsed.projectType,
    }));

    // Check for duplicates in valid projects
    const duplicateGroups = SourceIdentifierCompanion.findDuplicateUrls(validProjects.map(p => p.sourceIdentifier));
    if (duplicateGroups.length > 0) {
      const duplicateSourceIdentifiers = Array.from(new Set(duplicateGroups.flat()));
      errors.push(this.createValidationError(BulkValidationErrorType.DUPLICATE, duplicateSourceIdentifiers));
    }

    // Check for invalid format and type mismatches
    if (parseResult.invalidProjects && parseResult.invalidProjects.length > 0) {
      const typeMismatches = parseResult.invalidProjects.filter(p => p.detectedType && p.detectedType !== p.projectType);
      const invalidFormat = parseResult.invalidProjects.filter(p => !p.detectedType);

      if (typeMismatches.length > 0) {
        errors.push(
          this.createValidationError(
            BulkValidationErrorType.TYPE_MISMATCH,
            typeMismatches.map(p => p.sourceIdentifier),
          ),
        );
      }

      if (invalidFormat.length > 0) {
        errors.push(
          this.createValidationError(
            BulkValidationErrorType.INVALID_FORMAT,
            invalidFormat.map(p => p.sourceIdentifier),
          ),
        );
      }
    }

    // Check for conflicts with existing projects
    if (existingProjects.length > 0 && validProjects.length > 0) {
      const newSourceIdentifiers = validProjects.map(p => p.sourceIdentifier);

      const existingSourceIdentifiers = existingProjects
        .filter(existing => {
          if (
            excludeEntry &&
            SourceIdentifierCompanion.equals(existing.projectItem.sourceIdentifier, excludeEntry.projectItem.sourceIdentifier) &&
            existing.projectItem.projectItemType === excludeEntry.projectItem.projectItemType
          ) {
            return false;
          }
          return existing.projectItem.projectItemType === expectedProjectType;
        })
        .map(existing => existing.projectItem.sourceIdentifier);

      const conflictingSourceIdentifiers = SourceIdentifierCompanion.findIncludedUrls(newSourceIdentifiers, existingSourceIdentifiers);

      if (conflictingSourceIdentifiers.length > 0) {
        errors.push(this.createValidationError(BulkValidationErrorType.CONFLICT, conflictingSourceIdentifiers));
      }
    }

    return {
      validProjects,
      errors,
    };
  }

  /**
   * Gets the base error message for a validation error type
   */
  private static getErrorTypeMessage(type: BulkValidationErrorType): string {
    switch (type) {
      case BulkValidationErrorType.DUPLICATE:
        return "Duplicate projects found";
      case BulkValidationErrorType.TYPE_MISMATCH:
        return "Some URLs don't match the selected type";
      case BulkValidationErrorType.INVALID_FORMAT:
        return "Invalid URLs";
      case BulkValidationErrorType.CONFLICT:
        return "These projects already exist";
    }
  }

  /**
   * Gets the action message for a validation error type
   */
  private static getErrorActionMessage(type: BulkValidationErrorType): string {
    switch (type) {
      case BulkValidationErrorType.DUPLICATE:
        return "Please remove duplicates";
      case BulkValidationErrorType.TYPE_MISMATCH:
        return "Please use the correct project type";
      case BulkValidationErrorType.INVALID_FORMAT:
        return "Please check the URL format";
      case BulkValidationErrorType.CONFLICT:
        return "Please remove them or edit the existing entries";
    }
  }

  /**
   * Formats validation errors into user-friendly error messages.
   *
   * @param errors Array of validation errors to format
   * @param maxDisplay Maximum number of items to display per error type (default: 3)
   * @returns Combined error message string
   */
  static formatValidationErrors(errors: BulkValidationError[], maxDisplay: number = 3): string {
    if (errors.length === 0) {
      return "";
    }

    const errorMessages = errors.map(error => {
      const displayed = error.displayNames.slice(0, maxDisplay);
      const remaining = error.displayNames.length - maxDisplay;
      const baseMessage = this.getErrorTypeMessage(error.type);
      const actionMessage = this.getErrorActionMessage(error.type);

      return `${this.formatErrorMessage(displayed, remaining, baseMessage)}. ${actionMessage}`;
    });

    return errorMessages.join(". ");
  }
}
