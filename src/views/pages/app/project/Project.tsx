import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import ProjectHero from "./ProjectHero";
import WhatWeOffer from "./WhatWeOffer";
import Participants from "./Participants";
import Highlight from "./HighLight";
import WhyNeedFunding from "./WhyNeedFunding";

interface ProjectProps {}

export function Project(props: ProjectProps) {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="overflow-hidden">
        <ProjectHero />
        <WhatWeOffer />
        <Highlight />
        <WhyNeedFunding />
        <Participants />
      </section>
    </PageWrapper>
  );
}
