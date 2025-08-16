import React from "react";
import * as model from "@open-source-economy/api-types";
import { format } from "date-fns";
import { ExternalLink } from "src/views/components/index";

interface IssueProps {
  issue: model.Issue;
  showDate?: boolean;
  issueHeading?: string;
}

export function Issue(props: IssueProps) {
  return (
    <>
      <ExternalLink href={props.issue.htmlUrl}>
        <h6 className={`${props.issueHeading} text-base lg:text-lg xl:text-xl cursor-pointer hover:underline transition-all duration-500 ease-in-out`}>
          <span className="hover:underline cursor-pointer"> {props.showDate ? "" : `# ${props.issue.id.number}`}</span> {props.issue.title}
        </h6>
      </ExternalLink>

      {props.showDate && (
        <p className="text-[rgba(255,255,255,70%)] text-xl mt-1">
          <ExternalLink href={props.issue.htmlUrl}>
            <span className="hover:underline cursor-pointer"> #{props.issue.id.number}</span>{" "}
          </ExternalLink>

          {""}

          <span className="text-[12px]">created on {format(new Date(props.issue.createdAt), "dd MMM yyyy")}</span>
        </p>
      )}
    </>
  );
}
