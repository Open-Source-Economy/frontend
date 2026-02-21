import { config, Env } from "./index";

/**
 * Feature visibility configuration
 * Define which environments a feature should be visible in by providing an array of allowed environments
 */

/**
 * Check if a feature should be visible based on allowed environments
 */
export function isFeatureVisible(allowedEnvironments: readonly Env[]): boolean {
  return allowedEnvironments.includes(config.env);
}

/**
 * Common environment combinations for convenience
 */
export const envGroups = {
  /** Only visible in local development */
  localOnly: [Env.Local] as const,
  /** Visible in local and dev environments */
  localAndDev: [Env.Local, Env.Development] as const,
  /** Visible in all non-production environments */
  nonProduction: [Env.Local, Env.Development, Env.Stage] as const,
  /** Disabled feature */
  none: [] as const,
} as const;

/**
 * Feature flags registry
 * Central place to configure all feature flags in the application
 * Specify an array of environments where each feature should be visible
 */
export const features = {
  /** Enterprise service request buttons (NDA, SLA, Ecosystem Growth) */
  enterpriseServiceButtons: envGroups.localOnly,

  /** FAQ page in header navigation */
  faqPage: envGroups.localAndDev,

  /** Fund distribution summary section */
  fundDistributionSummary: envGroups.localAndDev,

  /** Privacy policy references */
  privacyPolicy: envGroups.localAndDev,

  /** Featured vendors section */
  featuredVendors: envGroups.nonProduction,

  /** Supporters section */
  becomeASponsor: envGroups.localAndDev,

  epicmaxSponsor: envGroups.nonProduction,

  /** Mission link on sponsorship page */
  sponsorshipMissionLink: envGroups.localAndDev,

  /** Sponsorship button in header navigation */
  sponsorshipButton: envGroups.localAndDev,

  /** Project verification notice in onboarding Step 2 */
  projectVerificationNotice: envGroups.localOnly,

  /** Dev Controls on Pricing Page */
  devControls: envGroups.localAndDev,

  // Add more features here as needed
  // Custom combinations:
  // exampleFeature: [Env.Local, Env.Staging] as const,
  // Or use predefined groups:
  // anotherFeature: envGroups.localOnly,
} as const;

/**
 * Check if a specific feature is visible
 */
export function isVisible(feature: keyof typeof features): boolean {
  return isFeatureVisible(features[feature]);
}
