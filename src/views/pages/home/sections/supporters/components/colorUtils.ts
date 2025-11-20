export const colorWithAlpha = (color: string, alpha: number) => `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent)`;
