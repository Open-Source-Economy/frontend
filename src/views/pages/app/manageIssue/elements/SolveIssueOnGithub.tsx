import React from "react";
import * as model from "src/model";
import { ButtonType, ExternalLinkButton } from "src/components";
import cat from "src/assets/catimg.png";
import { Audience } from "src/views";

interface SolveIssueOnGithubProps {
  issue: model.Issue;
}

export function SolveIssueOnGithub(props: SolveIssueOnGithubProps) {
  return (
    <>
      <div className="padding sm:py-10 sm:pe-10 sm:px-24  text-center md:justify-between justify-center flex flex-wrap items-start  xl:w-[670px] md:w-[590px] w-full bg-[#14233A] mt-4 rounded-3xl">
        <div className="flex flex-col gap-5">
          <h1 className="text-[18px]">The community is here!</h1>
          <h2 className="text-[18px] montserrat">
            They support you! <br /> It is now time to solve the issue!
          </h2>
          <ExternalLinkButton
            href={props.issue.htmlUrl}
            buttonProps={{
              htmlButtonProps: { children: "Solve the issue on GitHub" },
              type: ButtonType.SECONDARY,
              audience: Audience.DEVELOPER,
            }}
          />

          {/*<button className="border-1 border-[#FF518C] rounded-md p-3 text-[13px] hover:bg-[#FF518C] transition-all duration-500">*/}
          {/*    Solve the issue on GitHub*/}
          {/*</button>*/}
        </div>
        <div className="">
          <img src={cat} className="w-[160px] h-[210px] mt-3 mt-md-0" alt="" />
        </div>
      </div>
    </>
  );
}
