import Decimal from "decimal.js";

// TODO: not the correct place for this
export abstract class FundRecipient {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class ManageFundRecipient {
  private ZERO = new Decimal(0);

  totalAmount: Decimal;
  recipients: FundRecipient[];
  split: { [id: string]: [amount: Decimal, manuallySet: Boolean] }; // True = manually set, False = equal split amount all recipient has been set manually

  constructor(totalAmount: Decimal, recipients: FundRecipient[]) {
    if (recipients.length === 0) {
      throw new Error("No recipients provided");
    }
    if (totalAmount.lessThanOrEqualTo(0)) {
      throw new Error("Total amount must be a strictly positive number");
    }
    this.totalAmount = totalAmount;
    this.recipients = recipients;
    this.split = this.equalSplit(totalAmount, recipients);
  }

  private equalSplit(totalAmount: Decimal, recipients: FundRecipient[]): { [id: string]: [Decimal, Boolean] } {
    const split: { [id: string]: [Decimal, Boolean] } = {};
    const numberOfRecipients = recipients.length;

    // Split the total amount equally among all recipients
    // TODO: Handle rounding errors
    const splitAmount = totalAmount.div(numberOfRecipients);

    // Distribute the amount equally among recipients
    recipients.forEach(recipient => {
      split[recipient.id] = [splitAmount, false];
    });

    return split;
  }

  private manuallySetAmountExpect(expectId: string): Decimal {
    return Object.entries(this.split)
      .filter(([id, [amount, manuallySet]]) => manuallySet && id !== expectId)
      .map(([id, [amount, manuallySet]]) => amount)
      .reduce((acc, amount) => acc.plus(amount), new Decimal(0)); // sum all
  }

  private recipientIdsNotManuallySet(): string[] {
    return Object.entries(this.split)
      .filter(([id, [amount, manuallySet]]) => !manuallySet)
      .map(([id, [amount, manuallySet]]) => id);
  }

  // Split the amount equally among all recipients that have not been manually set
  private splitAmountAmongRecipientIdsNotManually(amount: Decimal) {
    const recipientIdsNotManuallySet = this.recipientIdsNotManuallySet();

    const remainingAmountPerRecipient = amount.div(recipientIdsNotManuallySet.length);
    recipientIdsNotManuallySet.forEach(id => {
      this.split[id] = [remainingAmountPerRecipient, false];
    });
  }

  setEqualSplit() {
    this.split = this.equalSplit(this.totalAmount, this.recipients);
  }

  disableRecipient(recipientId: string) {
    if (!this.split[recipientId]) {
      throw new Error("Recipient not found");
    }

    this.setRecipientAmount(recipientId, this.ZERO);
  }

  setRecipientAmount(recipientId: string, amount: Decimal) {
    if (!this.split[recipientId]) {
      throw new Error("Recipient not found");
    }
    if (amount.lessThan(0)) {
      throw new Error("Amount must be a positive number");
    }
    if (amount.greaterThan(this.totalAmount)) {
      throw new Error("Amount must be less than or equal to the total amount");
    }

    const manuallySetAmount = this.manuallySetAmountExpect(recipientId).plus(amount);
    const remainingAmountToSplitEqually = this.totalAmount.minus(manuallySetAmount);
    if (remainingAmountToSplitEqually.lessThan(0)) {
      throw new Error("Amount + all amount manually set must be less than or equal to the total amount");
    }
    this.split[recipientId] = [amount, true];
    this.splitAmountAmongRecipientIdsNotManually(remainingAmountToSplitEqually);
  }
}
