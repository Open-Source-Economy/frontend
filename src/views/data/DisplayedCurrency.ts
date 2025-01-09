import { Currency } from "src/model";

// TODO put this class somewhere else
export interface DisplayedCurrency {
  name: string;
  code: string;
  symbol: string;
}

export const displayedCurrencies: Record<Currency, DisplayedCurrency> = {
  [Currency.USD]: { name: "United States Dollar", code: "USD", symbol: "$" },
  [Currency.EUR]: { name: "Euro", code: "EUR", symbol: "€" },
  [Currency.GBP]: { name: "British Pound", code: "GBP", symbol: "£" },
  [Currency.CHF]: { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
};

// { name: "Australian Dollar", code: "AUD", symbol: "A$" },
// { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
// { name: "Israeli Shekel", code: "ILS", symbol: "₪" },
// { name: "Japanese Yen", code: "JPY", symbol: "¥" },
// { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
// { name: "Indian Rupee", code: "INR", symbol: "₹" },
// { name: "Brazilian Real", code: "BRL", symbol: "R$" },
// { name: "South African Rand", code: "ZAR", symbol: "R" },
// { name: "Mexican Peso", code: "MXN", symbol: "MX$" },
// { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
// { name: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
