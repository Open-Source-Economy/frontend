import { ChangeEvent, useState } from "react";
import { Credit, CreditUnit } from "src/model";
import Decimal from "decimal.js";

export function useCreditCounter(creditUnit: CreditUnit = CreditUnit.HOUR) {
  const [creditCounter, setCreditCounter] = useState<Credit | null>(null);

  const roundUpToIncrement = (value: Decimal): Decimal => {
    const incrementDecimal = new Decimal(creditUnit);
    return value.dividedBy(incrementDecimal).ceil().times(incrementDecimal);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setCreditCounter(null);
      return;
    }
    const decimalValue = new Decimal(value);
    setCreditCounter({
      unit: creditUnit,
      amount: roundUpToIncrement(decimalValue),
    });
  };

  const increment = () => {
    if (creditCounter) {
      setCreditCounter({
        unit: creditUnit,
        amount: roundUpToIncrement(creditCounter.amount.plus(creditUnit)),
      });
    } else {
      setCreditCounter({ unit: creditUnit, amount: new Decimal(creditUnit) });
    }
  };

  const decrement = () => {
    if (creditCounter && creditCounter.amount.isPositive()) {
      const newValue = roundUpToIncrement(creditCounter.amount.minus(creditUnit));
      setCreditCounter({ unit: creditUnit, amount: newValue.isNegative() ? new Decimal(0) : newValue });
    } else {
      setCreditCounter({ unit: creditUnit, amount: new Decimal(0) });
    }
  };

  return { counter: creditCounter, handleInputChange, increment, decrement };
}
