import { CompanyId } from "./Company";

export class UserId {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class User {
  id: UserId;
  // githubAccount: string | null; // GitHub login TODO: define type
  // company: CompanyId | null; // TODO: in the future there could have several companies
  // ossProject: string | null; // TODO: define type
  //
  //
  // email: string; // GitHub login
  // name: string | null;

  constructor(id: UserId) {
    this.id = id;
  }
}
