import { ValidationError, Validator } from "../error";
import { StripeInvoiceLine } from "./StripeInvoiceLine";
import { StripeCustomerId } from "./StripeCustomer";
import { Currency } from "./Currency";

export class StripeInvoiceId {
  id: string;

  constructor(id: string) {
    this.id = id;
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
  currency: Currency;
  total: number;
  totalExclTax: number;
  subtotal: number;
  subtotalExclTax: number;
  hostedInvoiceUrl: string;
  invoicePdf: string;
  number: string | null;

  constructor(
    id: StripeInvoiceId,
    customerId: StripeCustomerId,
    paid: boolean,
    accountCountry: string,
    lines: StripeInvoiceLine[],
    currency: Currency,
    total: number,
    totalExclTax: number,
    subtotal: number,
    subtotalExclTax: number,
    hostedInvoiceUrl: string,
    invoicePdf: string,
    number: string | null,
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
    this.number = number;
  }

  // Stripe API: https://docs.stripe.com/api/invoices/object
  static fromStripeApi(json: any): StripeInvoice | ValidationError {
    const validator = new Validator(json);
    const id = validator.requiredString("id");
    const customerId = validator.requiredString("customer");
    const paid = validator.requiredBoolean("paid");
    const accountCountry = validator.requiredString("account_country");
    const linesData = validator.requiredArray<any>(["lines", "data"]);
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const total = validator.requiredNumber("total");
    const totalExclTax = validator.requiredNumber("total_excluding_tax");
    const subtotal = validator.requiredNumber("subtotal");
    const subtotalExclTax = validator.requiredNumber("subtotal_excluding_tax");
    const hostedInvoiceUrl = validator.requiredString("hosted_invoice_url");
    const invoicePdf = validator.requiredString("invoice_pdf");
    const number = validator.optionalString("number");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const lines = linesData.map((line: any) => {
      return StripeInvoiceLine.fromStripeApi(new StripeCustomerId(customerId), line);
    });

    const lineError = lines.find(line => line instanceof ValidationError);
    if (lineError instanceof ValidationError) {
      return lineError;
    }

    return new StripeInvoice(
      new StripeInvoiceId(id),
      new StripeCustomerId(customerId),
      paid,
      accountCountry,
      lines as StripeInvoiceLine[],
      currency,
      total,
      totalExclTax,
      subtotal,
      subtotalExclTax,
      hostedInvoiceUrl,
      invoicePdf,
      number ?? null,
    );
  }

  static fromBackend(row: any, lines: StripeInvoiceLine[]): StripeInvoice | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("stripe_id");
    const customerId = validator.requiredString("stripe_customer_id");
    const paid = validator.requiredBoolean("paid");
    const accountCountry = validator.requiredString("account_country");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const total = validator.requiredNumber("total");
    const totalExclTax = validator.requiredNumber("total_excl_tax");
    const subtotal = validator.requiredNumber("subtotal");
    const subtotalExclTax = validator.requiredNumber("subtotal_excl_tax");
    const hostedInvoiceUrl = validator.requiredString("hosted_invoice_url");
    const invoicePdf = validator.requiredString("invoice_pdf");
    const number = validator.optionalString("number");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeInvoice(
      new StripeInvoiceId(id),
      new StripeCustomerId(customerId),
      paid,
      accountCountry,
      lines,
      currency,
      total,
      totalExclTax,
      subtotal,
      subtotalExclTax,
      hostedInvoiceUrl,
      invoicePdf,
      number ?? null,
    );
  }
}
