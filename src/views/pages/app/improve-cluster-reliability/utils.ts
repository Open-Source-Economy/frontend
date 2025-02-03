import type { CardSize } from "./types";

export const getCardWidth = (size?: CardSize) => {
  switch (size) {
    case "xlarge":
      return "col-span-4"; // 50% width on larger screens
    case "large":
      return "col-span-4 sm:col-span-2"; // 25% width on larger screens

    case "xsmall":
      return "col-span-4 sm:col-span-2 lg:col-span-1";
    default:
      return "col-span-2 sm:col-span-1"; // Default sizing
  }
};
