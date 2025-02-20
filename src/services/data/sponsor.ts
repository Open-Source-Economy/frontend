import { generateRandomText } from "../../__mocks__";

export enum SponsorType {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  X_LARGE = "x-large",
}

interface Sponsor {
  logo: string;
  name: string;
  shortTagline?: string;
  longTagline?: string;
  link: string;
}

interface UniqueSponsorBlock {
  type: SponsorType;
  sponsor: Sponsor;
}

interface VerticalSponsorBlock {
  top: UniqueSponsorBlock | VerticalSponsorBlock | HorizontalSponsorBlock;
  bottom: UniqueSponsorBlock | VerticalSponsorBlock | HorizontalSponsorBlock;
}

interface HorizontalSponsorBlock {
  left: UniqueSponsorBlock | VerticalSponsorBlock | HorizontalSponsorBlock;
  right: UniqueSponsorBlock | VerticalSponsorBlock | HorizontalSponsorBlock;
}

function sponsorFactory(): Sponsor {
  return {
    logo: "https://via.placeholder.com/150",
    name: "https://via.placeholder.com/150",
    shortTagline: generateRandomText(6),
    longTagline: generateRandomText(30),
    link: "https://example.com",
  };
}

const sponsors1: (UniqueSponsorBlock | VerticalSponsorBlock | HorizontalSponsorBlock)[] = [
  {
    type: SponsorType.X_LARGE,
    sponsor: sponsorFactory(),
  },
  {
    type: SponsorType.LARGE,
    sponsor: sponsorFactory(),
  },
  {
    top: {
      type: SponsorType.MEDIUM,
      sponsor: sponsorFactory(),
    },
    bottom: {
      type: SponsorType.MEDIUM,
      sponsor: sponsorFactory(),
    },
  },
  {
    top: {
      type: SponsorType.SMALL,
      sponsor: sponsorFactory(),
    },
    bottom: {
      type: SponsorType.SMALL,
      sponsor: sponsorFactory(),
    },
  },
  {
    top: {
      type: SponsorType.SMALL,
      sponsor: sponsorFactory(),
    },
    bottom: {
      type: SponsorType.SMALL,
      sponsor: sponsorFactory(),
    },
  },
  {
    type: SponsorType.LARGE,
    sponsor: sponsorFactory(),
  },
  {
    top: {
      type: SponsorType.MEDIUM,
      sponsor: sponsorFactory(),
    },
    bottom: {
      type: SponsorType.MEDIUM,
      sponsor: sponsorFactory(),
    },
  },
  {
    type: SponsorType.LARGE,
    sponsor: sponsorFactory(),
  },
];
