import Decimal from "decimal.js";
import { FundRecipient, ManageFundRecipient } from "../ManageFundRecipient";

describe("ManageFundRecipient", () => {
  describe("Constructor", () => {
    test("should throw error if no recipients are provided", () => {
      expect(() => new ManageFundRecipient(new Decimal(300), [])).toThrow("No recipients provided");
    });

    test("should throw error if totalAmount is not positive", () => {
      expect(() => new ManageFundRecipient(new Decimal(-1), [{ id: "rec1" }])).toThrow("Total amount must be a strictly positive number");
    });

    const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }];
    const totalAmount = new Decimal(100);
    const manager = new ManageFundRecipient(totalAmount, recipients);
    const expectedAmount = totalAmount.div(3);

    test("should initialize split with equal split amounts", () => {
      expect(manager.split.rec1[0].equals(expectedAmount)).toBe(true);
      expect(manager.split.rec2[0].equals(expectedAmount)).toBe(true);
      expect(manager.split.rec3[0].equals(expectedAmount)).toBe(true);
    });

    test("should initialize split with equal split amounts", () => {
      expect(manager.split.rec1[1]).toBe(false);
      expect(manager.split.rec2[1]).toBe(false);
      expect(manager.split.rec3[1]).toBe(false);
    });
  });

  describe("Method: setEqualSplit", () => {
    test("should reset split to equal split amounts when called", () => {
      // Initial setup
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);

      // Manually set some amounts
      manager.setRecipientAmount("rec1", new Decimal(100));
      manager.setRecipientAmount("rec2", new Decimal(50));

      // Call setEqualSplit
      manager.setEqualSplit();

      // Calculate the expected amount after equal split
      const expectedAmount = totalAmount.div(recipients.length);

      // Verify that all recipients now have the equal split amount
      recipients.forEach(recipient => {
        expect(manager.split[recipient.id][0].equals(expectedAmount)).toBe(true);
        expect(manager.split[recipient.id][1]).toBe(false);
      });
    });

    test("should handle cases where a recipients was disabled", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }];
      const totalAmount = new Decimal(350);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      manager.disableRecipient("rec1");

      // Call setEqualSplit
      manager.setEqualSplit();

      // Calculate the expected amount
      const expectedAmount = totalAmount.div(recipients.length);

      recipients.forEach(recipient => {
        expect(manager.split[recipient.id][0].equals(expectedAmount)).toBe(true);
        expect(manager.split[recipient.id][1]).toBe(false);
      });
    });
  });

  describe("Method: disableRecipient", () => {
    test("should throw error when disabling a non-existent recipient", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      expect(() => manager.disableRecipient("nonexistent")).toThrow("Recipient not found");
    });

    test("should disable recipient correctly", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      manager.disableRecipient("rec1");

      expect(manager.split.rec1[0].equals(new Decimal(0))).toBe(true);
      expect(manager.split.rec1[1]).toBe(true);

      expect(manager.split.rec2[0].toNumber()).toBe(150);
      expect(manager.split.rec2[1]).toBe(false);

      expect(manager.split.rec3[0].toNumber()).toBe(150);
      expect(manager.split.rec3[1]).toBe(false);
    });

    test("should disable recipient correctly, after the recipient has being manually set", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      manager.setRecipientAmount("rec1", new Decimal(50));
      manager.disableRecipient("rec1");

      expect(manager.split.rec1[0].equals(new Decimal(0))).toBe(true);
      expect(manager.split.rec1[1]).toBe(true);

      expect(manager.split.rec2[0].toNumber()).toBe(150);
      expect(manager.split.rec2[1]).toBe(false);

      expect(manager.split.rec3[0].toNumber()).toBe(150);
      expect(manager.split.rec3[1]).toBe(false);
    });
  });

  // === Method: setRecipientAmount Tests ===
  describe("Method: setRecipientAmount", () => {
    test("should throw error for invalid recipient amount", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      expect(() => manager.setRecipientAmount("rec1", new Decimal(-10))).toThrow("Amount must be a positive number");

      expect(() => manager.setRecipientAmount("rec1", new Decimal(400))).toThrow("Amount must be less than or equal to the total amount");
    });

    test("should throw error if total amount is exceeded after setting recipient amount", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }];
      const totalAmount = new Decimal(300);
      const manager = new ManageFundRecipient(totalAmount, recipients);
      manager.setRecipientAmount("rec1", new Decimal(100));
      expect(() => manager.setRecipientAmount("rec2", new Decimal(300))).toThrow(
        "Amount + all amount manually set must be less than or equal to the total amount",
      );
    });

    test("should set recipient amount correctly and re-distribute", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }, { id: "rec4" }];
      const totalAmount = new Decimal(350);
      const manager = new ManageFundRecipient(totalAmount, recipients);

      manager.setRecipientAmount("rec1", new Decimal(50));

      expect(manager.split.rec1[0].equals(new Decimal(50))).toBe(true);
      expect(manager.split.rec1[1]).toBe(true);

      expect(manager.split.rec2[0].toNumber()).toBe(100);
      expect(manager.split.rec2[1]).toBe(false);

      expect(manager.split.rec3[0].toNumber()).toBe(100);
      expect(manager.split.rec3[1]).toBe(false);

      expect(manager.split.rec4[0].toNumber()).toBe(100);
      expect(manager.split.rec4[1]).toBe(false);
    });

    test("should set recipient amount twice", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }, { id: "rec4" }];
      const totalAmount = new Decimal(350);
      const manager = new ManageFundRecipient(totalAmount, recipients);

      manager.setRecipientAmount("rec1", new Decimal(50));
      manager.setRecipientAmount("rec1", new Decimal(50));

      expect(manager.split.rec1[0].equals(new Decimal(50))).toBe(true);
      expect(manager.split.rec1[1]).toBe(true);

      expect(manager.split.rec2[0].toNumber()).toBe(100);
      expect(manager.split.rec2[1]).toBe(false);

      expect(manager.split.rec3[0].toNumber()).toBe(100);
      expect(manager.split.rec3[1]).toBe(false);

      expect(manager.split.rec4[0].toNumber()).toBe(100);
      expect(manager.split.rec4[1]).toBe(false);
    });

    test("should set recipient amount correctly on multiple recipient and re-distribute", () => {
      const recipients: FundRecipient[] = [{ id: "rec1" }, { id: "rec2" }, { id: "rec3" }, { id: "rec4" }];
      const totalAmount = new Decimal(350);
      const manager = new ManageFundRecipient(totalAmount, recipients);

      manager.setRecipientAmount("rec1", new Decimal(50));
      manager.setRecipientAmount("rec2", new Decimal(90));

      expect(manager.split.rec1[0].equals(new Decimal(50))).toBe(true);
      expect(manager.split.rec1[1]).toBe(true);

      expect(manager.split.rec2[0].toNumber()).toBe(90);
      expect(manager.split.rec2[1]).toBe(true);

      expect(manager.split.rec3[0].toNumber()).toBe(105); // (350 - 50 - 90) / 2
      expect(manager.split.rec3[1]).toBe(false);

      expect(manager.split.rec4[0].toNumber()).toBe(105);
      expect(manager.split.rec4[1]).toBe(false);
    });
  });
});
