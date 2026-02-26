import * as dto from "@open-source-economy/api-types";

// Helper to create dates as ISODateTimeString
const now = new Date();
const hoursAgo = (hours: number) =>
  new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString() as dto.ISODateTimeString;
const daysAgo = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString() as dto.ISODateTimeString;
const yearAgo = daysAgo(365);

function makeOwner(
  login: string,
  type: dto.OwnerType,
  opts?: {
    githubId?: number;
    name?: string;
    blog?: string;
    avatarUrl?: string;
  }
): dto.Owner {
  return {
    id: { login } as dto.OwnerId,
    type,
    htmlUrl: `https://github.com/${login}`,
    avatarUrl: opts?.avatarUrl ?? `https://avatars.githubusercontent.com/u/${opts?.githubId ?? 0}`,
    name: opts?.name,
    blog: opts?.blog,
  };
}

function makeRepositoryId(ownerLogin: string, name: string, githubId?: number): dto.RepositoryId {
  return {
    ownerId: { login: ownerLogin } as dto.OwnerId,
    name,
    githubId,
  } as dto.RepositoryId;
}

function makeRepository(
  ownerLogin: string,
  repoName: string,
  opts: {
    githubId?: number;
    description?: string;
    homepage?: string;
    language?: string;
    forksCount?: number;
    stargazersCount?: number;
    fullName?: string;
    topics?: string[];
  }
): dto.Repository {
  return {
    id: makeRepositoryId(ownerLogin, repoName, opts.githubId),
    htmlUrl: `https://github.com/${ownerLogin}/${repoName}`,
    description: opts.description,
    homepage: opts.homepage,
    language: opts.language,
    forksCount: opts.forksCount,
    stargazersCount: opts.stargazersCount,
    fullName: opts.fullName,
    fork: false,
    topics: opts.topics,
  };
}

interface DeveloperEntry {
  developerProfile: dto.DeveloperProfile;
  developerProjectItem: dto.DeveloperProjectItem;
  developerOwner: dto.Owner;
}

function makeDeveloper(
  projectItemId: dto.ProjectItemId,
  idSuffix: string,
  opts: {
    email: string;
    roles: dto.DeveloperRoleType[];
    mergeRights: dto.MergeRightsType[];
    comment: string;
    ownerLogin: string;
    ownerName: string;
    avatarUrl: string;
    createdAt: dto.ISODateTimeString;
    updatedAt: dto.ISODateTimeString;
  }
): DeveloperEntry {
  const developerProfileId = `dev-${idSuffix}` as dto.DeveloperProfileId;
  return {
    developerProfile: {
      id: developerProfileId,
      userId: `user-${idSuffix}` as dto.UserId,
      contactEmail: opts.email,
      onboardingCompleted: true,
      createdAt: opts.createdAt,
      updatedAt: opts.updatedAt,
    },
    developerProjectItem: {
      id: `dpi-${idSuffix}` as dto.DeveloperProjectItemId,
      developerProfileId: developerProfileId,
      projectItemId: projectItemId,
      roles: opts.roles,
      mergeRights: opts.mergeRights,
      comment: opts.comment,
      createdAt: opts.createdAt,
      updatedAt: opts.updatedAt,
    },
    developerOwner: makeOwner(opts.ownerLogin, dto.OwnerType.User, {
      name: opts.ownerName,
      avatarUrl: opts.avatarUrl,
    }),
  };
}

export const projectItemsDatabase: dto.ProjectItemWithDetails[] = [
  // React
  {
    projectItem: {
      id: "react" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: "facebook/react",
      createdAt: yearAgo,
      updatedAt: hoursAgo(2),
    },
    owner: makeOwner("facebook", dto.OwnerType.Organization, {
      githubId: 69631,
      name: "Facebook",
      blog: "https://reactjs.org",
    }),
    repository: makeRepository("facebook", "react", {
      githubId: 10270250,
      description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      homepage: "https://reactjs.org",
      language: "JavaScript",
      forksCount: 45000,
      stargazersCount: 220000,
      fullName: "facebook/react",
      topics: ["ui", "components", "javascript"],
    }),
    developers: [
      makeDeveloper("react" as dto.ProjectItemId, "react-1", {
        email: "react-0@example.com",
        roles: [dto.DeveloperRoleType.CORE_TEAM_MEMBER, dto.DeveloperRoleType.MAINTAINER],
        mergeRights: [dto.MergeRightsType.FULL_COMMITTER],
        comment: "Core Maintainer",
        ownerLogin: "react-0",
        ownerName: "Sarah Chen",
        avatarUrl: "https://images.unsplash.com/photo-1743850765931-4a00e4809a5f?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(2),
      }),
      makeDeveloper("react" as dto.ProjectItemId, "react-2", {
        email: "react-1@example.com",
        roles: [dto.DeveloperRoleType.MAINTAINER],
        mergeRights: [dto.MergeRightsType.REVIEWER, dto.MergeRightsType.LIMITED],
        comment: "Security Expert",
        ownerLogin: "react-1",
        ownerName: "Marcus Rodriguez",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(2),
      }),
      makeDeveloper("react" as dto.ProjectItemId, "react-3", {
        email: "react-2@example.com",
        roles: [dto.DeveloperRoleType.ACTIVE_CONTRIBUTOR],
        mergeRights: [dto.MergeRightsType.REVIEWER],
        comment: "Performance Lead",
        ownerLogin: "react-2",
        ownerName: "Priya Patel",
        avatarUrl: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(2),
      }),
    ],
  },

  // Vue.js
  {
    projectItem: {
      id: "vue" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: "vuejs/vue",
      createdAt: yearAgo,
      updatedAt: hoursAgo(5),
    },
    owner: makeOwner("vuejs", dto.OwnerType.Organization, {
      githubId: 6128107,
      name: "Vue.js",
      blog: "https://vuejs.org",
    }),
    repository: makeRepository("vuejs", "vue", {
      githubId: 11730342,
      description: "Progressive JavaScript framework for building modern web interfaces.",
      homepage: "https://vuejs.org",
      language: "TypeScript",
      forksCount: 34000,
      stargazersCount: 207000,
      fullName: "vuejs/vue",
      topics: ["ui", "framework", "progressive"],
    }),
    developers: [
      makeDeveloper("vue" as dto.ProjectItemId, "vue-1", {
        email: "vue-0@example.com",
        roles: [dto.DeveloperRoleType.FOUNDER, dto.DeveloperRoleType.CORE_TEAM_MEMBER],
        mergeRights: [dto.MergeRightsType.FULL_COMMITTER],
        comment: "Core Maintainer",
        ownerLogin: "vue-0",
        ownerName: "Alex Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(5),
      }),
      makeDeveloper("vue" as dto.ProjectItemId, "vue-2", {
        email: "vue-1@example.com",
        roles: [dto.DeveloperRoleType.MAINTAINER],
        mergeRights: [dto.MergeRightsType.REVIEWER],
        comment: "Security Expert",
        ownerLogin: "vue-1",
        ownerName: "Emily Wong",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb8e25514?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(5),
      }),
    ],
  },

  // Kubernetes
  {
    projectItem: {
      id: "kubernetes" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: "kubernetes/kubernetes",
      createdAt: yearAgo,
      updatedAt: hoursAgo(1),
    },
    owner: makeOwner("kubernetes", dto.OwnerType.Organization, {
      githubId: 13629408,
      name: "Kubernetes",
      blog: "https://kubernetes.io",
    }),
    repository: makeRepository("kubernetes", "kubernetes", {
      githubId: 20580498,
      description: "Production-Grade Container Orchestration for automating deployment and scaling.",
      homepage: "https://kubernetes.io",
      language: "Go",
      forksCount: 39000,
      stargazersCount: 108000,
      fullName: "kubernetes/kubernetes",
      topics: ["containers", "orchestration", "devops"],
    }),
    developers: [
      makeDeveloper("kubernetes" as dto.ProjectItemId, "k8s-1", {
        email: "kubernetes-0@example.com",
        roles: [dto.DeveloperRoleType.TSC_MEMBER, dto.DeveloperRoleType.MAINTAINER],
        mergeRights: [dto.MergeRightsType.FULL_COMMITTER, dto.MergeRightsType.RELEASE_MANAGER],
        comment: "Core Maintainer",
        ownerLogin: "kubernetes-0",
        ownerName: "David Lee",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(1),
      }),
    ],
  },

  // TensorFlow
  {
    projectItem: {
      id: "tensorflow" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: "tensorflow/tensorflow",
      createdAt: yearAgo,
      updatedAt: hoursAgo(3),
    },
    owner: makeOwner("tensorflow", dto.OwnerType.Organization, {
      githubId: 15658638,
      name: "TensorFlow",
      blog: "https://tensorflow.org",
    }),
    repository: makeRepository("tensorflow", "tensorflow", {
      githubId: 45717250,
      description: "An end-to-end open source platform for machine learning applications.",
      homepage: "https://tensorflow.org",
      language: "Python",
      forksCount: 74000,
      stargazersCount: 185000,
      fullName: "tensorflow/tensorflow",
      topics: ["machine-learning", "ai", "python"],
    }),
    developers: [
      makeDeveloper("tensorflow" as dto.ProjectItemId, "tf-1", {
        email: "tensorflow-0@example.com",
        roles: [dto.DeveloperRoleType.CORE_TEAM_MEMBER],
        mergeRights: [dto.MergeRightsType.FULL_COMMITTER],
        comment: "Core Maintainer",
        ownerLogin: "tensorflow-0",
        ownerName: "Sarah Chen",
        avatarUrl: "https://images.unsplash.com/photo-1743850765931-4a00e4809a5f?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(3),
      }),
      makeDeveloper("tensorflow" as dto.ProjectItemId, "tf-2", {
        email: "tensorflow-1@example.com",
        roles: [dto.DeveloperRoleType.MAINTAINER, dto.DeveloperRoleType.ACTIVE_CONTRIBUTOR],
        mergeRights: [dto.MergeRightsType.REVIEWER],
        comment: "Security Expert",
        ownerLogin: "tensorflow-1",
        ownerName: "Marcus Rodriguez",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(3),
      }),
    ],
  },

  // Node.js
  {
    projectItem: {
      id: "nodejs" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.GITHUB_REPOSITORY,
      sourceIdentifier: "nodejs/node",
      createdAt: yearAgo,
      updatedAt: hoursAgo(6),
    },
    owner: makeOwner("nodejs", dto.OwnerType.Organization, {
      githubId: 9950313,
      name: "Node.js",
      blog: "https://nodejs.org",
    }),
    repository: makeRepository("nodejs", "node", {
      githubId: 27193779,
      description: "JavaScript runtime built on Chrome's V8 engine for scalable applications.",
      homepage: "https://nodejs.org",
      language: "JavaScript",
      forksCount: 28000,
      stargazersCount: 105000,
      fullName: "nodejs/node",
      topics: ["runtime", "javascript", "backend"],
    }),
    developers: [
      makeDeveloper("nodejs" as dto.ProjectItemId, "node-1", {
        email: "nodejs-0@example.com",
        roles: [dto.DeveloperRoleType.TSC_MEMBER, dto.DeveloperRoleType.CORE_TEAM_MEMBER],
        mergeRights: [dto.MergeRightsType.FULL_COMMITTER],
        comment: "Core Maintainer",
        ownerLogin: "nodejs-0",
        ownerName: "Priya Patel",
        avatarUrl: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400",
        createdAt: yearAgo,
        updatedAt: hoursAgo(6),
      }),
    ],
  },

  // Linux Foundation (URL-based project, not on GitHub)
  {
    projectItem: {
      id: "linux-foundation" as dto.ProjectItemId,
      projectItemType: dto.ProjectItemType.URL,
      sourceIdentifier: "https://www.linuxfoundation.org",
      createdAt: yearAgo,
      updatedAt: daysAgo(2),
    },
    owner: null,
    repository: null,
    developers: [
      makeDeveloper("linux-foundation" as dto.ProjectItemId, "lf-1", {
        email: "linux-foundation-0@example.com",
        roles: [dto.DeveloperRoleType.BOARD_MEMBER, dto.DeveloperRoleType.LINUX_FOUNDATION_FELLOW],
        mergeRights: [dto.MergeRightsType.NONE],
        comment: "Board Member",
        ownerLogin: "lf-0",
        ownerName: "James Thompson",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
        createdAt: yearAgo,
        updatedAt: daysAgo(2),
      }),
      makeDeveloper("linux-foundation" as dto.ProjectItemId, "lf-2", {
        email: "linux-foundation-1@example.com",
        roles: [dto.DeveloperRoleType.STEERING_COMMITTEE_MEMBER],
        mergeRights: [dto.MergeRightsType.NONE],
        comment: "Steering Committee Member",
        ownerLogin: "lf-1",
        ownerName: "Rachel Kim",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400",
        createdAt: yearAgo,
        updatedAt: daysAgo(2),
      }),
    ],
  },
];
