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
  ThirdPartyUser,
  ThirdPartyUserId,
  User,
  UserId,
  UserRole,
} from "@open-source-economy/api-types";

export * from "./BackendAPI.mock";
export * from "./AuthBackendAPI.mock";

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
export const user = new User(userId, null, thirdPartyUser, UserRole.USER, undefined, undefined);

export const companyId = new CompanyId("141809657");
export const company = new Company(companyId, "7324ry34r", "Open-Source-Economy");
