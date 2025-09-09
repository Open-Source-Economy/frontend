import { Currency } from "@open-source-economy/api-types";

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
  // [Currency.AUD]: { name: "Australian Dollar", code: "AUD", symbol: "A$" },
  // [Currency.CAD]: { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
  // [Currency.ILS]: { name: "Israeli Shekel", code: "ILS", symbol: "₪" },
  // [Currency.JPY]: { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  // [Currency.CNY]: { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  // [Currency.INR]: { name: "Indian Rupee", code: "INR", symbol: "₹" },
  // [Currency.BRL]: { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  // [Currency.ZAR]: { name: "South African Rand", code: "ZAR", symbol: "R" },
  // [Currency.MXN]: { name: "Mexican Peso", code: "MXN", symbol: "MX$" },
  // [Currency.SGD]: { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
  // [Currency.NZD]: { name: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
};
