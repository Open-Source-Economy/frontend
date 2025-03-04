export const NumberUtils = {
  toLocaleStringPrice: (num: number): string => {
    return (num / 100).toLocaleString();
  },
};
