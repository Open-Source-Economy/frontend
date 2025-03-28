import Decimal from "decimal.js";
import { ApiError } from "../api/model/error/ApiError";
import { StatusCodes } from "http-status-codes";

export enum CreditUnit {
  MINUTE = 1,
  HOUR = 0.5,
}

export interface Credit {
  unit: CreditUnit;
  amount: Decimal;
}

export const credit = {
  fromBackend: (amount: number): Credit => {
    return { amount: new Decimal(amount), unit: CreditUnit.MINUTE };
  },
  toMinutes: (credit: Credit | null): number => {
    if (!credit) {
      return 0;
    } else if (credit.unit === CreditUnit.MINUTE) {
      return credit.amount.toNumber();
    } else if (credit.unit === CreditUnit.HOUR) {
      return credit.amount.times(60).toNumber();
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unsupported credit unit: ${credit.unit}`);
    }
  },
  lessThanOrEqualTo: (credit: Credit, that: Credit | null): boolean => {
    if (!that) {
      return false;
    }

    // Convert both to the same unit for comparison (let's use minutes for this example)
    let thisAmountInMinutes = credit.amount;
    let thatAmountInMinutes = that.amount;

    if (credit.unit === CreditUnit.HOUR) {
      thisAmountInMinutes = thisAmountInMinutes.times(60); // Convert hours to minutes
    }

    if (that.unit === CreditUnit.HOUR) {
      thatAmountInMinutes = thatAmountInMinutes.times(60); // Convert hours to minutes
    }

    // Compare the amounts in minutes
    return thisAmountInMinutes.lessThanOrEqualTo(thatAmountInMinutes);
  },

  /**
   * Display the amount in a human-readable format
   * @param credit The credit to display, if number, it is assumed to be in minutes
   * @param displayMinutesUnits Whether to display the minutes unit when the amount is more than 1 hour
   */
  displayAmount: (credit: Credit | number | null, displayMinutesUnits: boolean = true): string => {
    const c =
      typeof credit === "number"
        ? {
            amount: new Decimal(credit),
            unit: CreditUnit.MINUTE,
          }
        : credit;

    if (!c) {
      return "0h";
    } else if (c.unit === CreditUnit.MINUTE) {
      const amount = c.amount.toNumber(); // Convert Decimal to a number
      if (amount >= 60) {
        const hours = Math.floor(amount / 60);
        const remainingMinutes = amount % 60;
        if (remainingMinutes === 0 || !displayMinutesUnits) {
          return `${hours}h`;
        } else {
          return `${hours}h${remainingMinutes}min`;
        }
      } else {
        return `${amount}min`;
      }
    } else if (c.unit === CreditUnit.HOUR) {
      const hours = Math.floor(c.amount.ceil().toNumber());
      const minutes = (c.amount.toNumber() - hours) * 60; // Convert remaining decimal to minutes
      if (minutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h${minutes}min`;
      }
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unsupported credit unit: ${c.unit}`);
    }
  },
  displayUnit: (credit: Credit | null): string => {
    let unit = "";
    if (!credit) {
      return "";
    } else if (credit.unit === CreditUnit.MINUTE) {
      unit = "minute";
    } else if (credit.unit === CreditUnit.HOUR) {
      unit = "hour";
    } else {
      throw new ApiError(StatusCodes.NOT_IMPLEMENTED, `Unsupported credit unit: ${credit.unit}`);
    }

    if (credit.amount.greaterThan(new Decimal(1))) {
      unit += "s";
    }
    return unit;
  },

  percentage: (progress: Credit, total: Credit): number => {
    const progressMinutes = credit.toMinutes(progress);
    const totalMinutes = credit.toMinutes(total);
    return Math.min((progressMinutes / totalMinutes) * 100, 100);
  },
};
