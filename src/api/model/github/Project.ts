import { Repository, RepositoryId } from "./Repository";
import { Owner, OwnerId } from "./Owner";

export type ProjectId = RepositoryId | OwnerId;

export const ProjectUtils = {
  key(project: Project): string {
    let key: string = project.owner.id.login;
    if (project.repository) {
      key += "-" + project.repository.id.name;
    }
    return key;
  },
};

export class Project {
  id: ProjectId;
  owner: Owner;
  repository?: Repository;

  constructor(owner: Owner, repository?: Repository) {
    this.owner = owner;
    this.repository = repository;

    if (this.repository) {
      this.id = this.repository.id;
    } else {
      this.id = this.owner.id;
    }
  }

  static getId(owner: string, repo?: string) {
    let projectId: ProjectId;
    if (!repo) {
      if (owner === "open-source-economy") {
        projectId = new OwnerId("Open-Source-Economy"); // TODO: hack to make it work. DB: Open-Source-Economy, GitHub: Open-Source-Economy | open-source-economy, Frontend: open-source-economy
      } else {
        projectId = new OwnerId(owner);
      }
    } else {
      projectId = new RepositoryId(new OwnerId(owner), repo);
    }
    return projectId;
  }

  static getDBParams(projectId: ProjectId | null) {
    if (!projectId) {
      return {
        ownerId: null,
        ownerLogin: null,
        repoId: null,
        repoName: null,
      };
    }

    if (projectId instanceof RepositoryId) {
      return {
        ownerId: projectId.ownerId.githubId,
        ownerLogin: projectId.ownerId.login,
        repoId: projectId.githubId,
        repoName: projectId.name,
      };
    } else {
      return {
        ownerId: projectId.githubId,
        ownerLogin: projectId.login,
        repoId: null,
        repoName: null,
      };
    }
  }
}
