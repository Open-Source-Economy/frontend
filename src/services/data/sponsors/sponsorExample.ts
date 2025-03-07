import swissBorg from "../../../assets/sponsor/swiss-borg.webp";
import adidas from "../../../assets/sponsor/adidas.webp";
import softwareMill from "../../../assets/sponsor/software-mill.webp";
import { CardSize } from "../../../api/dto";
import { SponsorDescription } from "../../../model";

// example data
const sponsorData: SponsorDescription[] = [
  {
    imgUrl: swissBorg,
    main: true,
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    isUnderline: true,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
  },
  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    isRightCat: true,
  },
  {
    imgUrl: adidas,
    size: "large" as CardSize,
    nestedCards: [
      {
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    imgUrl: adidas,
    size: "large" as CardSize,

    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: swissBorg, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    isRightCat: true,
  },
  {
    imgUrl: adidas,
    size: "large" as CardSize,
    nestedCards: [
      {
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    isLeftCat: true,
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
  },
];
const alternateSponsorData: SponsorDescription[] = [
  {
    size: "small" as CardSize,
    imgUrl: softwareMill,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
  {
    imgUrl: swissBorg,
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    position: 2,
  },
  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
  {
    size: "large" as CardSize,
    position: 5,
    nestedCards: [
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    position: 3,
    isLeftCat: true,
  },
  {
    size: "large" as CardSize,
    position: 4,
    nestedCards: [
      {
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    position: 3,
    isRightCat: true,
  },
  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
];
const otherSponsorData: SponsorDescription[] = [
  {
    imgUrl: swissBorg,
    size: "large" as CardSize,
    subtitle: "Distributed systems like Pekko",
    isRightCat: true,
    position: 6,
  },
  {
    className: "!gap-0.5 !pt-1 !pb-3",
    size: "large" as CardSize,
    position: 5,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      {
        imgUrl: adidas,
        size: "large" as CardSize,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!justify-center !gap-0.5 !pt-1 !pb-3 !col-span-2",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    imgUrl: swissBorg,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    position: 5,
  },
  {
    className: "!gap-0.5 !pt-1 !pb-3",
    size: "large" as CardSize,
    position: 1,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3 !col-span-2",
        description: "Distributed systems like Pekko are inherently complex.",
        size: "large" as CardSize,
      },
    ],
  },
  {
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    imgUrl: swissBorg,
    main: true,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    position: 0,
  },
  {
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    imgUrl: swissBorg,

    isRightCat: true,
    position: 5,
  },
];
const withOutExtraLarge: SponsorDescription[] = [
  {
    imgUrl: swissBorg,
    size: "large" as CardSize,
    subtitle: "Distributed systems like Pekko",
    isLeftCat: true,
    position: 6,
  },
  {
    className: "!gap-0.5 !pt-1 !pb-3",
    size: "large" as CardSize,
    position: 5,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      {
        imgUrl: adidas,
        size: "large" as CardSize,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!justify-center !gap-0.5 !pt-1 !pb-3 !col-span-2",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    className: "!gap-0.5 !pt-1 !pb-3",
    size: "large" as CardSize,
    position: 1,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3 !col-span-2",
        description: "Distributed systems like Pekko are inherently complex.",
        size: "large" as CardSize,
      },
    ],
  },
  {
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    imgUrl: swissBorg,
    isRightCat: true,
    position: 5,
  },
];
const withoutLarge: SponsorDescription[] = [
  {
    size: "small" as CardSize,
    imgUrl: softwareMill,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
  {
    imgUrl: swissBorg,
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    main: true,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    position: 2,
  },
  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },

  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },

  {
    size: "small" as CardSize,
    position: 0,
    nestedCards: [
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
      { imgUrl: softwareMill, className: "!justify-center !gap-1" },
    ],
  },
];
const withoutSmallData: SponsorDescription[] = [
  {
    imgUrl: swissBorg,
    title: "Empowering Your Financial Freedom",
    size: "xlarge" as CardSize,
    details: "A Company that Buy, sell and exchange crypto- currencies with 16 fiats including EUR, CHF and GBP.",
    position: 2,
  },

  {
    size: "large" as CardSize,
    position: 5,
    nestedCards: [
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgUrl: adidas,
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },
  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    position: 3,
    isLeftCat: true,
  },
  {
    size: "large" as CardSize,
    position: 4,
    nestedCards: [
      {
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
      {
        imgClasses: "!max-w-[70px] lg:!max-w-24 1800:!max-w-[114px]",
        imgUrl: adidas,
        className: "!gap-0.5 !pt-1 !pb-3",
        description: "Distributed systems like Pekko are inherently complex.",
      },
    ],
  },

  {
    imgUrl: swissBorg,
    subtitle: "Distributed systems like Pekko",
    size: "large" as CardSize,
    position: 3,
    isRightCat: true,
  },
];
