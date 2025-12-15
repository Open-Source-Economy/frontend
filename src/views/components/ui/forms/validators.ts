/**
 * Validation functions for form inputs
 * Used across the design system for consistent validation logic
 */

import { GithubUrls } from "src/ultils/GithubUrls";

/**
 * Validates a name field (required and format)
 * @param value - The name value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateName = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Name is required.";
  }
  if (!/^[a-zA-ZÀ-ÿ-'. ]+$/u.test(value)) {
    return "Name can only contain letters, hyphens, apostrophes, and periods.";
  }
  return undefined;
};

/**
 * Validates an email field (required and format)
 * @param value - The email value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Email is required.";
  }
  if (!/\S+@\S+\.\S+/.test(value)) {
    return "Please enter a valid email address.";
  }
  return undefined;
};

/**
 * Validates a required field
 * @param value - The field value
 * @param label - The label to display in error message
 * @returns Error message if empty, undefined if valid
 */
export const validateRequired = (value: string, label: string): string | undefined => {
  if (!value.trim()) {
    return `${label} is required.`;
  }
  return undefined;
};

/**
 * Validates weekly commitment hours (range 0-168)
 * @param value - The weekly commitment value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateWeeklyCommitment = (value: number | undefined | null): string | undefined => {
  if (value === undefined || value === null) {
    return "Weekly hours must be specified";
  }
  if (value < 0 || value > 168) {
    return "Please enter a value between 0 and 168";
  }
  return undefined;
};

/**
 * Validates hourly rate (required and must be positive)
 * @param value - The hourly rate value to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateHourlyRate = (value: number | undefined | null): string | undefined => {
  if (value === undefined || value === null) {
    return "Hourly rate must be specified";
  }
  if (value <= 0) {
    return "Please enter a valid positive number";
  }
  return undefined;
};

/**
 * Validates a GitHub owner URL or shorthand
 * @param value - The GitHub URL or owner name to validate
 * @param allowShorthand - Whether to allow shorthand like "owner" (default: true)
 * @returns Error message if invalid, undefined if valid
 */
export const validateGitHubOwnerUrl = (value: string, allowShorthand: boolean = true): string | undefined => {
  if (!value.trim()) {
    return "GitHub profile URL is required.";
  }

  const ownerId = GithubUrls.extractOwnerId(value, allowShorthand);

  if (!ownerId) {
    return allowShorthand
      ? "Please enter a valid GitHub profile URL or username (e.g., https://github.com/username or username)."
      : "Please enter a valid GitHub profile URL (e.g., https://github.com/username).";
  }

  return undefined;
};

/**
 * Validates a positive integer (strictly positive, whole number)
 * @param value - The value to validate (as string or number)
 * @returns Error message if invalid, undefined if valid
 */
export const validatePositiveInteger = (value: string | number): string | undefined => {
  const stringValue = typeof value === "number" ? value.toString() : value.trim();

  if (!stringValue) {
    return "Amount is required.";
  }

  // Check if it's a valid integer (no decimals, no negative)
  if (!/^\d+$/.test(stringValue)) {
    return "Please enter a valid positive whole number.";
  }

  const numValue = parseInt(stringValue, 10);

  if (isNaN(numValue) || numValue <= 0) {
    return "Please enter a positive number greater than zero.";
  }

  return undefined;
};
