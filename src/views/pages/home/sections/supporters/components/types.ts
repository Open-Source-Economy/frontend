export enum SponsorTierName {
  Platinum = "Platinum",
  Gold = "Gold",
  Silver = "Silver",
  Bronze = "Bronze",
}

export interface SponsorTier {
  tier: SponsorTierName;
  badge?: string;
  cardWidth: string;
  cardPadding: string;
  textSize: string;
  descriptionSize?: string;
  descriptionLines?: number;
  accentColor: string;
  iconType: "crown" | "award" | "star" | "heart";
}

export interface Sponsor extends SponsorTier {
  name: string;
  domain: string;
  tagline?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface IndividualSupporter {
  name: string;
  initials: string;
  avatarUrl?: string;
  isAnonymous?: boolean;
  monthlyAmount?: number;
}
