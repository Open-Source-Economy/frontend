import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import WhyDoWeNeedYourHelp from "./WhyDoWeNeedYourHelp";
import { UseOfFunds } from "./UseOfFunds";
import { WhyTrustUs } from "./WhyTrustUs";
import { AQuestion } from "./AQuestion";
import { FundingCampaign } from "./FundingCampaign";
import Participants from "../project/elements/Participants";
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
        <FundingCampaign />
        <Participants viewAll={false} />
        <AQuestion />
        <WhyDoWeNeedYourHelp />
        <UseOfFunds />
        <WhyTrustUs />
      </PageWrapper>
    </>
  );
}
