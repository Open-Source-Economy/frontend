import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import WhatWeOffer from "src/views/pages/app/project/elements/WhatWeOffer";
import Participants from "src/views/pages/app/project/elements/Participants";
import Highlight from "src/views/pages/app/project/elements/HighLight";
import React from "react";
import { PageTitle } from "./elements/PageTitle";
import WhyNeedFunding from "./elements/WhyNeedFunding";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { useRepository } from "../../../hooks";

interface ProjectProps {}

export function Project(props: ProjectProps) {
  const { repositoryId } = useRepositoryContext();
  const { owner, repository, error, reloadRepository } = useRepository(repositoryId);

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="overflow-hidden">
        {owner && repository && <PageTitle owner={owner} repository={repository} displayProjectSubtitle={true} displayWhatDoWeOffer={true} />}
        <WhatWeOffer />
        <Highlight />
        <WhyNeedFunding />
        <Participants />
      </section>
    </PageWrapper>
  );
}
