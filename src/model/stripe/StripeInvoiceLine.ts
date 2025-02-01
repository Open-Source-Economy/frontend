import { ValidationError, Validator } from "../error";
import { StripeInvoiceId } from "./StripeInvoice";
import { StripeCustomerId } from "./StripeCustomer";
import { StripeProductId } from "./StripeProduct";
import { StripePriceId } from "./StripePrice";

export class StripeInvoiceLineId {
  id: string;

  constructor(id: string) {
    this.id = id;
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
    const id = validator.requiredString("id");
    const invoiceId = validator.requiredString("invoice");
    validator.requiredObject("price");
    const priceId = validator.requiredString(["price", "id"]);
    const productId = validator.requiredString(["price", "product"]);
    const quantity = validator.requiredNumber("quantity");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeInvoiceLine(
      new StripeInvoiceLineId(id),
      new StripeInvoiceId(invoiceId),
      customerId,
      new StripeProductId(productId),
      new StripePriceId(priceId),
      quantity,
    );
  }

  static fromBackend(row: any): StripeInvoiceLine | ValidationError {
    const validator = new Validator(row);
    const stripeId = validator.requiredString("stripe_id");
    const invoiceId = validator.requiredString("invoice_id");
    const customerId = validator.requiredString("stripe_customer_id");
    const productId = validator.requiredString("product_id");
    const priceId = validator.requiredString("price_id");
    const quantity = validator.requiredNumber("quantity");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new StripeInvoiceLine(
      new StripeInvoiceLineId(stripeId),
      new StripeInvoiceId(invoiceId),
      new StripeCustomerId(customerId),
      new StripeProductId(productId),
      new StripePriceId(priceId),
      quantity,
    );
  }
}
