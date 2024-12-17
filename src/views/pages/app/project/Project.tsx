import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import WhatWeOffer from "src/views/pages/app/project/elements/WhatWeOffer";
import Participants from "src/views/pages/app/project/elements/Participants";
import Highlight from "src/views/pages/app/project/elements/HighLight";
import React from "react";
import { PageTitle } from "./elements/PageTitle";
import WhyNeedFunding from "./elements/WhyNeedFunding";

interface ProjectProps {}

export function Project(props: ProjectProps) {
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
