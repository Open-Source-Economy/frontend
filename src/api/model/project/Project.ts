import { Owner, OwnerId, Repository, RepositoryId } from "../github";
import { ValidationError, Validator } from "../error";
import { ProjectEcosystem } from "./ProjectEcosystem";

// ProjectId is a type union rather than a class
export type ProjectId = RepositoryId | OwnerId;

export class Project {
  id: ProjectId;
  owner: Owner;
  repository?: Repository;
  projectEcosystem?: ProjectEcosystem;

  constructor(owner: Owner, repository?: Repository, projectEcosystem?: ProjectEcosystem) {
    let projectId: ProjectId;
    if (repository instanceof Repository) {
      projectId = repository.id;
    } else {
      projectId = owner.id;
    }

    this.id = projectId;
    this.owner = owner;
    this.repository = repository;
    this.projectEcosystem = projectEcosystem;
  }

  static fromBackend(row: any, owner_table_prefix: string, repository_prefix: string): Project | ValidationError {
    const validator = new Validator(row);

    // Get the ecosystem
    const ecosystem = validator.optionalEnum("ecosystem", Object.values(ProjectEcosystem) as ProjectEcosystem[]);

    const owner = Owner.fromBackend(row, owner_table_prefix);
    const repository = Repository.fromBackend(row, repository_prefix);

    const error = validator.getFirstError();
    if (error) return error;
    if (owner instanceof ValidationError) return owner;

    return new Project(owner, repository instanceof Repository ? repository : undefined, ecosystem);
  }
}

export const ProjectUtils = {
  /** Build a stable composite key such as "owner-repo". */
  key(project: Project): string {
    const { owner, repository } = project;
    return repository ? `${owner.id.login}-${repository.id.name}` : owner.id.login;
  },

  /** Return the appropriate ProjectId (OwnerId or RepositoryId). */
  getId(owner: string, repo?: string): ProjectId {
    if (!repo) {
      // Special-case: GitHub org "open-source-economy" is stored with title-case in the DB
      return owner === "open-source-economy" ? new OwnerId("Open-Source-Economy") : new OwnerId(owner);
    }
    return new RepositoryId(new OwnerId(owner), repo);
  },

  /** Extract DB-ready columns from a ProjectId (or null). */
  getDBParams(projectId: ProjectId | null) {
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
    }

    // projectId is an OwnerId
    return {
      ownerId: projectId.githubId,
      ownerLogin: projectId.login,
      repoId: null,
      repoName: null,
    };
  },
};
