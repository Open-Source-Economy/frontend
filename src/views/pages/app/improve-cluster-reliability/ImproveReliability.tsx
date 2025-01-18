import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { ProjectTitle } from "src/components/title";
import { config, Env } from "../../../../ultils";
import { Button, ExternalLink } from "../../../../components";
import { Link } from "react-router-dom";
import { TelephoneIcon } from "../../../../Utils/Icons";
import { useCampaign } from "../../../hooks/useCampaign";
import { useProject } from "../../../hooks/useProject";
import { useProjectContext } from "../../../layout/ProjectRoute";

interface ImproveReliabilityProps {}

export function ImproveReliability(props: ImproveReliabilityProps) {
  const { projectId } = useProjectContext();
  const { project, error, reloadProject } = useProject(projectId);
  const { campaign, loadCampaignError, reloadCampaign } = useCampaign(projectId);

  useEffect(() => {
    reloadProject();
    reloadCampaign();
  }, []);

  return (
    <>
      <PageWrapper baseURL={BaseURL.APP}>
        {project && <ProjectTitle project={project} />}
        {campaign && <FundingCampaign projectId={projectId} campaign={campaign} />}
        {/*<CompanyNumberBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />*/}
        <section className="pb-20 3xl:pb-40 pt-16">
          <Maintainers projectId={projectId} viewAllButton={false} />
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
        {loadCampaignError && <div>{loadCampaignError.message}</div>}
      </PageWrapper>
    </>
  );
}
