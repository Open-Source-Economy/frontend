import React from "react";
import * as model from "../../model";
import * as components from "./index";
import person from "src/assets/personicon.png";
import { Approved } from "src/components/issue/Approved";
import { Action } from "src/components/issue/Action";

interface IssueProps {
  financialIssue: model.FinancialIssue;
  displaySeeMore: boolean;
  displayActionButtons: boolean;
}

export function IssueCard(props: IssueProps) {
  return (
    <>
      <div className={`pt-5 w-[90%] mx-auto ${props.financialIssue.isClosed() ? "opacity-40" : ""} `}>
        <div className="padding sm:py-9 sm:px-10   flex items-center justify-between bg-[#0A1930] rounded-tl-3xl rounded-tr-3xl ">
          <components.Repository owner={props.financialIssue.owner} repo={props.financialIssue.repository} />

          <div>
            <img className="w-[52px] h-[52px]" src={person} alt="" />
          </div>
        </div>

        <div className="padding sm:py-7 sm:px-10   bg-[#14233A] rounded-bl-3xl rounded-br-3xl  ">
          <components.Issue issue={props.financialIssue.issue} />

          <div className="flex flex-wrap items-center gap-3 justify-between mt-12">
            <div>
              <components.Collect
                amountCollected={props.financialIssue.amountCollected()}
                amountRequested={props.financialIssue.amountRequested()}
                state={props.financialIssue.managedIssue?.state}
              />
              <Approved managedIssue={props.financialIssue.managedIssue} />
            </div>

            <div className="mar text-nowrap  md:ms-0 md:me-0  flex flex-col  justify-center  gap-2 mt-3 mt-md-0 ">
              <Action
                issue={props.financialIssue.issue}
                state={props.financialIssue.managedIssue?.state}
                successfullyFunded={props.financialIssue.successfullyFunded()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
