import happyCat from "../../assets/cats/participant-card-1.png";
import thankfulCat from "../../assets/cats/participant-card-2.png";
import helloCat from "../../assets/cats/participant-card-3.png";
import normalCat from "../../assets/cats/participant-card-4.png";
import { Maintainer } from "../../dtos";

const raboof: Maintainer = {
  displayName: "Arnout Engelen",
  githubUsername: "raboof",
  githubAvatar: "https://avatars.githubusercontent.com/u/131856?v=4",
  githubPage: "https://github.com/raboof",
  title: "ex Lightbend Principal Engineer",
  quote: undefined,
  mascot: thankfulCat,
  mascotAlt: "Self-employed & Apache Foundation",
};

const pjfanning: Maintainer = {
  displayName: "PJ Fanning",
  githubUsername: "pjfanning",
  githubAvatar: "https://avatars.githubusercontent.com/u/11783444?v=4",
  githubPage: "https://github.com/pjfanning",
  title: "Pekko Generalist",
  quote: undefined,
  mascot: helloCat,
  mascotAlt: "I dedicate my life to Pekko and OSS!",
};

const mdedetrich: Maintainer = {
  displayName: "Matthew de Detrich",
  githubUsername: "mdedetrich",
  githubAvatar: "https://avatars.githubusercontent.com/u/2337269?v=4",
  githubPage: "https://github.com/mdedetrich",
  title: "Pekko Stream Expert",
  quote: undefined,
  mascot: happyCat,
  mascotAlt: "Only the best for Pekko!",
};

const jrudolph: Maintainer = {
  displayName: "Johannes Rudolph",
  githubUsername: "jrudolph",
  githubAvatar: "https://avatars.githubusercontent.com/u/9868?v=4",
  githubPage: "https://github.com/jrudolph",
  title: "Pekko Cluster Expert",
  quote: undefined,
  mascot: normalCat,
  mascotAlt: " Would love to be full-time on Pekko!",
};

export const pekkoMaintainers: Maintainer[] = [raboof, pjfanning, mdedetrich, jrudolph];
