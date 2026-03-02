/**
 * Services barrel — pure re-exports only, no definitions.
 *
 * The apiClient module is a leaf (no imports from other service files),
 * so it evaluates first and is always available to other modules.
 */
export * from "src/services/apiClient";
export * from "src/services/AuthBackendAPI";
export * from "src/services/OnboardingBackendAPI";
export * from "src/services/AdminBackendAPI";
export * from "src/services/project.service";
export * from "src/services/funding.service";
export * from "src/services/stripe.service";
export * from "src/services/communication.service";
export * from "src/services/getAPI";
