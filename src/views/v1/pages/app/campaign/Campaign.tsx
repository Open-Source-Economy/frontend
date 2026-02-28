import React, { useMemo } from "react";

import { PageWrapper } from "../../PageWrapper";
import { AQuestion, FundingCampaign, UseOfFunds, WhyDoWeNeedYourHelp } from "./elements";
import { WhyTrustUs } from "./elements/WhyTrustUs";
import { Maintainers } from "../project/elements/Maintainers";
import { ProjectTitle } from "src/views/v1/components/title";
import { config, Env } from "src/utils";
import { Button } from "src/views/v1/components";
import { useProjectContext } from "../../../layout/ProjectRoute";
import { BookACallButton } from "../../../components/elements/BookACallButton";
import { Sponsor } from "./elements/sponsor/Sponsor";
import { projectHooks } from "src/api";
import { getCampaignDescription } from "src/services/data";
import { getOwnerFromProjectId, getRepoFromProjectId } from "src/utils/local-types";

interface CampaignProps {}

export function Campaign(_props: CampaignProps) {
  const { projectId } = useProjectContext();

  const projectParams = {
    owner: getOwnerFromProjectId(projectId),
    repo: getRepoFromProjectId(projectId),
  };

  const { data: projectResponse, error } = projectHooks.useProjectQuery(projectParams, {});
  const project = projectResponse?.project ?? null;

  const { data: campaignResponse, error: loadCampaignError } = projectHooks.useCampaignQuery(projectParams, {});
  const campaignDescription = useMemo(() => getCampaignDescription(projectId), [projectId]);
  const campaign = campaignResponse ? { ...campaignResponse, ...campaignDescription } : null;

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
              <Button
                audience="USER"
                level={"SECONDARY"}
                size={"LARGE"}
                className="hover:!text-white !text-primary-user"
                asChild
              >
                <a href="#">FAQ</a>
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
