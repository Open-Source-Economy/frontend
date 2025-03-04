import { ValidationError, Validator } from "./error";

/**
 * Represents a newsletter subscription.
 *
 * Only the email is stored in the model.
 */
export class NewsletterSubscription {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  /**
   * Creates an instance of NewsletterSubscription from a backend row.
   *
   * Although the table contains `created_at` and `updated_at` columns,
   * this model only stores the email.
   *
   * @param row - The row returned from a database query.
   * @returns A NewsletterSubscription instance or a ValidationError if the row is missing required fields.
   */
  static fromBackend(row: any): NewsletterSubscription | ValidationError {
    const validator = new Validator(row);
    const email = validator.requiredString("email");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new NewsletterSubscription(email);
  }
}
