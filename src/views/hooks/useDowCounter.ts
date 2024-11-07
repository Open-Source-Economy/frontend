import { ChangeEvent, useState } from "react";
import { DOW_INCREMENT } from "src/ultils";
import Decimal from "decimal.js";

export function useDowCounter() {
  const [counter, setCounter] = useState<Decimal | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCounter(new Decimal(value));
  };

  const increment = () => {
    if (counter) setCounter(counter.plus(DOW_INCREMENT));
    else setCounter(new Decimal(DOW_INCREMENT));
  };

  const decrement = () => {
    if (counter && counter.isPositive()) setCounter(counter.minus(DOW_INCREMENT));
    else setCounter(new Decimal(DOW_INCREMENT));
  };

  return { counter, handleInputChange, increment, decrement };
}
