import { ChangeEvent, useState } from "react";
import { CREDIT_INCREMENT } from "src/ultils";
import Decimal from "decimal.js";

export function useCreditCounter() {
  const [counter, setCounter] = useState<Decimal | null>(null);

  const roundUpToIncrement = (value: Decimal): Decimal => {
    const incrementDecimal = new Decimal(CREDIT_INCREMENT);
    return value.dividedBy(incrementDecimal).ceil().times(incrementDecimal);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setCounter(null);
      return;
    }
    const decimalValue = new Decimal(value);
    setCounter(roundUpToIncrement(decimalValue));
  };

  const increment = () => {
    if (counter) {
      setCounter(roundUpToIncrement(counter.plus(CREDIT_INCREMENT)));
    } else {
      setCounter(new Decimal(CREDIT_INCREMENT));
    }
  };

  const decrement = () => {
    if (counter && counter.isPositive()) {
      const newValue = roundUpToIncrement(counter.minus(CREDIT_INCREMENT));
      setCounter(newValue.isNegative() ? new Decimal(0) : newValue);
    } else {
      setCounter(new Decimal(0));
    }
  };

  return { counter, handleInputChange, increment, decrement };
}
