import React, { useEffect } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import bgimage from "src/assets/Group258.svg";
import bgimage2 from "src/assets/issuebg2.png";
import bgimage3 from "src/assets/issuebg3.png";
import { IssueCard } from "src/components/issue";
import { useFinancialIssue } from "src/views/hooks/useFinancialIssue";
import { SolveIssueOnGithub } from "src/views/pages/app/manageIssue/elements/SolveIssueOnGithub";
import { FinancialIssue } from "src/model";
import { ManageTab } from "src/views/pages/app/manageIssue/elements/ManageTab";
import { RejectFundingTab } from "src/views/pages/app/manageIssue/elements/RejectFundingTab";
import { AcceptFundingTab } from "src/views/pages/app/manageIssue/elements";
import { useIssueIdFromParams } from "src/views/hooks";

interface ManageIssueProps {}

export function ManageIssue(props: ManageIssueProps) {
  const issueId = useIssueIdFromParams();
  const { financialIssue, error, reloadFinancialIssue } = useFinancialIssue(issueId);

  useEffect(() => {
    reloadFinancialIssue();
  }, []);

  return (
    <PageWrapper>
      <div>
        <BackgroundSection bgImage={bgimage2} position="left 20%">
          <BackgroundSection bgImage={bgimage3} position="right 2%">
            <div className="flex items-center justify-center px-5">
              <div className="mt-20 py-5 px-3" style={getBackgroundImageStyle(bgimage)}>
                <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white md:mb-0 mb-5">
                  Fund an <span className="text-[#FF7E4B]">Issue</span>
                </h1>
                <div className="flex flex-wrap justify-center items-start gap-5 md:py-24">
                  <div>
                    {financialIssue && (
                      <div className="xl:w-[670px] md:w-[590px] w-full">
                        <IssueCard financialIssue={financialIssue} displayPrivatePublicToggle={true} />
                      </div>
                    )}

                    {financialIssue && FinancialIssue.successfullyFunded(financialIssue) && <SolveIssueOnGithub issue={financialIssue.issue} />}
                  </div>

                  <div>
                    <ManageTab tab1Title="Accept the funding" tab2Title="Reject the funding" tab1={<AcceptFundingTab />} tab2={<RejectFundingTab />} />
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
