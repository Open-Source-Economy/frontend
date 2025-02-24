import React, { useState } from "react";
import { Button, FormEntry } from "src/views/components";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";
import { SelectFilter } from "./SelectFilter";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const categoryOptions = [
    { value: "support", label: "Support", isSelected: true },
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
    { value: "slick", label: "Slick", isSelected: true },
    { value: "other", label: "Other" },
  ];

  const severityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium", isSelected: true },
    { value: "high", label: "High" },
  ];

  return (
    <div>
      <Header />
      <h2 className="main-heading text-primary-user pt-16">Support</h2>
      <div className="lg:!p-10 !p-4 !mx-4 flex flex-col !gap-5 md:!gap-7 justify-center items-center bg-primaryBg max-w-[1112px] xl:!mx-auto rounded-2xl xl:rounded-[25px] my-10 xl:my-16">
        <h4 className="text-[22px] md:text-2xl xl:text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Category"
            placeholder="Select Category"
            labelValues={categoryOptions}
            onFilterChange={setSelectedCategory}
            label="Category"
            tooltip="lorem ipsum We'll proactively monitor and maintain your critical open-source ponents for two hours each month,"
          />
          <SelectFilter
            ariaLabel="Select Sub Category"
            placeholder="Select Sub Category"
            labelValues={subCategoryOptions}
            onFilterChange={setSelectedCategory}
            label="Sub category"
          />
        </div>
        {/* Public/Private Toggle */}
        {/* <FormEntry label="Visibility">
          <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
        </FormEntry> */}
        {/* Subject Input */}

        <FormEntry label="Subject">
          <BaseInput type="text" placeholder="Enter Title" value={githubUrl} onChange={setGithubUrl} isValid={true} />
        </FormEntry>
        <FormEntry label="GitHub discussion or issue url (optional)">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={setGithubUrl}
            isValid={true}
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
          />
        </div>
        <FormEntry subLabel="We will do our best to find a maintainer for you" label="GitHub url">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={setGithubUrl}
            isValid={true}
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
          <div className="flex justify-between items-center max-w-[557px] mx-auto w-full py-[19px]  rounded-[10px] border px-[18px] !border-[rgba(255,255,255,0.30)]">
            <div className="flex items-center gap-1.5">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M20.45 21.5C18.3667 21.5 16.3043 21.05 14.263 20.15C12.2217 19.25 10.3673 17.9667 8.7 16.3C7.03267 14.6333 5.74933 12.7833 4.85 10.75C3.95067 8.71667 3.50067 6.65 3.5 4.55V3.5H9.4L10.325 8.525L7.475 11.4C7.84167 12.05 8.25 12.6667 8.7 13.25C9.15 13.8333 9.63333 14.375 10.15 14.875C10.6333 15.3583 11.1627 15.821 11.738 16.263C12.3133 16.705 12.934 17.1173 13.6 17.5L16.5 14.6L21.5 15.625V21.5H20.45ZM6.525 9.5L8.175 7.85L7.75 5.5H5.525C5.60833 6.25 5.73333 6.95433 5.9 7.613C6.06667 8.27167 6.275 8.90067 6.525 9.5ZM15.475 18.45C16.1417 18.7333 16.8127 18.9583 17.488 19.125C18.1633 19.2917 18.834 19.4 19.5 19.45V17.25L17.15 16.775L15.475 18.45Z"
                  fill="#FF518C"
                />
              </svg>
              <span className="text-base text-white">Request online meeting</span>
            </div>
            <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
          </div>
        </div>
        <FileUpload />
        <div className="flex items-center justify-center !gap-5 mt-4">
          <Button audience="USER" level="SECONDARY" size="MEDIUM" className="!capitalize !font-semibold !text-base !font-montserrat">
            Save for later
          </Button>
          <Button audience="USER" level="PRIMARY" size="MEDIUM" className="!capitalize !font-semibold !text-base !font-montserrat">
            Submit Support ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
