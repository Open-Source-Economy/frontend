export type CardSize = "xlarge" | "large" | "small" | "xsmall";

export interface SponsorCardData {
  id: string;
  type: "mainSwissBorg" | "swissBorg" | "adidas" | "softwareMill";
  title?: string;
  subtitle?: string;
  size?: CardSize;
  nestedCards?: Array<Omit<SponsorCardData, "nestedCards" | "size">>;
  details?: string;
  description?: string;
  isLeftCat?: boolean;
  isRightCat?: boolean;
  className?: string;
  position?: number;
}
