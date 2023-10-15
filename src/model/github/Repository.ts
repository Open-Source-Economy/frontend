export interface Repo {
  name: string;
  full_name: string;
  description: string;
  organization: Organization;
}

export interface Organization {
  avatar_url: string;
}
