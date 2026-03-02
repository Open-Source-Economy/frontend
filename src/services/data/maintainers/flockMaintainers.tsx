import thankfulCat from "src/assets/v1/cats/thankful-cat.svg";
import { Maintainer } from "src/utils/local-types";

const matthewCarroll: Maintainer = {
  displayName: "Matt Carroll",
  githubUsername: "matthew-carroll",
  githubAvatar: "https://avatars.githubusercontent.com/u/7259036?v=4",
  githubPage: "https://github.com/matthew-carroll",
  title: "Ex-Googler (Flutter, Nest)",
  quote: undefined,
  mascot: thankfulCat,
  mascotAlt: "Chief of the Flutter Bounty Hunters",
};

export const flockMaintainers: Maintainer[] = [matthewCarroll];
