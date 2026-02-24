import React, { useState } from "react";
import { EnterGitHubIssue, IssueFilter } from "./elements";
import * as model from "@open-source-economy/api-types";
import { financialIssueUtils } from "@open-source-economy/api-types";
import { PageWrapper } from "../../PageWrapper";
import { IssueCard } from "src/views/v1/components/issue";
import { Background } from "src/views/v1/pages/app/issues/elements/Background";
import { ApiError } from "src/ultils/error/ApiError";
import { Audience, textColorVariants } from "src/views/index";

import { useAuth } from "src/views/auth/AuthContext";
import Loading from "src/views/v1/components/common/Loading";

import catimg from "src/assets/v1/Mascot.png";
import { ShowApiError } from "src/views/v1/components/common/ShowApiError";
import { projectHooks } from "src/api";

interface IssuesProps {
  audience: Audience;
}
export function Issues(props: IssuesProps) {
  const _auth = useAuth();
  const { data: financialIssues, isLoading, error } = projectHooks.useAllFinancialIssuesQuery({}, {});
  const apiError = error ? (error instanceof ApiError ? error : ApiError.from(error)) : null;
  const [filteredFinancialIssues, setFilteredFinancialIssues] = useState<model.FinancialIssue[]>([]);

  // Sync filtered issues when data arrives
  React.useEffect(() => {
    if (financialIssues) {
      setFilteredFinancialIssues(financialIssues);
    }
  }, [financialIssues]);

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
            <IssueFilter
              financialIssues={financialIssues ?? []}
              setFilteredFinancialIssues={setFilteredFinancialIssues}
            />
            <div className="mt-5 space-y-7 md:space-y-11 lg:space-y-[60px] w-full lg:w-[90%] mx-auto">
              {isLoading ? (
                <Loading type="component" message="Loading data..." height="200px" width="200px" />
              ) : apiError ? (
                <div className="mt-20">
                  <ShowApiError error={apiError} />
                </div>
              ) : (filteredFinancialIssues || []).length > 0 ? (
                filteredFinancialIssues.map((issue) => (
                  <IssueCard
                    key={financialIssueUtils.id(issue)}
                    financialIssue={issue}
                    audience={props.audience}
                    displayActionButtons={true}
                  />
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
