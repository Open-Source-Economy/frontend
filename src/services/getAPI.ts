/**
 * Resolved service singletons (Lonio pattern).
 *
 * Mock / real selection happens once at module load time.
 * Consumers import the singleton directly — no factory calls needed.
 *
 * This file imports mocks, but service implementation files do not,
 * which keeps the dependency graph acyclic.
 */
import { config } from "src/utils";
import { type ProjectService, projectServiceImpl } from "./project.service";
import { type FundingService, fundingServiceImpl } from "./funding.service";
import { type StripeService, stripeServiceImpl } from "./stripe.service";
import { type CommunicationService, communicationServiceImpl } from "./communication.service";
import { type AuthBackendAPI, AuthBackendAPIImpl } from "./AuthBackendAPI";
import { type OnboardingBackendAPI, OnboardingBackendAPIImpl } from "./OnboardingBackendAPI";
import { type AdminBackendAPI, AdminBackendAPIImpl } from "./AdminBackendAPI";
import { projectServiceMock } from "src/__mocks__/project.service.mock";
import { fundingServiceMock } from "src/__mocks__/funding.service.mock";
import { stripeServiceMock } from "src/__mocks__/stripe.service.mock";
import { communicationServiceMock } from "src/__mocks__/communication.service.mock";
import { AuthBackendAPIMock } from "src/__mocks__/AuthBackendAPI.mock";
import { OnboardingBackendAPIMock } from "src/__mocks__/OnboardingBackendAPI.mock";
import { api } from "./apiClient";

// --- Feature service singletons ---

export const projectService: ProjectService = config.api.useMock ? projectServiceMock : projectServiceImpl;
export const fundingService: FundingService = config.api.useMock ? fundingServiceMock : fundingServiceImpl;
export const stripeService: StripeService = config.api.useMock ? stripeServiceMock : stripeServiceImpl;
export const communicationService: CommunicationService = config.api.useMock
  ? communicationServiceMock
  : communicationServiceImpl;

// --- Existing feature API singletons (unchanged) ---

export const authBackendAPI: AuthBackendAPI = config.api.useMock
  ? new AuthBackendAPIMock()
  : new AuthBackendAPIImpl(api);
export const onboardingBackendAPI: OnboardingBackendAPI = config.api.useMock
  ? new OnboardingBackendAPIMock()
  : new OnboardingBackendAPIImpl(api);
export const adminBackendAPI: AdminBackendAPI = new AdminBackendAPIImpl(api);
