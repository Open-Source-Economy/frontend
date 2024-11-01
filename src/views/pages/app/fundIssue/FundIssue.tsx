import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/components/issue";
import * as model from "src/model";
import { useParams } from "react-router-dom";
import { DowCredits, DisclaimerModal } from "./elements";
import { getBackendAPI } from "src/services/BackendAPI";
import bgimage from "src/assets/Group258.svg";

interface IssueProps {}

export function FundIssue({}: IssueProps) {
  const backendAPI = getBackendAPI();

  const { ownerParam, repoParam, numberParam } = useParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue>();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // TODO: not to re-ask GitHub when you come from a previous page
    (async () => {
      if (ownerParam && repoParam && number) {
        try {
          const financialIssue = await backendAPI.getFinancialIssue(ownerParam, repoParam, number);
          setFinancialIssue(financialIssue);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        {/*TODO: clean */}
        <div
          className="mt-20 py-5 px-3"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundPosition: "top",
            backgroundPositionY: "-310px",
            backgroundSize: "1200px",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/*TODO: factorize the title with other page title*/}
          <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">
            Fund an <span className="text-[#FF7E4B]">Issue</span>
          </h1>

          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <div className="xl:w-[600px] md:w-[590px] w-full">
              {financialIssue && <IssueCard financialIssue={financialIssue} displayActionButtons={false} displaySeeMore={true} />}
            </div>

            <div className="bg-[#14233A] rounded-3xl padding md:py-12 md:px-5 md:w-[590px] xl:w-[595px] w-full">
              <DowCredits onCreditsSuccess={() => setModal(true)} />
            </div>

            {modal && <DisclaimerModal show={modal} setShow={setModal} />}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
