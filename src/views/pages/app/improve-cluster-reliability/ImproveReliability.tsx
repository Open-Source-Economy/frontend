import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { useRepository } from "../../../hooks";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { PageTitle } from "../project/elements/PageTitle";

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
        <FundingCampaign currentAmount={300} targetAmount={1400} backers={25} daysLeft={30} />
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
