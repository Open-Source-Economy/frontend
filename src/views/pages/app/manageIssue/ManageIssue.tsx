import React, { useEffect, useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import bgimage from "src/assets/Group258.svg";
import bgimage2 from "src/assets/issuebg2.png";
import bgimage3 from "src/assets/issuebg3.png";
import { IssueCard } from "src/views/components/issue";
import { useFinancialIssue } from "src/views/hooks/useFinancialIssue";
import { SolveIssueOnGithub } from "src/views/pages/app/manageIssue/elements/SolveIssueOnGithub";
import { FinancialIssue } from "src/model";
import { ManageTab } from "src/views/pages/app/manageIssue/elements/ManageTab";
import { RejectFundingTab } from "src/views/pages/app/manageIssue/elements/RejectFundingTab";
import { AcceptFundingTab } from "src/views/pages/app/manageIssue/elements";
import { Audience } from "src/views";

import { AudienceTitle } from "src/views/components";
import { useIssueContext } from "../../../layout/IssueRoutes";
import { ShowApiError } from "../../../components/common/ShowApiError";
import { ApiError } from "src/ultils/error/ApiError";

interface ManageIssueProps {}

export function ManageIssue(props: ManageIssueProps) {
  const audience = Audience.DEVELOPER;
  const { issueId } = useIssueContext();
  const [error, setError] = useState<ApiError | null>(null);
  const { financialIssue, loadFinancialIssueError, reloadFinancialIssue } = useFinancialIssue(issueId);

  useEffect(() => {
    reloadFinancialIssue();
  }, []);

  useEffect(() => {
    if (financialIssue?.issue?.closedAt) {
      setError(new ApiError(undefined, "This issue is already closed, you can't manage a closed issue"));
    }
  }, [financialIssue]);

  return (
    <PageWrapper>
      <div>
        <BackgroundSection bgImage={bgimage2} position="left 20%">
          <BackgroundSection bgImage={bgimage3} position="right 2%">
            <div className="flex items-center justify-center w-full">
              <div className="sm:mt-20 py-5 px-4 w-full lg:w-fit" style={getBackgroundImageStyle(bgimage)}>
                <AudienceTitle audience={audience} whiteText="Manage an " coloredText="Issue" />

                {(loadFinancialIssueError || error) && (
                  <div className="xl:mt-12">
                    <ShowApiError error={(loadFinancialIssueError || error)!} />
                  </div>
                )}

                <div className="flex flex-wrap xl:!flex-nowrap justify-center w-full items-start !gap-5 xl:mt-12 max-w-[1220px] mx-auto 3xl:max-w-[1500px]">
                  <div className="md:max-w-[590px] xl:max-w-[700px] w-full xl:w-1/2">
                    {financialIssue && (
                      <div className="w-full">
                        <IssueCard financialIssue={financialIssue} audience={audience} displayPrivatePublicToggle={true} />
                      </div>
                    )}

                    {financialIssue && FinancialIssue.successfullyFunded(financialIssue) && <SolveIssueOnGithub issue={financialIssue.issue} />}
                  </div>

                  <div className="xl:w-1/2 w-full md:w-fit xl:max-w-[700px] md:max-w-[590px] ">
                    <ManageTab
                      tab1Title="Accept the funding"
                      tab2Title="Reject the funding"
                      tab1={<AcceptFundingTab reloadFinancialIssue={reloadFinancialIssue} />}
                      tab2={<RejectFundingTab />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundSection>
        </BackgroundSection>
      </div>
    </PageWrapper>
  );
}

// TODO: refactor this
const BackgroundSection = ({ bgImage, position, children }: { bgImage: string; position: string; children: React.ReactNode }) => (
  <div
    className="md:pb-60"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: position,
      backgroundSize: "60%",
      backgroundRepeat: "no-repeat",
    }}
  >
    {children}
  </div>
);

const getBackgroundImageStyle = (image: string) => ({
  backgroundImage: `url(${image})`,
  backgroundPosition: "top",
  backgroundPositionY: "-320px",
  backgroundSize: "1200px",
  backgroundRepeat: "no-repeat",
});
