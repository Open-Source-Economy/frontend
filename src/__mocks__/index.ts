import {
  Company,
  CompanyId,
  Email,
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
} from "src/model";

export * from "./BackendAPI.mock";
export * from "./AuthBackendAPI.mock";

export const ownerId = new OwnerId("Open-Source-Economy", 141809657);
export const repositoryId = new RepositoryId(ownerId, "frontend", 701996033);
export const issueId = new IssueId(repositoryId, 3, 2538344642);

export const owner = new Owner(
  ownerId,
  OwnerType.Organization,
  "https://github.com/Open-Source-Economy",
  "https://avatars.githubusercontent.com/u/141809657?v=4",
);
export const repository = new Repository(repositoryId, "https://github.com/Open-Source-Economy/frontend", undefined);
export const issue = new Issue(
  issueId,
  "Test issue - to be added in our unit tests",
  "https://github.com/Open-Source-Economy/frontend/issues/3",
  new Date("2024-09-20T09:34:07Z"),
  null,
  new OwnerId("LaurianeOSE", 141809342),
  undefined,
);

export const userId = new UserId("141809342");
export const thirdPartyUser = new ThirdPartyUser(Provider.Github, new ThirdPartyUserId("141809342"), [new Email("email", null)], new GithubData(owner));
export const user = new User(userId, thirdPartyUser, UserRole.USER);

export const companyId = new CompanyId("141809657");
export const company = new Company(companyId, "7324ry34r", "Open-Source-Economy");
