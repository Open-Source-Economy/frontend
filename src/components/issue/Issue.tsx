import React from "react";
import * as model from "src/model";
import { format } from "date-fns";
import { ExternalLink } from "src/components";

interface IssueProps {
  issue: model.Issue;
}

export function Issue(props: IssueProps) {
  return (
    <>
      <ExternalLink href={props.issue.htmlUrl}>
        <h6 className="text-xl cursor-pointer hover:underline transition-all duration-500 ease-in-out">{props.issue.title}</h6>
      </ExternalLink>

      <p className="text-[rgba(255,255,255,70%)] text-xl mt-1">
        <ExternalLink href={props.issue.htmlUrl}>
          <span className="hover:underline cursor-pointer"> #{props.issue.id.number}</span>{" "}
        </ExternalLink>

        {""}

        <span className="text-[12px]">created on {format(new Date(props.issue.createdAt), "dd MMM yyyy")}</span>
      </p>
    </>
  );
}
