import type { CardSize } from "./types";

export const getCardWidth = (size?: CardSize) => {
  switch (size) {
    case "xlarge":
      return "w-full flex md:w-[66%] lg:w-[49.3%]"; // 50% width on larger screens
    case "large":
      return "w-full sm:w-[49.3%] flex md:w-[32.6%] lg:w-[24.3%]"; // 25% width on larger screens
    case "small":
      return "w-full sm:w-[49.3%] flex md:w-[24%] lg:w-[12%]";
    case "xsmall":
      return "w-full  flex sm:w-[24%] lg:w-[12%]";
    default:
      return "col-span-2 sm:col-span-1"; // Default sizing
  }
};
