import * as dto from "@open-source-economy/api-types";
import {
  Company,
  CompanyId,
  GithubData,
  Issue,
  IssueId,
  Owner,
  OwnerId,
  OwnerType,
  Provider,
  Repository,
  RepositoryId,
  ResponseTimeType,
  Service,
  ServiceId,
  ServiceType,
  ThirdPartyUser,
  ThirdPartyUserId,
  User,
  UserId,
  UserRole,
} from "@open-source-economy/api-types";

export * from "./BackendAPI.mock";
export * from "./AuthBackendAPI.mock";
export * from "./OnboardingBackendAPI.mock";

export const ownerId = new OwnerId("Open-Source-Economy", 141809657);
export const repositoryId = new RepositoryId(ownerId, "frontend", 701996033);
export const issueId = new IssueId(repositoryId, 3, 2538344642);

export function generateRandomText(maxWords: number): string {
  const words = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "ut",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
  ];
  const randomLength = Math.floor(Math.random() * maxWords) + 1;
  return Array.from({ length: randomLength }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
}

export const owner = new Owner(
  ownerId,
  OwnerType.Organization,
  "https://github.com/Open-Source-Economy",
  "https://avatars.githubusercontent.com/u/141809657?v=4",
);

export function repository(): Repository {
  return new Repository(repositoryId, "https://github.com/Open-Source-Economy/frontend", generateRandomText(30));
}

export const issue = new Issue(
  issueId,
  "Test issue - to be added in our unit tests",
  "https://github.com/Open-Source-Economy/frontend/issues/3",
  new Date("2024-09-20T09:34:07Z"),
  null,
  new OwnerId("LaurianeOSE", 141809342),
  "noe rfi efier gisrgl l yrfvbisleurgfs;ieur bgf;iear rgfiauerf ",
);

export const userId = new UserId("141809342");
export const thirdPartyUser = new ThirdPartyUser(Provider.Github, new ThirdPartyUserId("141809342"), null, new GithubData(owner));
export const user: User = {
  id: userId,
  name: "Lauriane",
  data: thirdPartyUser,
  role: UserRole.USER,
  preferredCurrency: undefined,
  termsAcceptedVersion: undefined,
};

export const companyId = new CompanyId("141809657");
export const company = new Company(companyId, "7324ry34r", "Open-Source-Economy");

// --- Shared Service Data ---
export const bugFixingService: Service = {
  id: new ServiceId("bug-fixing-service-id"),
  serviceType: "Support" as ServiceType,
  name: "Bug Fixing",
  description: "Fixing bugs in existing codebases.",
  isCustom: false,
  hasResponseTime: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const featureImplService: Service = {
  id: new ServiceId("feature-impl-service-id"),
  serviceType: "Development" as ServiceType,
  name: "Feature Implementation",
  description: "Implementing new features based on specifications.",
  isCustom: false,
  hasResponseTime: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const serviceHierarchy: dto.ServiceHierarchyItem[] = [
  {
    category: "Development" as ServiceType,
    services: [featureImplService],
  },
  {
    category: "Support" as ServiceType,
    services: [bugFixingService],
  },
  {
    category: "Advisory" as ServiceType,
    services: [], // Example of an empty category
  },
];

export const developerBugFixingService: dto.DeveloperServiceEntry = {
  service: bugFixingService,
  developerService: {
    id: new dto.DeveloperServiceId("DeveloperServiceId"),
    developerProfileId: new dto.DeveloperProfileId("some-profile-id"),
    developerProjectItemIds: [new dto.DeveloperProjectItemId("some ProjectItemId"), new dto.DeveloperProjectItemId("some ProjectItemId")],
    serviceId: bugFixingService.id,
    hourlyRate: 80,
    responseTimeHours: ResponseTimeType.FourHours,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
