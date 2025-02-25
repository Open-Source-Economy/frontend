import React, { useEffect, useState } from "react";
import { useAuth } from "../app";
import { useAvailableCredits, useCreditCounter, useFinancialIssue } from "src/views/hooks";
import { useIssueContext } from "src/views/layout/IssueRoutes";
import { Audience } from "src/views/Audience";
import { credit, CreditUnit, DropdownOption, FinancialIssue, getSubServiceOptions, Priority, ServiceType } from "src/model";
import { Header } from "src/views/layout";
import { SelectFilter } from "./SelectFilter";
import * as components from "src/views/components/issue/index";
import { Approved } from "src/views/components/issue/Approved";
import { Button, FormEntry } from "src/views/components";
import Decimal from "decimal.js";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { DecrementIcon, IncrementIcon } from "src/Utils/Icons";
const SupportCreateTicket = () => {
  const [githubUrl, setGithubUrl] = useState("");
  const [isGithubUrlValid, setIsGithubUrlValid] = useState(true);
  const { issueId } = useIssueContext();
  const { financialIssue, reloadFinancialIssue } = useFinancialIssue(issueId);
  const [subCategoryOptions, setSubCategoryOptions] = useState<DropdownOption[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const audience = Audience.DEVELOPER;
  console.log(issueId);
  console.log(audience);
  useEffect(() => {
    reloadFinancialIssue();
  }, []);
  const { counter, handleInputChange, increment, decrement } = useCreditCounter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [enoughFund, setEnoughFund] = useState<boolean>(true);
  const auth = useAuth();

  const { availableCredits, reloadAvailableCredits } = useAvailableCredits(auth);

  useEffect(() => {
    reloadAvailableCredits();
  }, []);

  console.log(audience);
  useEffect(() => {
    if (availableCredits?.amount.isZero()) setEnoughFund(false);
    else if (!counter) setEnoughFund(true);
    else setEnoughFund(credit.lessThanOrEqualTo(counter, availableCredits));
  }, [counter, availableCredits]);

  const categoryOptions = [
    { value: ServiceType.SUPPORT, label: "Support" },
    { value: ServiceType.DEVELOPMENT, label: "Development", badge: "Only On Start-Up Plan" },
    { value: ServiceType.OPERATION, label: "Operations" },
    { value: ServiceType.ADVISORY, label: "Consultancy" },
  ];
  const severityOptions = [
    { value: Priority.LOW, label: "Low" },
    { value: Priority.MEDIUM, label: "Medium" },
    { value: Priority.HIGH, label: "High" },
    { value: Priority.CRITICAL, label: "Critical" },
  ];

  // Update subcategory options when category changes
  useEffect(() => {
    if (selectedCategory) {
      // Use the helper function from service-types.ts to get subcategory options
      setSubCategoryOptions(getSubServiceOptions(selectedCategory));
    } else {
      setSubCategoryOptions([]);
    }

    // Reset subcategory when main category changes
    setSelectedSubCategory("");
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    console.log("Selected category:", value); // Debug log
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };

  const handleSeverityChange = (value: string) => {
    setSelectedSeverity(value);
  };
  const handleFormInput =
    (setter: React.Dispatch<React.SetStateAction<string>>, validator?: React.Dispatch<React.SetStateAction<boolean>>) => (value: string) => {
      setter(value);
      if (validator) {
        validator(value.trim() !== "");
      }
    };
  return (
    <div>
      <Header />
      <h2 className="main-heading text-white pt-12 sm:pt-14 md:pt-16 3xl:mt-[108px] relative pb-3 lg:!pb-5 3xl:!pb-7 w-fit mx-auto">
        Create <span className="bg-gradient-custom text-transparent bg-clip-text">support ticket</span>
        <div className="absolute sm:block hidden left-0 bottom-0 h-1 w-full bg-white"></div>
      </h2>

      <div className="lg:!p-10 3xl:!py-[42px] !p-4 !mx-4 !py-8 flex flex-col !gap-5 md:!gap-7 xl:!gap-9 3xl:!gap-12 justify-center items-center bg-primaryBg max-w-[1112px] xl:!mx-auto rounded-2xl xl:rounded-[25px] 3xl:!px-[55px] my-10 xl:my-16 3xl:my-[114px]">
        <h4 className="text-[22px] md:text-2xl xl:text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <form action="" onSubmit={e => e.preventDefault()} className="w-full flex flex-col !gap-3 xl:!gap-5 3xl:!gap-7">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
            <SelectFilter
              ariaLabel="Select Category"
              placeholder="Select Category"
              labelValues={categoryOptions}
              onFilterChange={handleCategoryChange}
              label="Category"
              isUpgraded={true}
            />

            <SelectFilter
              ariaLabel="Select Sub Category"
              placeholder="Select Sub Category"
              labelValues={subCategoryOptions}
              onFilterChange={handleSubCategoryChange}
              label="Sub category"
              isUpgraded={true}
              disabled={!selectedCategory}
            />
          </div>
          <div className="flex flex-col w-full border !border-[#FFFFFF4D] items-center !p-4 rounded-[10px]">
            {" "}
            {financialIssue && (
              <>
                <components.Repository
                  repoHeading="!text-base sm:!text-lg md:!text-xl 3xl:!text-[22px]"
                  owner={financialIssue.owner}
                  repository={financialIssue.repository}
                />{" "}
                <components.Issue issueHeading="!text-sm lg:!text-base !text-center 3xl:!text-lg" showDate={false} issue={financialIssue.issue} />
              </>
            )}
            <div className="flex justify-between gap-3 flex-col sm:flex-row items-center sm:items-end w-full sm:!mt-7">
              {" "}
              {financialIssue && (
                <div className="max-w-[450px] lg:max-w-[469px] w-full flex py-2.5 flex-col items-center">
                  {" "}
                  <components.Collect
                    audience={audience}
                    marginTop="mt-2.5"
                    creditsCollected={{ unit: CreditUnit.MINUTE, amount: new Decimal(30) }}
                    creditsRequested={{ unit: CreditUnit.MINUTE, amount: new Decimal(60) }}
                    state={financialIssue.managedIssue?.state}
                  />
                  <Approved managedIssue={financialIssue.managedIssue} manager={financialIssue.issueManager} />
                </div>
              )}
              <div className="sm:w-1/2 flex flex-col justify-center items-center !gap-3">
                {" "}
                <h2 className="text-end montserrat text-base md:text-base lg:text-[20px]">
                  Your Credits <span className="text-[#8693A4] text-[20px]">-</span>{" "}
                  <span className="text-[#FF518C] cursor-pointer hover:underline">{credit.displayAmount(availableCredits)}</span>
                </h2>
                <div className=" bg-[rgba(255,255,255,0.10)] rounded-[13px] py-[13px] xl:!px-4 3xl:!px-[18px] !px-3 w-full space-y-1 max-w-[329px]">
                  <h2 className="text-[#A1A7B0] text-base 3xl:text-[17px] font-michroma">Fund</h2>
                  <div className="flex items-end gap-3 justify-between">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={counter ? counter.amount.toNumber() : undefined}
                        placeholder="0.0"
                        onChange={handleInputChange}
                        className="border-0 outline-none text-lg font-michroma 3xl:text-xl w-full bg-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex w-4 flex-col gap-2 lg:!gap-3">
                        <button className="w-full cursor-pointer " onClick={increment}>
                          <IncrementIcon />
                        </button>
                        <button
                          className={`w-full cursor-pointer ${counter?.amount.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={decrement}
                          style={{
                            pointerEvents: counter?.amount.isZero() ? "none" : "auto",
                          }}
                        >
                          <DecrementIcon />
                        </button>
                      </div>
                      <h2
                        className="md:w-16 w-14 3xl:w-[68px] text-primary-user select-none leading-[100%] font-semibold md:text-lg capitalize 3xl:text-[20px]"
                        tabIndex={-1}
                      >
                        hour{counter?.amount.greaterThan(new Decimal(1)) && "s"}
                      </h2>
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
                onChange={handleFormInput(setGithubUrl, setIsGithubUrlValid)}
                isValid={isGithubUrlValid}
              />
            </FormEntry>
            <SelectFilter
              ariaLabel="Select Severity"
              placeholder="Select Severity"
              labelValues={severityOptions}
              onFilterChange={handleSeverityChange}
              label="Severity"
              isUpgraded={true}
            />
          </div>
          <div className="flex items-center justify-center flex-wrap !gap-3 xl:!gap-5 !mt-3 xl:!mt-5">
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
            >
              Co-found
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportCreateTicket;
