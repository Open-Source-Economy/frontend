import { Owner } from "../github/Owner";
import { ValidationError, Validator } from "../error";

export class ThirdPartyUserId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export enum Provider {
  Github = "github",
}

export class GithubData {
  owner: Owner;

  constructor(owner: Owner) {
    this.owner = owner;
  }
}

export class ThirdPartyUser {
  provider: Provider;
  id: ThirdPartyUserId;
  email: string | null;
  providerData: GithubData;

  constructor(provider: Provider, id: ThirdPartyUserId, email: string | null, providerData: GithubData) {
    this.provider = provider;
    this.id = id;
    this.email = email;
    this.providerData = providerData;
  }

  // TODO: check
  static fromJson(json: any): ThirdPartyUser | ValidationError {
    const validator = new Validator(json);
    const provider = validator.requiredEnum("provider", Object.values(Provider) as Provider[]);
    const id = validator.requiredString("id");
    validator.optionalObject("_json");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const owner = Owner.fromGithubApi(json._json);
    if (owner instanceof ValidationError) {
      return owner;
    }
    const providerData = new GithubData(owner as Owner);

    return new ThirdPartyUser(provider, new ThirdPartyUserId(json.id), null, providerData);
  }

  static fromRaw(row: any, owner: Owner | null = null): ThirdPartyUser | ValidationError {
    const validator = new Validator(row);
    const provider = validator.requiredEnum("provider", Object.values(Provider) as Provider[]);
    const thirdPartyId = validator.requiredString("third_party_id");
    const email = validator.optionalString("email");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    if (owner === null) {
      const o = Owner.fromBackend(row);
      if (o instanceof ValidationError) {
        return o;
      }
      owner = o as Owner;
    }
    const providerData = new GithubData(owner!); // TODO: refactor

    return new ThirdPartyUser(provider, new ThirdPartyUserId(thirdPartyId), email ?? null, providerData);
  }
}
