import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { IssueCard } from "../../../components/issue";
import * as model from "../../../model";
import { useParams } from "react-router-dom";
import { ConnectionContextState, useConnection } from "@solana/wallet-adapter-react";
import { getIssue, getRepository } from "../../../services";
import USDC from "../../../assets/images/usd-logo.png";
import { CryptoPayment, DisclaimerModal, FiatPayment, RegisterModal } from "./elements";
import { Tab, TabPanel } from "../../../components";

interface IssueProps {}

export function Issue({}: IssueProps) {
  const { owner, repo, number } = useParams();
  const numberSafe = number && !isNaN(Number(number)) ? Number(number) : undefined;

  const { connection }: ConnectionContextState = useConnection();

  const [repository, setRepository] = useState<model.Repository>();
  const [issue, setIssue] = useState<model.Issue>();
  const [issueStatus, setIssueStatus] = useState<model.IssueStatus>();

  useEffect(() => {
    // TODO: not to re-ask GitHub when you come from a previous page
    (async () => {
      if (owner && repo && numberSafe) {
        // TODO: Call probably no needed if coming from a page when it was already loaded
        const repository: model.Repository | undefined = await getRepository(owner, repo).catch(error => {
          console.log(error);
          return undefined;
        });

        // TODO: Call probably no needed if coming from a page when it was already loaded
        const issue: model.Issue | undefined = await getIssue(owner, repo, numberSafe).catch(error => {
          console.log(error);
          return undefined;
        });

        if (repository && issue) {
          setRepository(repository);
          setIssue(issue);

          const amountCollected = 30; // TODO: get from backend

          if (issue.closedAt) {
            setIssueStatus(new model.Closed(amountCollected));
          } else {
            setIssueStatus(new model.CollectToBeApproved(amountCollected));
          }
        }
      }
    })();
  }, []);

  // ------- crypto payment
  const [userBalance, setUserBalances] = useState<number>(0);
  const tokenLogo = USDC;
  const tokenCode = "USDC";

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
                {repository && issue && issueStatus && (
                  <IssueCard repo={repository} issue={issue} issueStatus={issueStatus} displayActionButtons={false} displaySeeMore={true} />
                )}
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
                {activeTab === Tab.Two && <CryptoPayment userBalance={userBalance} tokenLogo={tokenLogo} tokenCode={tokenCode} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
