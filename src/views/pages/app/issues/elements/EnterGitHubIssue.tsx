import React, { useState } from "react";

interface EnterGitHubIssueProps {}

export function EnterGitHubIssue({}: EnterGitHubIssueProps) {
  const [url, setUrl] = React.useState<string | undefined>(undefined);

  const [isValidUrl, setIsValidUrl] = useState(true);

  const goToIssuePage = () => {
    function extractGitHubIssueInfo(url: string) {
      const urlRegex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/;
      const match = url.match(urlRegex);
      if (match) {
        const [, owner, repo, number] = match;
        return { owner, repo, number };
      } else {
        return null;
      }
    }
    if (url) {
      const issueInfo = extractGitHubIssueInfo(url);
      if (issueInfo) {
        setIsValidUrl(true);
        const { owner, repo, number } = issueInfo;
        // You can use owner, repo, and number here as needed
        window.location.href = `/${owner}/${repo}/issues/${number}`;
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
    <section className="banner__home">
      <div className="container mt-5 pt-lg-5 pt-3">
        <h1 className="text-center text-white">
          Fund an <span className="text__primary">Issue</span>
        </h1>
        <div className="d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse mb-5 gap-lg-0 gap-3 mt-5">
          <div className="git justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse">
            <h3 className="text-white">Fund a GitHub issue</h3>
            <p className=" helvetica color-70">Enter a GitHub issue link.</p>
            <div className="c-input d-flex gap-3  flex-lg-nowrap  flex-wrap justify-content-lg-center align-items-center justify-content-end">
              <input
                type="text"
                value={url || ""}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`form-control helvetica ${isValidUrl ? "" : "is-invalid"}`}
                placeholder="https://github.com/scala-native/scala-native/issues/3851"
              />
              <button type="button" className="connect__btn helvetica fw-500" onClick={goToIssuePage} onKeyDown={handleKeyDown}>
                Submit
              </button>
            </div>
            {!isValidUrl && <p className="text-danger">Enter a URL from a GitHub issues page.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
