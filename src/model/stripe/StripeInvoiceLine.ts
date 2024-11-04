import { ValidationError, Validator } from "../error";
import { StripeCustomerId, StripeInvoiceId, StripePriceId, StripeProductId } from "src/model";

export class StripeInvoiceLineId {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromStripeApi(json: any): StripeInvoiceLineId | ValidationError {
    const validator = new Validator(json);
    validator.requiredString("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }
    return new StripeInvoiceLineId(json.id);
  }

  toString(): string {
    return this.id;
  }
}

export class StripeInvoiceLine {
  stripeId: StripeInvoiceLineId;
  invoiceId: StripeInvoiceId;
  customerId: StripeCustomerId;
  productId: StripeProductId;
  priceId: StripePriceId;
  quantity: number;

  constructor(
    stripeId: StripeInvoiceLineId,
    invoiceId: StripeInvoiceId,
    customerId: StripeCustomerId,
    productId: StripeProductId,
    priceId: StripePriceId,
    quantity: number, // TODO: should be a positive integer
  ) {
    this.stripeId = stripeId;
    this.invoiceId = invoiceId;
    this.customerId = customerId;
    this.productId = productId;
    this.priceId = priceId;
    this.quantity = quantity;
  }

  static fromStripeApi(customerId: StripeCustomerId, json: any): StripeInvoiceLine | ValidationError {
    const validator = new Validator(json);
    validator.requiredNumber("id");
    validator.requiredString("invoice");
    validator.requiredObject("price");
    validator.requiredString("price.id");
    validator.requiredObject("price.product");
    validator.requiredNumber("quantity");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }
    return new StripeInvoiceLine(
      new StripeInvoiceLineId(json.id),
      new StripeInvoiceId(json.invoice),
      customerId,
      new StripeProductId(json.price.product),
      new StripePriceId(json.price.id),
      json.quantity,
    );
  }

  static fromBackend(row: any): StripeInvoiceLine | ValidationError {
    const validator = new Validator(row);
    validator.requiredString("stripe_id");
    validator.requiredString("invoice_id");
    validator.requiredString("customer_id");
    validator.requiredString("product_id");
    validator.requiredString("price_id");
    validator.requiredNumber("quantity");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }
    return new StripeInvoiceLine(
      new StripeInvoiceLineId(row.stripe_id),
      new StripeInvoiceId(row.invoice_id),
      new StripeCustomerId(row.customer_id),
      new StripeProductId(row.product_id),
      new StripePriceId(row.price_id),
      row.quantity,
    );
  }
}
