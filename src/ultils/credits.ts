import Decimal from "decimal.js";

enum CreditsIncrement {
  MINUTE = 1,
  HOUR = 0.5,
}
export const CREDIT_INCREMENT = 1;

export const credits = {
  display: (amount: Decimal): string => {
    const minutes = amount.toNumber(); // Convert Decimal to a number

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h${remainingMinutes}min`;
      }
    } else {
      return `${minutes}min`;
    }
  },
};
