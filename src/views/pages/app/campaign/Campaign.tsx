import React, { useEffect } from "react";

import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { ProjectTitle } from "src/views/components/title";
import { config, Env } from "src/ultils";
import { Button } from "src/views/components";
import { Link } from "react-router-dom";
import { useCampaign } from "../../../hooks/useCampaign";
import { useProject } from "../../../hooks/useProject";
import { useProjectContext } from "../../../layout/ProjectRoute";
import { BookACallButton } from "../../../components/elements/BookACallButton";
import { Sponsor } from "./elements/sponsor/Sponsor";

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
      <PageWrapper>
        {project && <ProjectTitle project={project} />}
        {campaign && <FundingCampaign projectId={projectId} campaign={campaign} />}
        {/*<CompanyNumberBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />*/}

        <Maintainers projectId={projectId} viewAllButton={false} />

        {campaign?.aQuestion && (
          <AQuestion description={campaign?.aQuestion}>
            {config.env !== Env.Production && (
              <Button audience="USER" level={"SECONDARY"} size={"LARGE"} className="hover:!text-white !text-primary-user" asChild>
                <Link to="#">FAQ</Link>
              </Button>
            )}
            <BookACallButton />
          </AQuestion>
        )}
        <Sponsor projectId={projectId} />
        {campaign?.whyWeNeedYourHelp && <WhyDoWeNeedYourHelp description={campaign?.whyWeNeedYourHelp} />}
        {campaign?.useOfFunds && <UseOfFunds description={campaign?.useOfFunds} />}
        {campaign?.whyTrustUs && <WhyTrustUs description={campaign?.whyTrustUs} />}

        {campaign?.disclaimer && (
          <div className="max-lg:px-4 flex flex-col items-center text-center text-white mb-40">
            <p>{campaign?.disclaimer}</p>
          </div>
        )}

        {/*TODO: error*/}
        {error && <div>{error.message}</div>}
        {loadCampaignError && <div>{loadCampaignError.message}</div>}
      </PageWrapper>
    </>
  );
}
