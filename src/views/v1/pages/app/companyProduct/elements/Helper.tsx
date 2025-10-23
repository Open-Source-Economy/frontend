import communitydriven from "src/assets/v1/community-driven.webp";
import nonProfit from "src/assets/v1/non-profit.webp";
import talent from "src/assets/v1/talent.webp";
import { CreditUnit } from "src/model";
import { Decimal } from "decimal.js";

export const highlightData = [
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    developerServices: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: { unit: CreditUnit.MINUTE, amount: new Decimal(3.3) },
    total: { unit: CreditUnit.MINUTE, amount: new Decimal(10) },
    buttonText: "FUND",
    isBorder: false,
  },
  {
    title: "Cluster Maintenance",
    description: "There is a problem in the display of the home page",
    developerServices: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: { unit: CreditUnit.MINUTE, amount: new Decimal(3.3) },
    total: { unit: CreditUnit.MINUTE, amount: new Decimal(10) },
    buttonText: "FUND",
    isBorder: true,
  },
  {
    title: "Issue #4563",
    description: "There is a problem in the display of the home page",
    developerServices: ["Find bugs", "Technical Support", "Deployment Support"],
    progress: { unit: CreditUnit.MINUTE, amount: new Decimal(3.3) },
    total: { unit: CreditUnit.MINUTE, amount: new Decimal(10) },
    buttonText: "FUND",
    isBorder: false,
  },
];

export const virtuousCard = [
  {
    title: "100% Non-profit",
    // description: "Every penny fuels open source.",
    description: "Direct Impact on Open Source",
    cardIcon: nonProfit,
    isborder: false,
    ishover: true,
  },
  {
    title: "Community-Driven",
    // description: "From devs. By devs. For devs.",
    description: "By maintainers. For enterprises. Built to last",
    cardIcon: communitydriven,
    isborder: true,
    ishover: true,
  },
  {
    // title: "Top Talent, Ethical Impact",
    // description: "Access experts, guarantee fair pay.",
    title: "Ethical Partnership",
    description: "Access core maintainers. Ensure fair support",
    cardIcon: talent,
    isborder: false,
    ishover: true,
  },
];
