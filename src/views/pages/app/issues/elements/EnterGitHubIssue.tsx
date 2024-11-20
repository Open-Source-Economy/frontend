import React, { useState } from "react";
import { fundIssuePath } from "src/App";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/elements/Button";

interface EnterGitHubIssueProps {}

export function EnterGitHubIssue({}: EnterGitHubIssueProps) {
  const navigate = useNavigate();

  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const [isValidUrl, setIsValidUrl] = useState(true);

  function extractGitHubIssueInfo(url: string) {
    const urlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/;
    const match = url.match(urlRegex);
    if (match) {
      const [, owner, repo, number] = match;
      if (!owner || !repo || !number) {
        return null;
      } else if (isNaN(parseInt(number))) {
        return null;
      } else {
        return { owner, repo, number };
      }
    } else {
      return null;
    }
  }

  const goToIssuePage = () => {
    if (url) {
      const issueInfo = extractGitHubIssueInfo(url);
      if (issueInfo) {
        setIsValidUrl(true);
        const { owner, repo, number } = issueInfo;
        // You can use owner, repo, and number here as needed
        navigate(fundIssuePath(owner, repo, parseInt(number)));
      } else {
        setIsValidUrl(false);
      }
    } else {
      setIsValidUrl(false);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      goToIssuePage();
    }
  };

  return (
    <>
      <div className="padding mx-auto mt-8 flex w-[90%] flex-col items-start justify-start rounded-3xl bg-[#14233A] sm:px-5 sm:py-7 md:px-10 md:py-10">
        {" "}
        <h2 className="font-medium text-white sm:text-xl md:text-2xl">Request funding for a GitHub issue</h2>
        <p className="mt-1 text-base text-[rgba(255,255,255,70%)]">Enter a GitHub issue link</p>
        {/*TODO: it is not a form, it is a link to an other page*/}
        <form className={`flex flex-col flex-lg-row w-100 ${!isValidUrl ? "items-start" : "items-center"}  gap-4 mt-4`}>
          <div className="flex w-full flex-col">
            {" "}
            {/* Added w-full for consistent width */}
            <input
              type="url"
              value={url || ""}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`py-[20px] px-3 w-[100%] sm:w-[100%] lg:w-[100%] text-lg outline-none bg-[rgba(255,255,255,10%)] rounded-[10px] ${
                !isValidUrl ? "border-2 border-red-500" : "border-0"
              }`} // Changed border-1 to border-2 for proper styling
              placeholder="https://github.com/scala-native/scala-native/issues/3851"
            />
            {!isValidUrl && <p className="mt-2 text-base text-red-500">Enter a URL from a GitHub issues page.</p>}{" "}
          </div>
          {/* <button
            type="submit"
            className="border-1 mx-auto flex items-center justify-center rounded-md border-[#FF7E4B] px-[45px] py-[20px] transition-all duration-500 ease-in-out hover:border-0 hover:bg-[#FF7E4B]"
            onClick={goToIssuePage}
            onKeyDown={handleKeyDown}
          >
            Add
          </button> */}
          <Button variant="SECONDARY_DEVELOPER" size="MEDIUM" asChild className="w-20" parentClassName="w-max max-w-[214px]">
            <Link to="/developer">
              <span className="relative z-20">Add</span>
            </Link>
          </Button>
          {/* <Button variant={"SECONDARY_DEVELOPER"} size="MEDIUM" asChild>
            <Link to="#">
              <span className="relative z-20">Add</span>
            </Link>
          </Button> */}
        </form>
      </div>
    </>
  );
}
