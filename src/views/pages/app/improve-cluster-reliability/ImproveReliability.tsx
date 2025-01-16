import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { useRepository } from "../../../hooks";
import { useRepositoryContext } from "../../../layout/RepositoryRoutes";
import { RepositoryTitle } from "src/components/title";
import { config, Env } from "../../../../ultils";
import { Button, ExternalLink } from "../../../../components";
import { Link } from "react-router-dom";
import { TelephoneIcon } from "../../../../Utils/Icons";

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
        {owner && repository && <RepositoryTitle owner={owner} repository={repository} />}
        <FundingCampaign repositoryId={repositoryId} />
        {/*<CompanyNumberBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />*/}
        <section className="pb-20 3xl:pb-40 pt-16">
          <Maintainers repositoryId={repositoryId} viewAllButton={false} />
        </section>
        <AQuestion
          title="A question?"
          subtitle={
            <>
              Need a tailored solution for your business?
              <br />
              Want to know more about DoWs and priority support?
            </>
          }
        >
          {config.env !== Env.Production && (
            <Button audience="USER" level={"SECONDARY"} size={"LARGE"} className="hover:!text-white !text-primary-user" asChild>
              <Link to="#">FAQ</Link>
            </Button>
          )}

          <Button audience="ALL" level="PRIMARY" size="LARGE" className="!capitalize" icon={<TelephoneIcon />}>
            <ExternalLink href="https://calendly.com/lauriane-m/open-source-economy" underline={false}>
              Book a Call
            </ExternalLink>
          </Button>
        </AQuestion>
        <WhyDoWeNeedYourHelp />
        <UseOfFunds />
        <WhyTrustUs />

        {/*TODO: error*/}
        {error && <div>{error.message}</div>}
      </PageWrapper>
    </>
  );
}
