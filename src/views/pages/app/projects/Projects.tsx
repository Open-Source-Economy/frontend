import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import WhatWeOffer from "./WhatWeOffer";
import Participants from "./Participants";
import Highlight from "./HighLight";
import { PageTitle } from "./elements";
import WhyNeedFunding from "./WhyNeedFunding";

interface ProjectProps {}

export function Projects(props: ProjectProps) {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="overflow-hidden">
        <PageTitle logo={"https://avatars.githubusercontent.com/u/141809657?v=4"} />
        <WhatWeOffer />
        <Highlight />
        <WhyNeedFunding />
        <Participants />
      </section>
    </PageWrapper>
  );
}
