import { ValidationError, Validator } from "../error";

export class LocalUser {
  email: string;
  isEmailVerified: boolean;
  password: string;

  constructor(email: string, isEmailVerified: boolean, passport: string) {
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.password = passport;
  }

  static fromRaw(row: any): LocalUser | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("email");
    validator.requiredBoolean("is_email_verified");
    validator.requiredString("hashed_password");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new LocalUser(row.email, row.is_email_verified, row.hashed_password);
  }
}
