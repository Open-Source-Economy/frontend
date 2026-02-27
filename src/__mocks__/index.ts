import * as dto from "@open-source-economy/api-types";

export * from "./AuthBackendAPI.mock";
export * from "./OnboardingBackendAPI.mock";

export const ownerId: dto.OwnerId = { login: "Open-Source-Economy" } as dto.OwnerId;
export const repositoryId: dto.RepositoryId = {
  ownerId: ownerId,
  name: "frontend",
  githubId: 701996033,
} as dto.RepositoryId;
export const issueId: dto.IssueId = {
  repositoryId: repositoryId,
  number: 3,
  githubId: 2538344642,
} as dto.IssueId;

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

export const owner: dto.Owner = {
  id: ownerId,
  type: dto.OwnerType.Organization,
  htmlUrl: "https://github.com/Open-Source-Economy",
  avatarUrl: "https://avatars.githubusercontent.com/u/141809657?v=4",
};

export function repository(): dto.Repository {
  return {
    id: repositoryId,
    htmlUrl: "https://github.com/Open-Source-Economy/frontend",
    description: generateRandomText(30),
  };
}

export const issue: dto.Issue = {
  id: issueId,
  title: "Test issue - to be added in our unit tests",
  htmlUrl: "https://github.com/Open-Source-Economy/frontend/issues/3",
  createdAt: "2024-09-20T09:34:07Z" as dto.ISODateTimeString,
  closedAt: null,
  openBy: { login: "LaurianeOSE" } as dto.OwnerId,
  body: "noe rfi efier gisrgl l yrfvbisleurgfs;ieur bgf;iear rgfiauerf ",
};

export const userId: dto.UserId = "141809342" as dto.UserId;
export const thirdPartyUser: dto.ThirdPartyUser = {
  provider: dto.Provider.Github,
  email: null,
  providerData: {
    owner: owner,
  },
};
export const user: dto.User = {
  id: userId,
  name: "Lauriane",
  role: dto.UserRole.USER,
  preferredCurrency: undefined,
  termsAcceptedVersion: undefined,
};

export const companyId: dto.CompanyId = "141809657" as dto.CompanyId;
export const company: dto.Company = {
  id: companyId,
  taxId: "7324ry34r",
  name: "Open-Source-Economy",
  addressId: null,
};

// --- Shared Service Data ---
export const bugFixingService: dto.Service = {
  id: "bug-fixing-service-id" as dto.ServiceId,
  serviceType: dto.ServiceType.SUPPORT,
  name: "Bug Fixing",
  description: "Fixing bugs in existing codebases.",
  isCustom: false,
  hasResponseTime: true,
  createdAt: new Date().toISOString() as dto.ISODateTimeString,
  updatedAt: new Date().toISOString() as dto.ISODateTimeString,
};

export const featureImplService: dto.Service = {
  id: "feature-impl-service-id" as dto.ServiceId,
  serviceType: dto.ServiceType.DEVELOPMENT,
  name: "Feature Implementation",
  description: "Implementing new features based on specifications.",
  isCustom: false,
  hasResponseTime: false,
  createdAt: new Date().toISOString() as dto.ISODateTimeString,
  updatedAt: new Date().toISOString() as dto.ISODateTimeString,
};

export const serviceHierarchy: dto.ServiceHierarchyItem[] = [
  {
    category: dto.ServiceType.DEVELOPMENT,
    services: [featureImplService],
  },
  {
    category: dto.ServiceType.SUPPORT,
    services: [bugFixingService],
  },
  {
    category: dto.ServiceType.ADVISORY,
    services: [], // Example of an empty category
  },
];

export const developerBugFixingService: dto.DeveloperServiceEntry = {
  service: bugFixingService,
  developerService: {
    id: "DeveloperServiceId" as dto.DeveloperServiceId,
    developerProfileId: "some-profile-id" as dto.DeveloperProfileId,
    developerProjectItemIds: [
      "some ProjectItemId" as dto.DeveloperProjectItemId,
      "some ProjectItemId" as dto.DeveloperProjectItemId,
    ],
    serviceId: bugFixingService.id,
    hourlyRate: 80,
    responseTimeHours: dto.ResponseTimeType.FourHours,
    createdAt: new Date().toISOString() as dto.ISODateTimeString,
    updatedAt: new Date().toISOString() as dto.ISODateTimeString,
  },
};
