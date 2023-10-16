export class Repo {
  name: string;
  full_name: string;
  description: string;
  organization: Organization;

    constructor(name: string, full_name: string, description: string, organization: Organization) {
        this.name = name;
        this.full_name = full_name;
        this.description = description;
        this.organization = organization;
    }
}

export class Organization {
  avatar_url: string;

    constructor(avatar_url: string) {
        this.avatar_url = avatar_url;
    }
}
