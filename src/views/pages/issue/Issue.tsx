import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { IssueCard } from "../../../components/issue";
import * as model from "../../../model";
import { useParams } from "react-router-dom";
import { Tab, TabPanel } from "../../../components";
import { FiatPayment } from "./elements";
import { getBackendAPI } from "../../../services/BackendAPI";

interface IssueProps {}

export function Issue({}: IssueProps) {
  const backendAPI = getBackendAPI();

  const { ownerParam, repoParam, numberParam } = useParams();
  const number = numberParam && !isNaN(Number(numberParam)) ? Number(numberParam) : undefined;

  const [financialIssue, setFinancialIssue] = useState<model.FinancialIssue>();

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

  const [activeTab, setActiveTab] = useState<Tab>(Tab.One);

  return (
    <PageWrapper>
      <section>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            Fund this <span className="text__primary">Issue</span>
          </h1>

          <div className="row d-flex justify-content-center gy-5 mt-5">
            <div className="col-lg-6">
              <div className="native-card">
                {financialIssue && <IssueCard financialIssue={financialIssue} displayActionButtons={false} displaySeeMore={true} />}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="native-card">
                <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap">
                  <div className="d-flex gap-4 align-items-center">
                    <TabPanel tab={Tab.One} index={activeTab} setActiveTab={setActiveTab}>
                      Credit Card
                    </TabPanel>

                    <TabPanel tab={Tab.Two} index={activeTab} setActiveTab={setActiveTab}>
                      Crypto
                    </TabPanel>
                  </div>
                </div>

                {activeTab === Tab.One && <FiatPayment />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
