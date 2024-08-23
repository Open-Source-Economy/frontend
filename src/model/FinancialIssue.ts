import * as model from "./index";

export class FinancialIssue {
  public owner: model.Owner;
  public repository: model.Repository;
  public issue: model.Issue;
  public status: model.IssueStatus;

  constructor(owner: model.Owner, repository: model.Repository, issue: model.Issue, status: model.IssueStatus) {
    this.owner = owner;
    this.repository = repository;
    this.issue = issue;
    this.status = status;
  }

  public id(): string {
    return `${this.owner.id}/${this.repository.id}/${this.issue.id.number}`;
  }
}
