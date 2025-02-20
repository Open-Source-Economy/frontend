export type CardSize = "xlarge" | "large" | "small" | "xsmall";

export interface SponsorCardData {
  id: string;
  title?: string;
  subtitle?: string;
  imgUrl?: string;
  size?: CardSize;
  imgClasses?: string;
  details?: string;
  description?: string;
  nestedCards?: SponsorCardData[];
  isLeftCat?: boolean;
  isRightCat?: boolean;
  className?: string;
  isUnderline?: boolean;
  main?: boolean;
  position?: number;
}
