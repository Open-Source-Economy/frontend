import { ValidationError, Validator } from "../error";
import { StripeCustomerId, StripeInvoiceLine } from "src/model";

export class StripeInvoiceId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromStripeApi(json: any): StripeInvoiceId | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }
    return new StripeInvoiceId(json.id);
  }

  toString(): string {
    return this.id;
  }
}

export class StripeInvoice {
  id: StripeInvoiceId;
  customerId: StripeCustomerId;
  paid: boolean;
  accountCountry: string;
  lines: StripeInvoiceLine[];
  currency: string;
  total: number;
  totalExclTax: number;
  subtotal: number;
  subtotalExclTax: number;
  hostedInvoiceUrl: string;
  invoicePdf: string;

  constructor(
    id: StripeInvoiceId,
    customerId: StripeCustomerId,
    paid: boolean,
    accountCountry: string,
    lines: StripeInvoiceLine[],
    currency: string,
    total: number,
    totalExclTax: number,
    subtotal: number,
    subtotalExclTax: number,
    hostedInvoiceUrl: string,
    invoicePdf: string,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.paid = paid;
    this.accountCountry = accountCountry;
    this.lines = lines;
    this.currency = currency;
    this.total = total;
    this.totalExclTax = totalExclTax;
    this.subtotal = subtotal;
    this.subtotalExclTax = subtotalExclTax;
    this.hostedInvoiceUrl = hostedInvoiceUrl;
    this.invoicePdf = invoicePdf;
  }

  // Stripe API: https://docs.stripe.com/api/invoices/object
  static fromStripeApi(json: any): StripeInvoice | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");
    validator.requiredString("customer");
    validator.requiredBoolean("paid");
    validator.requiredString("account_country");
    validator.requiredObject("lines");
    validator.requiredArray(["lines", "data"]);
    validator.requiredString("currency");
    validator.requiredNumber("total");
    validator.requiredNumber("total_excluding_tax");
    validator.requiredNumber("subtotal");
    validator.requiredNumber("subtotal_excluding_tax");
    validator.requiredString("hosted_invoice_url");
    validator.requiredString("invoice_pdf");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const invoiceId: StripeInvoiceId | ValidationError = StripeInvoiceId.fromStripeApi(json);
    if (invoiceId instanceof ValidationError) {
      return invoiceId;
    }

    const customerId: StripeCustomerId = new StripeCustomerId(json.customer);
    return new StripeInvoice(
      invoiceId,
      customerId,
      json.paid,
      json.account_country,
      json.lines.data.map((line: any) => StripeInvoiceLine.fromStripeApi(customerId, line)),
      json.currency,
      Number(json.total),
      Number(json.total_excluding_tax),
      Number(json.subtotal),
      Number(json.subtotal_excluding_tax),
      json.hosted_invoice_url,
      json.invoice_pdf,
    );
  }

  static fromBackend(row: any, lines: StripeInvoiceLine[]): StripeInvoice | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("stripe_id");
    validator.requiredString("customer_id");
    validator.requiredBoolean("paid");
    validator.requiredString("account_country");
    validator.requiredString("currency");
    validator.requiredNumber("total");
    validator.requiredNumber("total_excl_tax");
    validator.requiredNumber("subtotal");
    validator.requiredNumber("subtotal_excl_tax");
    validator.requiredString("hosted_invoice_url");
    validator.requiredString("invoice_pdf");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const invoiceId = new StripeInvoiceId(row.stripe_id);
    const customerId = new StripeCustomerId(row.customer_id);
    return new StripeInvoice(
      invoiceId,
      customerId,
      row.paid,
      row.account_country,
      lines,
      row.currency,
      Number(row.total),
      Number(row.total_excl_tax),
      Number(row.subtotal),
      Number(row.subtotal_excl_tax),
      row.hosted_invoice_url,
      row.invoice_pdf,
    );
  }
}
