import thankfulCat from "../../../assets/cats/thankful-cat.svg";
import { Maintainer } from "@open-source-economy/api-types";

const matthewCarroll: Maintainer = {
  displayName: "Naftoli Gugenheim",
  githubUsername: "nafg",
  githubAvatar: "https://avatars.githubusercontent.com/u/98384?v=4",
  githubPage: "https://github.com/nafg",
  title: "Independent Software Engineer",
  quote: undefined,
  mascot: thankfulCat,
  mascotAlt: "Maintaining Slick since 2021",
};

export const slickMaintainers: Maintainer[] = [matthewCarroll];
