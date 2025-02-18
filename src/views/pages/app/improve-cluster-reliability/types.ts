export type CardSize = "xlarge" | "large" | "small" | "xsmall";

export interface SponsorCardData {
  id: string;
  type: "mainSwissBorg" | "swissBorg" | "adidas" | "softwareMill";
  title?: string;
  subtitle?: string;
  size?: CardSize;
  details?: string;
  description?: string;
  nestedCards?: SponsorCardData[];
  isLeftCat?: boolean;
  isRightCat?: boolean;
  className?: string;
  isUnderline?: boolean;
  position?: number;
}
