import type { CardSize } from "./types";

export const getCardWidth = (size?: CardSize) => {
  switch (size) {
    case "xlarge":
      return "col-span-2"; // 50% width on larger screens
    case "large":
      return "col-span-2 sm:col-span-1"; // 25% width on larger screens
    case "small":
      return "col-span-1 sm:col-span-1/2";
    default:
      return "col-span-2 sm:col-span-1"; // Default sizing
  }
};
