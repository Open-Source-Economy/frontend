import { ValidationError, Validator } from "./error";
import { CompanyId, UserId } from "./index";

export class ManualInvoiceId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class ManualInvoice {
  id: ManualInvoiceId;
  number: number;
  companyId?: CompanyId;
  userId?: UserId;
  paid: boolean;
  creditAmount: number;

  constructor(id: ManualInvoiceId, number: number, companyId: CompanyId | undefined, userId: UserId | undefined, paid: boolean, creditAmount: number) {
    this.id = id;
    this.number = number;
    this.companyId = companyId;
    this.userId = userId;
    this.paid = paid;
    this.creditAmount = creditAmount;
  }

  static fromBackend(row: any): ManualInvoice | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const number = validator.requiredNumber("number");
    const companyId = validator.optionalString("company_id");
    const userId = validator.optionalString("user_id");
    const paid = validator.requiredBoolean("paid");
    const creditAmount = validator.requiredNumber("credit_amount");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new ManualInvoice(
      new ManualInvoiceId(id),
      number,
      companyId ? new CompanyId(companyId) : undefined,
      userId ? new UserId(userId) : undefined,
      paid,
      creditAmount,
    );
  }
}
