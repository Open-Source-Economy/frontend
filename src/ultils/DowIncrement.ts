import Decimal from "decimal.js";

export const DOW_INCREMENT = 0.01;

export const milliDoW = {
  display: (amount: Decimal) => {
    return Math.round(amount.div(1000).toNumber() * 1000) / 1000;
  },
};
