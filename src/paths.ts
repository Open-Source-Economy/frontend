import * as dto from "@open-source-economy/api-types";
import { type ProjectId, isOwnerId } from "src/ultils/local-types";

export const paths = {
  // Static routes
  HOME: "/",
  PRIVACY: "/privacy",
  PROJECTS: "/projects",
  PROJECT_DETAIL: (owner: string, repo?: string) => (repo ? `/project/${owner}/${repo}` : `/project/${owner}`),
  PROJECT_DETAIL_ROUTE_OWNER: `/project/:ownerParam`,
  PROJECT_DETAIL_ROUTE_REPO: `/project/:ownerParam/:repoParam`,
  SERVICES: "/services",
  FAQ: "/faq",
  CONTACT: "/contact",
  SPONSORSHIP: "/sponsorship",

  SOCIALS: {
    LINKEDIN: "https://www.linkedin.com/company/open-source-economy",
    TWITTER: "https://x.com/OS_Economy",
    GITHUB: "https://github.com/Open-Source-Economy",
    MASTODON: "https://mastodon.social/@OS_Economy",
    YOUTUBE: "https://www.youtube.com/@OpenSourceEconomy-hn3tg",
    ZEFIX: "https://zefix.ch/en/search/entity/list/firm/1637128",
  },

  LOGOUT: "/logout",
  AUTH: {
    IDENTIFY: "/auth/identify",
    GITHUB: "/auth/github",
    PASSWORD: "/auth/password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CALLBACK: "/auth/callback",
  },
  ISSUES: "/issues",
  FUND_ISSUES: "/fund-issues",
  MANAGE_ISSUES: "/manage-issues",
  PROJECT_ITEMS_WITH_DETAILS: "/project-items-details",
  REQUEST_MAINTAINER_RIGHTS: "/request-maintainer-rights",
  CHECKOUT_SUCCESS: "/checkout/success",
  DEVELOPER_OLD: "/developer-old", // TODO: to delete
  USER: "/user",
  WHITE_PAPER: "/white-paper",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  DASHBOARD: "/dashboard",
  HOW_ITS_WORK: "/how-its-work",
  PRICING: "/pricing",
  VISION: "/vision",
  SAVINGS: "/savings",
  MISSION: "/mission",

  TERMS: "/terms",
  BLOG: "https://blog.open-source-economy.com/",

  // Onboarding routes
  DEVELOPER_LANDING: "/developer",
  DEVELOPER_ONBOARDING: "/developer-onboarding",
  DEVELOPER_ONBOARDING_COMPLETED: "/developer-onboarding-completed",

  // Admin routes grouped under ADMIN
  ADMIN: {
    HOME: "/admin",
    MAINTAINERS: "/admin/maintainers",
    INVITE_COMPANY_USER: "/admin/invite-company-user",
    INVITE_REPOSITORY_USER: "/admin/invite-repository-user",
    CREATE_COMPANY: "/admin/create-company",
    CREATE_ADDRESS: "/admin/create-address",
    CREATE_MANUAL_INVOICE: "/admin/create-manual-invoice",
    CREATE_CAMPAIGN_PRODUCT_AND_PRICE: "/admin/campaign/create-product-and-price",
    CREATE_PLAN_PRODUCT_AND_PRICE: "/admin/plan/create-product-and-price",
    CREATE_PROJECT: "/admin/project",
    SYNC_GITHUB: "/admin/sync-github",
    ORGANIZATION_SYNC: "/admin/organizations/sync",
    REPOSITORY_SYNC: "/admin/repositories/sync",
    MAINTAINER: (githubUsername: string) => `/admin/maintainer/${githubUsername}`,
    MAINTAINER_ROUTE: "/admin/maintainer/:githubUsername", // Route pattern for React Router
  },

  // Dynamic route functions
  fundIssue: (issueId: dto.IssueId) =>
    `/${issueId.repositoryId.ownerId}/${issueId.repositoryId.name}/issues/${issueId.number}/fund`,

  manageIssue: (issueId: dto.IssueId) =>
    `/${issueId.repositoryId.ownerId}/${issueId.repositoryId.name}/issues/${issueId.number}/manage`,

  project: (projectId: ProjectId) =>
    isOwnerId(projectId) ? `/projects/${projectId}` : `/projects/${projectId.ownerId}/${projectId.name}`,

  campaign: (projectId: ProjectId) =>
    isOwnerId(projectId)
      ? `/projects/${projectId}/campaign`
      : `/projects/${projectId.ownerId}/${projectId.name}/campaign`,

  params: {
    owner: "ownerParam",
    repo: "repoParam",
    number: "numberParam",
  },
};
