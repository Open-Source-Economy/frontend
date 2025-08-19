import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/views/components/elements/Button";
import { IssueId, OwnerId, RepositoryId } from "@open-source-economy/api-types";
import { Audience } from "src/views";
import { paths } from "src/paths";

interface EnterGitHubIssueProps {
  audience: Audience;
}

export function EnterGitHubIssue(props: EnterGitHubIssueProps) {
  const navigate = useNavigate();

  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const [isValidUrl, setIsValidUrl] = useState(true);

  // TODO: sam extract this function to a utils file to extract GitHub info from URLs
  function extractGitHubIssueInfo(url: string): IssueId | null {
    const urlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/;
    const match = url.match(urlRegex);
    if (match) {
      const [, owner, repo, n] = match;
      const number = parseInt(n);
      if (!owner || !repo || !number) {
        return null;
      } else if (isNaN(number)) {
        return null;
      } else {
        return new IssueId(new RepositoryId(new OwnerId(owner), repo), number);
      }
    } else {
      return null;
    }
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (url) {
      const issueId = extractGitHubIssueInfo(url);
      if (issueId) {
        setIsValidUrl(true);
        if (props.audience === Audience.DEVELOPER) navigate(paths.manageIssue(issueId));
        else if (props.audience === Audience.USER) navigate(paths.fundIssue(issueId));
      } else {
        setIsValidUrl(false);
      }
    } else {
      setIsValidUrl(false);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="padding mx-auto mt-8 flex flex-col items-start justify-start rounded-3xl bg-[#14233A] p-6 md:p-10 md:w-[90%]">
        {" "}
        <h2 className="font-medium text-white sm:text-xl md:text-2xl">
          {props.audience === Audience.DEVELOPER && "Request funding for a GitHub issue"}
          {props.audience === Audience.USER && "Fund a GitHub issue"}
        </h2>
        <p className="mt-1 text-base text-[rgba(255,255,255,70%)]">Enter a GitHub issue link</p>
        {/*TODO: it is not a form, it is a link to an other page*/}
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col flex-lg-row w-100 ${!isValidUrl ? "1000:items-start  items-center" : "items-center"}  gap-4 mt-4`}
        >
          <div className="flex w-full flex-col">
            <input
              value={url || ""}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`py-[20px] px-3 w-[100%] sm:w-[100%] lg:w-[100%] text-lg outline-none bg-[rgba(255,255,255,10%)] rounded-[10px] border-2 ${
                !isValidUrl ? " border-red-500" : "border-transparent"
              }`}
              placeholder="https://github.com/apache/pekko/issues/578"
            />
            {!isValidUrl && <p className="mt-2 text-base text-red-500">Enter a URL from a GitHub issues page.</p>}{" "}
          </div>
          <Button
            type="submit"
            onKeyDown={handleKeyDown}
            className="!w-full"
            audience={props.audience}
            level={"SECONDARY"}
            size="MEDIUM"
            parentClassName={`w-max max-w-[214px] ${!isValidUrl ? " 1000:mt-2" : ""}`}
          >
            {props.audience === Audience.DEVELOPER && "Request"}
            {props.audience === Audience.USER && "Fund"}
          </Button>
        </form>
      </div>
    </>
  );
}
