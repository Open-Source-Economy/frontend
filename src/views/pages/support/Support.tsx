import React, { useState } from "react";
import { Button, FormEntry } from "src/views/components";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";
import { SelectFilter } from "./SelectFilter";
import IsUpgraded from "./IsUpgraded";
import { TelephoneIcon } from "src/Utils/Icons";
import { PhoneIcon } from "lucide-react";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isGithubUrlValid, setIsGithubUrlValid] = useState(true);

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

  const handleInputChange =
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
            onChange={handleInputChange(setSubject, setIsSubjectValid)}
            isValid={isSubjectValid}
          />
        </FormEntry>
        <FormEntry label="GitHub discussion or issue url (optional)">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={handleInputChange(setGithubUrl, setIsGithubUrlValid)}
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
            onChange={handleInputChange(setGithubUrl, setIsGithubUrlValid)}
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
    </div>
  );
}
