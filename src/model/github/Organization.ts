export class Organization {
  name: string;
  htmlUrl: string;
  avatarUrl: string;

  private constructor(name: string, url: string, avatar_url: string) {
    this.name = name;
    this.htmlUrl = url;
    this.avatarUrl = avatar_url;
  }

  static fromJson(json: any): Organization | Error {
    // Validate JSON data
    if (!json.login || typeof json.login !== "string") {
      return new Error("Invalid JSON: login is missing or not a string");
    }
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.avatar_url || typeof json.avatar_url !== "string") {
      return new Error("Invalid JSON: avatar_url is missing or not a string");
    }

    // Assign values from JSON
    return new Organization(json.login, json.html_url, json.avatar_url);
  }
}
