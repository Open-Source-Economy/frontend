import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { useRepository } from "../../../hooks";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { PageTitle } from "../project/elements/PageTitle";
import { CompanyNumberBanner } from "./elements/CompanyNumberBanner";

interface ImproveReliabilityProps {}

export function ImproveReliability(props: ImproveReliabilityProps) {
  const { repositoryId } = useRepositoryContext();
  const { owner, repository, error, reloadRepository } = useRepository(repositoryId);

  useEffect(() => {
    reloadRepository();
  }, []);

  return (
    <>
      <PageWrapper baseURL={BaseURL.APP}>
        {owner && repository && <PageTitle owner={owner} repository={repository} />}
        <FundingCampaign repositoryId={repositoryId} />
        <CompanyNumberBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />
        <Maintainers repositoryId={repositoryId} viewAllButton={false} />
        <AQuestion />
        <WhyDoWeNeedYourHelp />
        <UseOfFunds />
        <WhyTrustUs />

        {/*TODO: error*/}
        {error && <div>{error.message}</div>}
      </PageWrapper>
    </>
  );
}
