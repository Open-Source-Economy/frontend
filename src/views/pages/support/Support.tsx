import { PhoneIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, FormEntry } from "src/views/components";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";
import IsUpgraded from "./IsUpgraded";
import * as components from "src/views/components/issue/index";
import { SelectFilter } from "./SelectFilter";
import { Audience } from "src/views/Audience";
import { credit, FinancialIssue } from "src/model";
import { useIssueContext } from "src/views/layout/IssueRoutes";
import { useAvailableCredits, useCreditCounter, useFinancialIssue } from "src/views/hooks";
// import { FundIssueBody, FundIssueParams, FundIssueQuery } from "src/dtos";
import { ApiError } from "src/ultils/error/ApiError";
import { useAuth } from "../app";
import Decimal from "decimal.js";
import { Approved } from "src/views/components/issue/Approved";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isGithubUrlValid, setIsGithubUrlValid] = useState(true);
  const { issueId } = useIssueContext();
  const { financialIssue, loadFinancialIssueError, reloadFinancialIssue } = useFinancialIssue(issueId);
  const audience = Audience.USER;
  console.log(issueId);
  console.log(audience);
  useEffect(() => {
    reloadFinancialIssue();
  }, []);
  const { counter, handleInputChange, increment, decrement } = useCreditCounter();
  const [enoughFund, setEnoughFund] = useState<boolean>(true);
  const auth = useAuth();
  const [error, setError] = useState<ApiError | string | null>(null);

  const { availableCredits, loadAvailableCreditsError, reloadAvailableCredits } = useAvailableCredits(auth);

  useEffect(() => {
    reloadAvailableCredits();
  }, []);

  useEffect(() => {
    if (availableCredits?.amount.isZero()) setEnoughFund(false);
    else if (!counter) setEnoughFund(true);
    else setEnoughFund(credit.lessThanOrEqualTo(counter, availableCredits));
  }, [counter, availableCredits]);

  const categoryOptions = [
    { value: "support", label: "Support" },
    { value: "development", label: "Development", badge: "Only On Start-Up Plan" },
    { value: "operations", label: "Operations" },
    { value: "consultancy", label: "Consultancy" },
  ];

  const subCategoryOptions = [
    { value: "bugfix", label: "Bug fix" },
    { value: "newfeature", label: "new feature", badge: "Only On Start-Up Plan" },
    { value: "maintenance", label: "maintenance" },
  ];

  const projectOptions = [
    { value: "apache", label: "Apache/Pekko" },
    { value: "slick", label: "Slick" },
    { value: "other", label: "Other" },
  ];

  const severityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleInputChange1 =
    (setter: React.Dispatch<React.SetStateAction<string>>, validator?: React.Dispatch<React.SetStateAction<boolean>>) => (value: string) => {
      setter(value);
      if (validator) {
        validator(value.trim() !== "");
      }
    };

  const handleSubmit = () => {
    setIsSubjectValid(subject.trim() !== "");
    setIsGithubUrlValid(githubUrl.trim() !== "");

    if (subject.trim() && githubUrl.trim()) {
    }
  };

  return (
    <div>
      <Header />
      <h2 className="main-heading text-primary-user pt-16">Support</h2>
      <div className="lg:!p-10 !p-4 !mx-4 !py-8 flex flex-col !gap-5 md:!gap-7 justify-center items-center bg-primaryBg max-w-[1112px] xl:!mx-auto rounded-2xl xl:rounded-[25px] my-10 xl:my-16">
        <h4 className="text-[22px] md:text-2xl xl:text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Category"
            placeholder="Select Category"
            labelValues={categoryOptions}
            onFilterChange={setSelectedCategory}
            label="Category"
            isUpgraded={true}
            tooltip="lorem ipsum We'll proactively monitor and maintain your critical open-source ponents for two hours each month,"
          />

          <SelectFilter
            ariaLabel="Select Sub Category"
            placeholder="Select Sub Category"
            labelValues={subCategoryOptions}
            onFilterChange={setSelectedCategory}
            label="Sub category"
            isUpgraded={true}
          />
        </div>

        <FormEntry label="Subject">
          <BaseInput
            type="text"
            placeholder="Enter Title"
            value={subject}
            onChange={handleInputChange1(setSubject, setIsSubjectValid)}
            isValid={isSubjectValid}
          />
        </FormEntry>
        <FormEntry label="GitHub discussion or issue url (optional)">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={handleInputChange1(setGithubUrl, setIsGithubUrlValid)}
            isValid={isGithubUrlValid}
          />
        </FormEntry>

        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Project"
            placeholder="Select Project"
            labelValues={projectOptions}
            onFilterChange={setSelectedCategory}
            label="Project"
          />
          <SelectFilter
            ariaLabel="Select Severity"
            placeholder="Select Severity"
            labelValues={severityOptions}
            onFilterChange={setSelectedCategory}
            label="Severity"
            isUpgraded={true}
          />
        </div>
        <FormEntry subLabel="We will do our best to find a maintainer for you" label="GitHub url">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={handleInputChange1(setGithubUrl, setIsGithubUrlValid)}
            isValid={isGithubUrlValid}
          />
        </FormEntry>
        <div className="w-full flex flex-col gap-3 justify-center items-center">
          {" "}
          <FormEntry label="Problem Description">
            <textarea
              className="w-full min-h-[201px] resize-none outline-none montserrat rounded-xl bg-transparent !bg-[#202F45] text-sm md:text-base xl:text-lg text-[#8693A4] p-3 md:!p-4 h-[100px]"
              cols={5}
              placeholder="Please Provide a detailed description of the problem"
            ></textarea>
          </FormEntry>
          <div className="mx-auto max-w-[557px] w-full">
            <div className="flex justify-between items-center h-full !max-h-[49px] w-full py-3 rounded-[10px] border px-[18px] !border-[rgba(255,255,255,0.30)]">
              <div className="flex items-center gap-1.5">
                {" "}
                <PhoneIcon width={17} stroke="#FF518C" />
                <span className="text-sm sm:text-base text-white">Request online meeting</span>
              </div>

              <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
            </div>
            <IsUpgraded position="!mt-2.5" />
          </div>
        </div>
        <FileUpload />

        <div className="flex items-center justify-center flex-wrap !gap-5 xl:mt-4">
          <Button
            audience="USER"
            level="SECONDARY"
            size="MEDIUM"
            parentClassName="w-full sm:w-fit"
            className="!capitalize w-full !font-semibold !text-base !font-montserrat"
          >
            Save for later
          </Button>
          <Button
            parentClassName="w-full sm:w-fit"
            audience="USER"
            level="PRIMARY"
            size="MEDIUM"
            className="!capitalize w-full !font-semibold !text-base !font-montserrat"
            onClick={handleSubmit}
          >
            Submit Support ticket
          </Button>
        </div>
      </div>

      <div className="lg:!p-10 !p-4 !mx-4 !py-8 flex flex-col !gap-5 md:!gap-7 justify-center items-center bg-primaryBg max-w-[1112px] xl:!mx-auto rounded-2xl xl:rounded-[25px] my-10 xl:my-16">
        <h4 className="text-[22px] md:text-2xl xl:text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Category"
            placeholder="Select Category"
            labelValues={categoryOptions}
            onFilterChange={setSelectedCategory}
            label="Category"
            isUpgraded={true}
            tooltip="lorem ipsum We'll proactively monitor and maintain your critical open-source ponents for two hours each month,"
          />

          <SelectFilter
            ariaLabel="Select Sub Category"
            placeholder="Select Sub Category"
            labelValues={subCategoryOptions}
            onFilterChange={setSelectedCategory}
            label="Sub category"
            isUpgraded={true}
          />
        </div>
        <div className="flex flex-col w-full border !border-[#FFFFFF4D] items-center !p-4 rounded-[10px]">
          {" "}
          {financialIssue && (
            <>
              <components.Repository owner={financialIssue.owner} repository={financialIssue.repository} /> <components.Issue issue={financialIssue.issue} />
            </>
          )}
          <div className="flex justify-between  items-center w-full">
            {" "}
            {financialIssue && (
              <div className="w-[50%] flex flex-col items-center">
                {" "}
                <components.Collect
                  audience={audience}
                  creditsCollected={FinancialIssue.amountCollected(financialIssue)}
                  creditsRequested={FinancialIssue.amountRequested(financialIssue)}
                  state={financialIssue.managedIssue?.state}
                />
                <Approved managedIssue={financialIssue.managedIssue} manager={financialIssue.issueManager} />
              </div>
            )}
            <div className="w-1/2 flex flex-col justify-center items-center !gap-3">
              {" "}
              <h2 className="text-end montserrat text-base md:text-base lg:text-[20px]">
                Your Credits <span className="text-[#8693A4] text-[20px]">-</span>{" "}
                <span className="text-[#FF518C] cursor-pointer hover:underline">{credit.displayAmount(availableCredits)}</span>
              </h2>
              <div className=" bg-[rgba(255,255,255,10%)] rounded-[10px] py-[15px] px-3 w-full max-w-[329px]">
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex-1">
                    <h2 className="text-[#A1A7B0] text-lg">Fund</h2>

                    {/*TODO: this part could be refactored with CounterInput*/}

                    <input
                      type="number"
                      value={counter ? counter.amount.toNumber() : undefined}
                      placeholder="0.0"
                      onChange={handleInputChange}
                      className="border-0 outline-none md:text-[33px] text-[20px] w-full bg-transparent"
                    />
                  </div>
                  <div
                    className="
                  flex items-center mt-4"
                  >
                    <div className="d-flex w-10 lg:w-14 flex-col gap-2 lg:!gap-4">
                      <button className="w-full cursor-pointer " onClick={increment}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:min-w-[22px] lg:w-full sm:max-w-7 md:h-[18px] max-w-5"
                          width="100%"
                          height="100%"
                          viewBox="0 0 27 18"
                          fill="none"
                        >
                          <path
                            d="M1.86396 17.3359C0.278298 17.3359 -0.549899 15.2506 0.406713 13.9035L0.548157 13.7258L11.7148 1.03638C12.0353 0.672247 12.4617 0.453503 12.914 0.421185C13.3663 0.388867 13.8134 0.545195 14.1715 0.860847L14.3464 1.03638L25.5131 13.7258L25.6676 13.9246L25.7681 14.0874L25.8686 14.2905L25.9002 14.3666L25.9505 14.5083L26.01 14.7367L26.0286 14.8488L26.0472 14.9757L26.0547 15.0963V15.3458L26.0454 15.4685L26.0286 15.5954L26.01 15.7053L25.9505 15.9338L25.9002 16.0755L25.7699 16.3546L25.649 16.545L25.5131 16.7163L25.3382 16.8918L25.1949 17.006L25.0162 17.1202L24.9492 17.1562L24.8245 17.2133L24.6235 17.2809L24.5249 17.3021L24.4132 17.3232L24.3071 17.3317L1.86396 17.3359Z"
                            fill="white"
                            fill-opacity="0.6"
                          />
                        </svg>
                      </button>
                      <button
                        className={`w-full cursor-pointer ${counter?.amount.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={decrement}
                        style={{
                          pointerEvents: counter?.amount.isZero() ? "none" : "auto",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          className="md:min-w-[22px] lg:w-full sm:max-w-7 max-w-5 md:h-[18px]"
                          height="100%"
                          viewBox="0 0 27 17"
                          fill="none"
                        >
                          <path
                            d="M24.1971 0.0258789C25.7827 0.0258789 26.6109 2.11117 25.6543 3.45837L25.5129 3.63602L14.3462 16.3254C14.0257 16.6896 13.5994 16.9083 13.1471 16.9406C12.6948 16.9729 12.2476 16.8166 11.8895 16.501L11.7146 16.3254L0.547932 3.63602L0.393459 3.43722L0.292959 3.27437L0.192459 3.07134L0.16082 2.9952L0.11057 2.8535L0.0510146 2.62509L0.0324031 2.513L0.0137924 2.38611L0.00634766 2.26556V2.016L0.0156534 1.89334L0.0324031 1.76644L0.0510146 1.65647L0.11057 1.42806L0.16082 1.28636L0.291098 1.00719L0.41207 0.816851L0.547932 0.645546L0.722876 0.470008L0.866182 0.355804L1.04485 0.241599L1.11185 0.205646L1.23654 0.148542L1.43754 0.0808664L1.53618 0.0597169L1.64785 0.0385674L1.75393 0.0301084L24.1971 0.0258789Z"
                            fill="white"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </button>
                    </div>
                    <h2 className="gradient-texts select-none w-fit leading-[100%] font-bold md:text-[33px] text-[20px]" tabIndex={-1}>
                      hour{counter?.amount.greaterThan(new Decimal(1)) && "s"}
                    </h2>
                    <style>{`
                            .gradient-texts {
                              background: linear-gradient(90deg, #ff7e4b, #ff518c);
                              -webkit-background-clip: text;
                              -webkit-text-fill-color: transparent;
                              userSelect: "none !important"
                            }
                          `}</style>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <FormEntry label="GitHub discussion or issue url (optional)">
            <BaseInput
              type="text"
              placeholder="https://github.com/scala-native/scala-native/issues/3701"
              value={githubUrl}
              onChange={handleInputChange1(setGithubUrl, setIsGithubUrlValid)}
              isValid={isGithubUrlValid}
            />
          </FormEntry>
          <SelectFilter
            ariaLabel="Select Severity"
            placeholder="Select Severity"
            labelValues={severityOptions}
            onFilterChange={setSelectedCategory}
            label="Severity"
            isUpgraded={true}
          />
        </div>

        <div className="flex items-center justify-center flex-wrap !gap-5 xl:mt-4">
          <Button
            audience="USER"
            level="PRIMARY"
            size="MEDIUM"
            parentClassName="w-full sm:w-fit"
            className="!capitalize w-full !font-semibold !text-base !font-montserrat"
          >
            Ugrade your plane
          </Button>
          <Button
            parentClassName="w-full sm:w-fit"
            audience="USER"
            level="PRIMARY"
            size="MEDIUM"
            className="!capitalize w-full !font-semibold !text-base !font-montserrat"
            onClick={handleSubmit}
          >
            Co-found
          </Button>
        </div>
      </div>
    </div>
  );
}
