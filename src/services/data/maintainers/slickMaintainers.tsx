import thankfulCat from "src/assets/v1/cats/thankful-cat.svg";
import { Maintainer } from "src/utils/local-types";

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
