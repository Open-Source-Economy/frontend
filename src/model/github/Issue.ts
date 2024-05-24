import { User } from "./User";

export type IssueId = {
  owner: string;
  repository: string;
  number: number;
};

export class Issue {
  number: number;
  title: string;
  htmlUrl: string;
  createdAt: Date;
  closedAt: Date | null;
  openBy: User;

  body: string;

  private constructor(number: number, title: string, htmlUrl: string, createdAt: Date, closedAt: Date | null, openBy: User, body: string) {
    this.number = number;
    this.title = title;
    this.htmlUrl = htmlUrl;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.openBy = openBy;
    this.body = body;
  }

  // TODO: see what is optional or not
  static fromJson(json: any): Issue | Error {
    // Validate JSON data
    if (!json.number || typeof json.number !== "number") {
      return new Error("Invalid JSON: number is missing or not a number");
    }
    if (!json.title || typeof json.title !== "string") {
      return new Error("Invalid JSON: title is missing or not a string");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.created_at || typeof json.created_at !== "string") {
      return new Error("Invalid JSON: created_at is missing or not a string");
    }
    if (json.closed_at && typeof json.closed_at !== "string") {
      // optional
      return new Error("Invalid JSON: closed_at is not a string");
    }
    if (!json.user || typeof json.user !== "object") {
      return new Error("Invalid JSON: user is missing or not an object");
    }
    if (!json.body || typeof json.body !== "string") {
      return new Error("Invalid JSON: body is missing or not a string");
    }

    const user: User | Error = User.fromJson(json.user);

    if (user instanceof Error) {
      return user;
    } else {
      return new Issue(
        json.number,
        json.title,
        json.html_url,
        new Date(json.created_at), // TODO: can throw an error?
        json.closed_at ? new Date(json.closed_at) : null, // TODO: can throw an error?
        user,
        json.body,
      );
    }
  }
}
