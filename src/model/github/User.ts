export class User {
  htmlUrl: string;
  login: string;
  avatarUrl: string;

  private constructor(htmlUrl: string, login: string, avatarUrl: string) {
    this.htmlUrl = htmlUrl;
    this.login = login;
    this.avatarUrl = avatarUrl;
  }

  // TODO: see what is optional or not
  static fromJson(json: any): User | Error {
    // Validate JSON data
    if (!json.html_url || typeof json.html_url !== "string") {
      return new Error("Invalid JSON: html_url is missing or not a string");
    }
    if (!json.login || typeof json.login !== "string") {
      return new Error("Invalid JSON: login is missing or not a string");
    }
    if (!json.avatar_url || typeof json.avatar_url !== "string") {
      return new Error("Invalid JSON: avatar_url is missing or not a string");
    }

    // Assign values from JSON
    return new User(json.html_url, json.login, json.avatar_url);
  }
}
