import React from "react";
import * as model from "src/model";
import { FinancialIssue } from "src/model";
import * as components from "./index";
import { Approved } from "src/views/components/issue/Approved";
import { Action } from "src/views/components/issue/Action";
import { Audience } from "src/views/index";

interface IssueProps {
  financialIssue: model.FinancialIssue;
  audience: Audience;
  displaySeeMore?: boolean;
  displayActionButtons?: boolean;
  displayPrivatePublicToggle?: boolean;
}

export function IssueCard(props: IssueProps) {
  return (
    <>
      <div className={`mx-auto ${FinancialIssue.isClosed(props.financialIssue) ? "opacity-40" : ""} `}>
        <div className="padding sm:!py-8 sm:!px-10 !p-4  flex items-center justify-between bg-[#0A1930] rounded-tl-3xl rounded-tr-3xl ">
          <components.Repository owner={props.financialIssue.owner} repository={props.financialIssue.repository} />

          {/*<div>*/}
          {/*  <img className="w-[52px] h-[52px]" src={person} alt="" />*/}
          {/*</div>*/}
        </div>

        <div className="padding sm:!py-7 !py-5 !px-4 sm:!px-10 bg-[#14233A] rounded-bl-3xl rounded-br-3xl  ">
          <components.Issue showDate={true} issue={props.financialIssue.issue} />

          <div className="flex flex-wrap items-center  gap-10 xl:gap-3 justify-between mt-7 lg:!mt-12">
            <div>
              <components.Collect
                marginTop="mt-3"
                audience={props.audience}
                creditsCollected={FinancialIssue.amountCollected(props.financialIssue)}
                creditsRequested={FinancialIssue.amountRequested(props.financialIssue)}
                state={props.financialIssue.managedIssue?.state}
              />
              <Approved managedIssue={props.financialIssue.managedIssue} manager={props.financialIssue.issueManager} />
            </div>

            {/*TODO*/}
            {/*{props.displayPrivatePublicToggle && (*/}
            {/*  <div>*/}
            {/*    <div className="flex items-center gap-3">*/}
            {/*      <PrivatePublicToggled />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}

            {props.displayActionButtons && (
              <div className="text-nowrap md:ms-0 md:me-0 flex w-full sm:w-fit flex-col justify-center gap-2 mt-md-0 ">
                <Action
                  issue={props.financialIssue.issue}
                  audience={props.audience}
                  state={props.financialIssue.managedIssue?.state}
                  successfullyFunded={FinancialIssue.successfullyFunded(props.financialIssue)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
