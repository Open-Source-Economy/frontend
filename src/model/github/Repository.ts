import { Organization } from "./Organization";

export class Repository {
  name: string;
  full_name: string; // TODO: remove
  htmlUrl: string;
  description: string;
  organization: Organization; // TODO: probably better to decouple. At the moment, issue is decoupled from repository, but repository is not decoupled from organization

  private constructor(name: string, full_name: string, htmlUrl: string, description: string, organization: Organization) {
    this.name = name;
    this.htmlUrl = htmlUrl;
    this.full_name = full_name;
    this.description = description;
    this.organization = organization;
  }

  // TODO: see what is optional or not
  static fromJson(json: any): Repository | Error {
    // Validate JSON data
    if (!json.name || typeof json.name !== "string") {
      return new Error("Invalid JSON: name is missing or not a string");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.description || typeof json.description !== "string") {
      return new Error("Invalid JSON: description is missing or not a string");
    }
    if (!json.organization || typeof json.organization !== "object") {
      return new Error("Invalid JSON: organization is missing or not an object");
    }
    if (!json.full_name || typeof json.full_name !== "string") {
      return new Error("Invalid JSON: full_name is missing or not a string");
    }

    const organization: Organization | Error = Organization.fromJson(json.organization);

    if (organization instanceof Error) {
      return organization;
    } else {
      // Assign values from JSON
      return new Repository(json.name, json.full_name, json.html_url, json.description, organization);
    }
  }
}
