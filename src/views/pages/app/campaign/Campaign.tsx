import React, { useEffect } from "react";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { ProjectTitle } from "src/views/components/title";
import { config, Env } from "../../../../ultils";
import { Button } from "src/views/components";
import { Link } from "react-router-dom";
import { useCampaign } from "../../../hooks/useCampaign";
import { useProject } from "../../../hooks/useProject";
import { useProjectContext } from "../../../layout/ProjectRoute";
import { BookACallButton } from "../../../components/elements/BookACallButton";

interface CampaignProps {}

export function Campaign(props: CampaignProps) {
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

        <Maintainers projectId={projectId} viewAllButton={false} />

        {campaign?.description?.aQuestion && (
          <AQuestion description={campaign?.description?.aQuestion}>
            {config.env !== Env.Production && (
              <Button audience="USER" level={"SECONDARY"} size={"LARGE"} className="hover:!text-white !text-primary-user" asChild>
                <Link to="#">FAQ</Link>
              </Button>
            )}
            <BookACallButton />
          </AQuestion>
        )}
        {campaign?.description?.whyWeNeedYourHelp && <WhyDoWeNeedYourHelp description={campaign?.description?.whyWeNeedYourHelp} />}
        {campaign?.description?.useOfFunds && <UseOfFunds description={campaign?.description?.useOfFunds} />}
        {campaign?.description?.whyTrustUs && <WhyTrustUs description={campaign?.description?.whyTrustUs} />}

        {/*TODO: error*/}
        {error && <div>{error.message}</div>}
        {loadCampaignError && <div>{loadCampaignError.message}</div>}
      </PageWrapper>
    </>
  );
}
