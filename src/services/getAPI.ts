/**
 * Resolved service singletons (Lonio pattern).
 *
 * Mock / real selection happens once at module load time.
 * Consumers import the singleton directly — no factory calls needed.
 *
 * This file imports mocks, but service implementation files do not,
 * which keeps the dependency graph acyclic.
 */
import { config } from "src/ultils";
import { api } from "./apiClient";
import { type BackendAPI, BackendAPIImpl } from "./BackendAPI";
import { type AuthBackendAPI, AuthBackendAPIImpl } from "./AuthBackendAPI";
import { type OnboardingBackendAPI, OnboardingBackendAPIImpl } from "./OnboardingBackendAPI";
import { type AdminBackendAPI, AdminBackendAPIImpl } from "./AdminBackendAPI";
import { BackendAPIMock } from "src/__mocks__/BackendAPI.mock";
import { AuthBackendAPIMock } from "src/__mocks__/AuthBackendAPI.mock";
import { OnboardingBackendAPIMock } from "src/__mocks__/OnboardingBackendAPI.mock";

// --- Resolved singletons (preferred) ---

export const backendAPI: BackendAPI = config.api.useMock ? new BackendAPIMock() : new BackendAPIImpl(api);
export const authBackendAPI: AuthBackendAPI = config.api.useMock
  ? new AuthBackendAPIMock()
  : new AuthBackendAPIImpl(api);
export const onboardingBackendAPI: OnboardingBackendAPI = config.api.useMock
  ? new OnboardingBackendAPIMock()
  : new OnboardingBackendAPIImpl(api);
export const adminBackendAPI: AdminBackendAPI = new AdminBackendAPIImpl(api);

// --- Backward-compatible factory functions (for v1 hooks that call inside function bodies) ---

export const getBackendAPI = (): BackendAPI => backendAPI;
export const getAuthBackendAPI = (): AuthBackendAPI => authBackendAPI;
export const getOnboardingBackendAPI = (): OnboardingBackendAPI => onboardingBackendAPI;
export const getAdminBackendAPI = (): AdminBackendAPI => adminBackendAPI;
