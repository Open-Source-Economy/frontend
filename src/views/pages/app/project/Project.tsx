import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { WhatWeOffer } from "src/views/pages/app/project/elements/WhatWeOffer";
import { Maintainers } from "src/views/pages/app/project/elements/Maintainers";
import { Highlight } from "src/views/pages/app/project/elements/HighLight";
import React, { useEffect } from "react";
import { PageTitle } from "./elements/PageTitle";
import { WhyNeedFunding } from "./elements";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { useRepository } from "../../../hooks";

interface ProjectProps {}

export function Project(props: ProjectProps) {
  const { repositoryId } = useRepositoryContext();
  const { owner, repository, error, reloadRepository } = useRepository(repositoryId);

  useEffect(() => {
    reloadRepository();
  }, []);

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="overflow-hidden">
        {owner && repository && <PageTitle owner={owner} repository={repository} displayProjectSubtitle={true} displayWhatDoWeOffer={true} />}
        <WhatWeOffer />
        <Highlight />
        <WhyNeedFunding />
        <Maintainers repositoryId={repositoryId} />
      </section>
    </PageWrapper>
  );
}
