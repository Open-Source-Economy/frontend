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

export class Email {
  value: string;
  type: string | null;

  constructor(value: string, type: string | null) {
    this.value = value;
    this.type = type;
  }

  static fromJson(json: any): Email | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("value");
    validator.optionalString("type");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new Email(json.value, json.type ?? null);
  }
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
  emails: Email[];
  providerData: GithubData;

  constructor(provider: Provider, id: ThirdPartyUserId, emails: Email[], providerData: GithubData) {
    this.provider = provider;
    this.id = id;
    this.emails = emails;
    this.providerData = providerData;
  }

  email(): string | null {
    if (this.emails.length > 0) {
      return this.emails[0].value;
    } else return null;
  }

  static fromJson(json: any): ThirdPartyUser | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("provider");
    validator.requiredString("id");
    validator.optionalObject("_json");
    validator.optionalArray("emails");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const emails: Email[] = [];
    if (json.emails) {
      for (const email of json.emails) {
        const e = Email.fromJson(email);
        if (e instanceof ValidationError) {
          return e;
        }
        emails.push(e);
      }
    }

    const owner = Owner.fromGithubApi(json._json);
    if (owner instanceof ValidationError) {
      return owner;
    }
    const providerData = new GithubData(owner as Owner);

    return new ThirdPartyUser(json.provider as Provider, new ThirdPartyUserId(json.id), emails, providerData);
  }

  static fromRaw(row: any, owner: Owner | null = null): ThirdPartyUser | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("provider");
    validator.requiredString("third_party_id");
    validator.optionalString("display_name");
    validator.optionalString("email");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const emails: Email[] = [];
    if (row.email) {
      emails.push(new Email(row.email, null));
    }

    if (owner === null) {
      const o = Owner.fromBackend(row);
      if (o instanceof ValidationError) {
        return o;
      }
      owner = o as Owner;
    }
    const providerData = new GithubData(owner!); // TODO: refactor

    return new ThirdPartyUser(row.provider as Provider, new ThirdPartyUserId(row.third_party_id), emails, providerData);
  }
}
