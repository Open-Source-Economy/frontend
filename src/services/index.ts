/**
 * Services barrel — pure re-exports only, no definitions.
 *
 * The apiClient module is a leaf (no imports from other service files),
 * so it evaluates first and is always available to other modules.
 */
export * from "./apiClient";
export * from "./AuthBackendAPI";
export * from "./OnboardingBackendAPI";
export * from "./AdminBackendAPI";
export * from "./project.service";
export * from "./funding.service";
export * from "./stripe.service";
export * from "./communication.service";
export * from "./getAPI";
