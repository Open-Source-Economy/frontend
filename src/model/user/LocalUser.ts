import { ValidationError, Validator } from "../error";

export class LocalUser {
  name: string | null;
  email: string;
  isEmailVerified: boolean;
  hashedPassword: string;

  constructor(name: string | null, email: string, isEmailVerified: boolean, hashedPassword: string) {
    this.name = name;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.hashedPassword = hashedPassword;
  }

  static fromRaw(row: any): LocalUser | ValidationError {
    const validator = new Validator(row);
    validator.optionalString("name");
    validator.requiredString("email");
    validator.requiredBoolean("is_email_verified");
    validator.requiredString("hashed_password");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new LocalUser(row.name || null, row.email, row.is_email_verified, row.hashed_password);
  }
}
