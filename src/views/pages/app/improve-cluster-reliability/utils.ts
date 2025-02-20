import type { CardSize } from "./types";

export const getCardWidth = (size?: CardSize) => {
  switch (size) {
    case "xlarge":
      return "w-full flex md:w-[66.4%] lg:w-[49%] 2xl:w-[49.1%]"; // 50% width on larger screens
    case "large":
      return "w-full 500:w-[49%] flex md:w-[32.5%] lg:w-[24.2%] xl:w-[24.3%]"; // 25% width on larger screens
    case "small":
      return "w-[48%] 500:w-[23.7%] flex md:w-[16%] lg:w-[12%]";

    default:
      return "col-span-2 sm:col-span-1"; // Default sizing
  }
};
