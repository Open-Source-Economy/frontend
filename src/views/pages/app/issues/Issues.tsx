import React, { useEffect, useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";
import * as model from "src/api/model";
import { financialIssueUtils } from "src/api/model";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/views/components/issue";
import { getBackendAPI } from "src/services";
import { Background } from "src/views/pages/app/issues/elements/Background";
import { GetIssueQuery, GetIssuesParams } from "src/api/dto";
import { ApiError } from "src/ultils/error/ApiError";
import { Audience, textColorVariants } from "src/views";

import { useAuth } from "src/views/pages/authenticate/AuthContext";
import Loading from "src/views/components/common/Loading";

import catimg from "src/assets/Mascot.png";
import { ShowApiError } from "src/views/components/common/ShowApiError";

interface IssuesProps {
  audience: Audience;
}
export function Issues(props: IssuesProps) {
  const backendAPI = getBackendAPI();
  const auth = useAuth();
  const [financialIssues, setFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [filteredFinancialIssues, setFilteredFinancialIssues] = useState<model.FinancialIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const params: GetIssuesParams = {};
        const query: GetIssueQuery = {};
        const financialIssues = await backendAPI.getAllFinancialIssues(params, query);
        if (financialIssues instanceof ApiError) setError(financialIssues);
        else {
          setFinancialIssues(financialIssues);
          setFilteredFinancialIssues(financialIssues);
        }
      } catch (error) {
        setError(ApiError.from(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <PageWrapper>
      <Background>
        <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">
          <>
            {props.audience === Audience.DEVELOPER && "Manage "}
            {props.audience === Audience.USER && "Fund "}
            <span className={`${textColorVariants[props.audience]}`}>Issues</span>
          </>
        </h1>
        <EnterGitHubIssue audience={props.audience} />
        <div className="mt-24">
          <h1 className=" lg:text-[55px] text-[32px]  text-center font-medium text-white">
            All <span className={`${textColorVariants[props.audience]}`}>Issues</span>
          </h1>
        </div>
        <section>
          <div className=" mt-5 pt-lg-1 pt-3">
            <IssueFilter financialIssues={financialIssues} setFilteredFinancialIssues={setFilteredFinancialIssues} />
            <div className="mt-5 space-y-7 md:space-y-11 lg:space-y-[60px] w-full lg:w-[90%] mx-auto">
              {isLoading ? (
                <Loading type="component" message="Loading data..." height="200px" width="200px" />
              ) : error ? (
                <div className="mt-20">
                  <ShowApiError error={error} />
                </div>
              ) : (filteredFinancialIssues || []).length > 0 ? (
                filteredFinancialIssues.map(issue => (
                  <IssueCard key={financialIssueUtils.id(issue)} financialIssue={issue} audience={props.audience} displayActionButtons={true} />
                ))
              ) : (
                <div className="flex justify-center gap-2 sm:text-2xl text-xl items-center font-medium">
                  <img src={catimg} className="size-20 sm:size-24 object-contain" alt="" />
                  No issues found!
                </div>
              )}
            </div>
          </div>
        </section>
      </Background>
    </PageWrapper>
  );
}
