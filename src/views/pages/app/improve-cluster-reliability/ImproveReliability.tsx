import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { WhyDoWeNeedYourHelp } from "./WhyDoWeNeedYourHelp";
import { UseOfFunds } from "./UseOfFunds";
import { WhyTrustUs } from "./WhyTrustUs";
import { AQuestion } from "./AQuestion";
import { FundingCampaign } from "./FundingCampaign";
import { Maintainers } from "../project/elements/Maintainers";
import { useMaintainers, useRepository } from "../../../hooks";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { PageTitle } from "../project/elements/PageTitle";

interface ImproveReliabilityProps {}

export function ImproveReliability(props: ImproveReliabilityProps) {
  const { repositoryId } = useRepositoryContext();
  const { owner, repository, error, reloadRepository } = useRepository(repositoryId);
  const { maintainers, isLoading, maintainersError, reloadMaintainers } = useMaintainers(repositoryId); // TODO: deal with isLoading and maintainersError and error

  useEffect(() => {
    reloadRepository();
    reloadMaintainers();
  }, []);

  return (
    <>
      <PageWrapper baseURL={BaseURL.APP}>
        {owner && repository && <PageTitle owner={owner} repository={repository} />}
        <FundingCampaign currentAmount={300} targetAmount={1400} backers={25} daysLeft={30} />
        <Maintainers maintainers={maintainers} viewAllButton={false} />
        <AQuestion />
        <WhyDoWeNeedYourHelp />
        <UseOfFunds />
        <WhyTrustUs />

        {/*TODO: error*/}
        {error && <div>{error.message}</div>}
        {maintainersError && <div>{maintainersError.message}</div>}
      </PageWrapper>
    </>
  );
}
