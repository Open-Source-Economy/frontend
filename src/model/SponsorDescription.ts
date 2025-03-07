import { CardSize } from "../api/dto";

export interface SponsorDescription {
  title?: string;
  subtitle?: string;
  imgUrl?: string;
  size?: CardSize;
  imgClasses?: string;
  details?: React.ReactNode;
  description?: string;
  callToAction?: React.ReactNode;
  nestedCards?: SponsorDescription[];
  isLeftCat?: boolean;
  isRightCat?: boolean;
  className?: string;
  isUnderline?: boolean;
  main?: boolean;
  position?: number;
}
